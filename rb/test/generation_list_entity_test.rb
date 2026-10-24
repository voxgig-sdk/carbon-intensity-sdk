# GenerationList entity test

require "minitest/autorun"
require "json"
require_relative "../CarbonIntensity_sdk"
require_relative "runner"

class GenerationListEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = CarbonIntensitySDK.test(nil, nil)
    ent = testsdk.GenerationList(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = CarbonIntensityConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = CarbonIntensitySDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.GenerationList(nil).list({ "from" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = generation_list_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "generation_list." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      ["from01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via CARBON_INTENSITY_TEST_GENERATION_LIST_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    generation_list_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.generation_list")))
    generation_list_ref01_data = nil
    if generation_list_ref01_data_raw.length > 0
      generation_list_ref01_data = Helpers.to_map(generation_list_ref01_data_raw[0][1])
    end

    # LIST
    generation_list_ref01_ent = client.GenerationList(nil)
    generation_list_ref01_match = {
      "from" => setup[:idmap]["from01"],
    }

    generation_list_ref01_list_result = generation_list_ref01_ent.list(generation_list_ref01_match, nil)
    assert generation_list_ref01_list_result.is_a?(Array)

  end
end

def generation_list_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "generation_list", "GenerationListTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = CarbonIntensitySDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["generation_list01", "generation_list02", "generation_list03", "generation01", "generation02", "generation03", "from01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["CARBON_INTENSITY_TEST_GENERATION_LIST_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "CARBON_INTENSITY_TEST_GENERATION_LIST_ENTID" => idmap,
    "CARBON_INTENSITY_TEST_LIVE" => "FALSE",
    "CARBON_INTENSITY_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["CARBON_INTENSITY_TEST_GENERATION_LIST_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["CARBON_INTENSITY_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = CarbonIntensitySDK.new(Helpers.to_map(merged_opts))
  end

  live = env["CARBON_INTENSITY_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["CARBON_INTENSITY_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
