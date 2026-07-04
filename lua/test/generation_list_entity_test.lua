-- GenerationList entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("carbon-intensity_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("GenerationListEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:GenerationList(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = generation_list_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "generation_list." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set CARBONINTENSITY_TEST_GENERATION_LIST_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local generation_list_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.generation_list")))
    local generation_list_ref01_data = nil
    if #generation_list_ref01_data_raw > 0 then
      generation_list_ref01_data = helpers.to_map(generation_list_ref01_data_raw[1][2])
    end

    -- LIST
    local generation_list_ref01_ent = client:GenerationList(nil)
    local generation_list_ref01_match = {
      ["from"] = setup.idmap["from01"],
    }

    local generation_list_ref01_list_result, err = generation_list_ref01_ent:list(generation_list_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(generation_list_ref01_list_result)

  end)
end)

function generation_list_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/generation_list/GenerationListTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read generation_list test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "generation_list01", "generation_list02", "generation_list03", "generation01", "generation02", "generation03", "from01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("CARBONINTENSITY_TEST_GENERATION_LIST_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["CARBONINTENSITY_TEST_GENERATION_LIST_ENTID"] = idmap,
    ["CARBONINTENSITY_TEST_LIVE"] = "FALSE",
    ["CARBONINTENSITY_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["CARBONINTENSITY_TEST_GENERATION_LIST_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["CARBONINTENSITY_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["CARBONINTENSITY_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["CARBONINTENSITY_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
