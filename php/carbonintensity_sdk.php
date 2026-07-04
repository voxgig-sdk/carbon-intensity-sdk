<?php
declare(strict_types=1);

// CarbonIntensity SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class CarbonIntensitySDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new CarbonIntensityUtility();
        $this->_utility = $utility;

        $config = CarbonIntensityConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = CarbonIntensityHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = CarbonIntensityHelpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, CarbonIntensityFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return CarbonIntensityUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = CarbonIntensityHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = CarbonIntensityHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = CarbonIntensityHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new CarbonIntensitySpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = CarbonIntensityHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = CarbonIntensityHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_generation = null;

    // Canonical facade: $client->Generation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->generation()
    // resolves here too.
    public function Generation($data = null)
    {
        require_once __DIR__ . '/entity/generation_entity.php';
        if ($data === null) {
            if ($this->_generation === null) {
                $this->_generation = new GenerationEntity($this, null);
            }
            return $this->_generation;
        }
        return new GenerationEntity($this, $data);
    }


    private $_generation_list = null;

    // Canonical facade: $client->GenerationList()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->generation_list()
    // resolves here too.
    public function GenerationList($data = null)
    {
        require_once __DIR__ . '/entity/generation_list_entity.php';
        if ($data === null) {
            if ($this->_generation_list === null) {
                $this->_generation_list = new GenerationListEntity($this, null);
            }
            return $this->_generation_list;
        }
        return new GenerationListEntity($this, $data);
    }


    private $_intensity = null;

    // Canonical facade: $client->Intensity()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->intensity()
    // resolves here too.
    public function Intensity($data = null)
    {
        require_once __DIR__ . '/entity/intensity_entity.php';
        if ($data === null) {
            if ($this->_intensity === null) {
                $this->_intensity = new IntensityEntity($this, null);
            }
            return $this->_intensity;
        }
        return new IntensityEntity($this, $data);
    }


    private $_intensity_factor = null;

    // Canonical facade: $client->IntensityFactor()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->intensity_factor()
    // resolves here too.
    public function IntensityFactor($data = null)
    {
        require_once __DIR__ . '/entity/intensity_factor_entity.php';
        if ($data === null) {
            if ($this->_intensity_factor === null) {
                $this->_intensity_factor = new IntensityFactorEntity($this, null);
            }
            return $this->_intensity_factor;
        }
        return new IntensityFactorEntity($this, $data);
    }


    private $_intensity_list = null;

    // Canonical facade: $client->IntensityList()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->intensity_list()
    // resolves here too.
    public function IntensityList($data = null)
    {
        require_once __DIR__ . '/entity/intensity_list_entity.php';
        if ($data === null) {
            if ($this->_intensity_list === null) {
                $this->_intensity_list = new IntensityListEntity($this, null);
            }
            return $this->_intensity_list;
        }
        return new IntensityListEntity($this, $data);
    }


    private $_regional = null;

    // Canonical facade: $client->Regional()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->regional()
    // resolves here too.
    public function Regional($data = null)
    {
        require_once __DIR__ . '/entity/regional_entity.php';
        if ($data === null) {
            if ($this->_regional === null) {
                $this->_regional = new RegionalEntity($this, null);
            }
            return $this->_regional;
        }
        return new RegionalEntity($this, $data);
    }


    private $_regional_intensity = null;

    // Canonical facade: $client->RegionalIntensity()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->regional_intensity()
    // resolves here too.
    public function RegionalIntensity($data = null)
    {
        require_once __DIR__ . '/entity/regional_intensity_entity.php';
        if ($data === null) {
            if ($this->_regional_intensity === null) {
                $this->_regional_intensity = new RegionalIntensityEntity($this, null);
            }
            return $this->_regional_intensity;
        }
        return new RegionalIntensityEntity($this, $data);
    }


    private $_regional_intensity_list = null;

    // Canonical facade: $client->RegionalIntensityList()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->regional_intensity_list()
    // resolves here too.
    public function RegionalIntensityList($data = null)
    {
        require_once __DIR__ . '/entity/regional_intensity_list_entity.php';
        if ($data === null) {
            if ($this->_regional_intensity_list === null) {
                $this->_regional_intensity_list = new RegionalIntensityListEntity($this, null);
            }
            return $this->_regional_intensity_list;
        }
        return new RegionalIntensityListEntity($this, $data);
    }


    private $_stat = null;

    // Canonical facade: $client->Stat()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->stat()
    // resolves here too.
    public function Stat($data = null)
    {
        require_once __DIR__ . '/entity/stat_entity.php';
        if ($data === null) {
            if ($this->_stat === null) {
                $this->_stat = new StatEntity($this, null);
            }
            return $this->_stat;
        }
        return new StatEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new CarbonIntensitySDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
