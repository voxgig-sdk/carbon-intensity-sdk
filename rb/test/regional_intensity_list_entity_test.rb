# RegionalIntensityList entity test

require "minitest/autorun"
require "json"
require_relative "../CarbonIntensity_sdk"
require_relative "runner"

class RegionalIntensityListEntityTest < Minitest::Test
  def test_create_instance
    testsdk = CarbonIntensitySDK.test(nil, nil)
    ent = testsdk.RegionalIntensityList(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = regional_intensity_list_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "regional_intensity_list." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set CARBONINTENSITY_TEST_REGIONAL_INTENSITY_LIST_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    regional_intensity_list_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.regional_intensity_list")))
    regional_intensity_list_ref01_data = nil
    if regional_intensity_list_ref01_data_raw.length > 0
      regional_intensity_list_ref01_data = Helpers.to_map(regional_intensity_list_ref01_data_raw[0][1])
    end

    # LIST
    regional_intensity_list_ref01_ent = client.RegionalIntensityList(nil)
    regional_intensity_list_ref01_match = {
      "from" => setup[:idmap]["from01"],
    }

    regional_intensity_list_ref01_list_result = regional_intensity_list_ref01_ent.list(regional_intensity_list_ref01_match, nil)
    assert regional_intensity_list_ref01_list_result.is_a?(Array)

    # LOAD
    regional_intensity_list_ref01_match_dt0 = {}
    regional_intensity_list_ref01_data_dt0_loaded = regional_intensity_list_ref01_ent.load(regional_intensity_list_ref01_match_dt0, nil)
    assert !regional_intensity_list_ref01_data_dt0_loaded.nil?

  end
end

def regional_intensity_list_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "regional_intensity_list", "RegionalIntensityListTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = CarbonIntensitySDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["regional_intensity_list01", "regional_intensity_list02", "regional_intensity_list03", "intensity01", "intensity02", "intensity03", "postcode01", "postcode02", "postcode03", "regionid01", "regionid02", "regionid03", "from01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["CARBONINTENSITY_TEST_REGIONAL_INTENSITY_LIST_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "CARBONINTENSITY_TEST_REGIONAL_INTENSITY_LIST_ENTID" => idmap,
    "CARBONINTENSITY_TEST_LIVE" => "FALSE",
    "CARBONINTENSITY_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["CARBONINTENSITY_TEST_REGIONAL_INTENSITY_LIST_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["CARBONINTENSITY_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = CarbonIntensitySDK.new(Helpers.to_map(merged_opts))
  end

  live = env["CARBONINTENSITY_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["CARBONINTENSITY_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
