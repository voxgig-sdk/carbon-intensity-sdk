# Intensity entity test

require "minitest/autorun"
require "json"
require_relative "../CarbonIntensity_sdk"
require_relative "runner"

class IntensityEntityTest < Minitest::Test
  def test_create_instance
    testsdk = CarbonIntensitySDK.test(nil, nil)
    ent = testsdk.Intensity(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = intensity_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "intensity." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set CARBONINTENSITY_TEST_INTENSITY_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    intensity_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.intensity")))
    intensity_ref01_data = nil
    if intensity_ref01_data_raw.length > 0
      intensity_ref01_data = Helpers.to_map(intensity_ref01_data_raw[0][1])
    end

    # LIST
    intensity_ref01_ent = client.Intensity(nil)
    intensity_ref01_match = {}

    intensity_ref01_list_result = intensity_ref01_ent.list(intensity_ref01_match, nil)
    assert intensity_ref01_list_result.is_a?(Array)

    # LOAD
    intensity_ref01_match_dt0 = {}
    intensity_ref01_data_dt0_loaded = intensity_ref01_ent.load(intensity_ref01_match_dt0, nil)
    assert !intensity_ref01_data_dt0_loaded.nil?

  end
end

def intensity_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "intensity", "IntensityTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = CarbonIntensitySDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["intensity01", "intensity02", "intensity03", "date01", "date02", "date03"],
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
  entid_env_raw = ENV["CARBONINTENSITY_TEST_INTENSITY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "CARBONINTENSITY_TEST_INTENSITY_ENTID" => idmap,
    "CARBONINTENSITY_TEST_LIVE" => "FALSE",
    "CARBONINTENSITY_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["CARBONINTENSITY_TEST_INTENSITY_ENTID"])
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
