<?php
declare(strict_types=1);

// RegionalIntensityList entity test

require_once __DIR__ . '/../carbonintensity_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class RegionalIntensityListEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = CarbonIntensitySDK::test(null, null);
        $ent = $testsdk->RegionalIntensityList(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = regional_intensity_list_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "regional_intensity_list." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set CARBONINTENSITY_TEST_REGIONAL_INTENSITY_LIST_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $regional_intensity_list_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.regional_intensity_list")));
        $regional_intensity_list_ref01_data = null;
        if (count($regional_intensity_list_ref01_data_raw) > 0) {
            $regional_intensity_list_ref01_data = Helpers::to_map($regional_intensity_list_ref01_data_raw[0][1]);
        }

        // LIST
        $regional_intensity_list_ref01_ent = $client->RegionalIntensityList(null);
        $regional_intensity_list_ref01_match = [
            "from" => $setup["idmap"]["from01"],
        ];

        $regional_intensity_list_ref01_list_result = $regional_intensity_list_ref01_ent->list($regional_intensity_list_ref01_match, null);
        $this->assertIsArray($regional_intensity_list_ref01_list_result);

        // LOAD
        $regional_intensity_list_ref01_match_dt0 = [];
        $regional_intensity_list_ref01_data_dt0_loaded = $regional_intensity_list_ref01_ent->load($regional_intensity_list_ref01_match_dt0, null);
        $this->assertNotNull($regional_intensity_list_ref01_data_dt0_loaded);

    }
}

function regional_intensity_list_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/regional_intensity_list/RegionalIntensityListTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = CarbonIntensitySDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["regional_intensity_list01", "regional_intensity_list02", "regional_intensity_list03", "intensity01", "intensity02", "intensity03", "postcode01", "postcode02", "postcode03", "regionid01", "regionid02", "regionid03", "from01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("CARBONINTENSITY_TEST_REGIONAL_INTENSITY_LIST_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "CARBONINTENSITY_TEST_REGIONAL_INTENSITY_LIST_ENTID" => $idmap,
        "CARBONINTENSITY_TEST_LIVE" => "FALSE",
        "CARBONINTENSITY_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["CARBONINTENSITY_TEST_REGIONAL_INTENSITY_LIST_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["CARBONINTENSITY_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new CarbonIntensitySDK(Helpers::to_map($merged_opts));
    }

    $live = $env["CARBONINTENSITY_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["CARBONINTENSITY_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
