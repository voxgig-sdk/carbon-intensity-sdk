<?php
declare(strict_types=1);

// Stat entity test

require_once __DIR__ . '/../carbonintensity_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class StatEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = CarbonIntensitySDK::test(null, null);
        $ent = $testsdk->Stat(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = stat_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "stat." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set CARBONINTENSITY_TEST_STAT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $stat_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.stat")));
        $stat_ref01_data = null;
        if (count($stat_ref01_data_raw) > 0) {
            $stat_ref01_data = Helpers::to_map($stat_ref01_data_raw[0][1]);
        }

        // LIST
        $stat_ref01_ent = $client->Stat(null);
        $stat_ref01_match = [
            "from" => $setup["idmap"]["from01"],
            "to" => $setup["idmap"]["to01"],
        ];

        [$stat_ref01_list_result, $err] = $stat_ref01_ent->list($stat_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($stat_ref01_list_result);

    }
}

function stat_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/stat/StatTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = CarbonIntensitySDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["stat01", "stat02", "stat03", "from01", "to01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("CARBONINTENSITY_TEST_STAT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "CARBONINTENSITY_TEST_STAT_ENTID" => $idmap,
        "CARBONINTENSITY_TEST_LIVE" => "FALSE",
        "CARBONINTENSITY_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["CARBONINTENSITY_TEST_STAT_ENTID"]);
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
