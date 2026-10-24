# GenerationList entity test

import json
import os
import time

import pytest

from carbonintensity_sdk.utility.voxgig_struct import voxgig_struct as vs
from carbonintensity_sdk import CarbonIntensitySDK
from carbonintensity_sdk.core import helpers
from carbonintensity_sdk.config import shared_config
from carbonintensity_sdk.feature.base_feature import CarbonIntensityBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestGenerationListEntity:

    def test_should_create_instance(self):
        testsdk = CarbonIntensitySDK.test(None, None)
        ent = testsdk.GenerationList(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = CarbonIntensitySDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.GenerationList(None).list({"from": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _generation_list_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "generation_list." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            for _live_key in ["from01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via CARBON_INTENSITY_TEST_GENERATION_LIST_ENTID")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        generation_list_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.generation_list")))
        generation_list_ref01_data = None
        if len(generation_list_ref01_data_raw) > 0:
            generation_list_ref01_data = helpers.to_map(generation_list_ref01_data_raw[0][1])

        # LIST
        generation_list_ref01_ent = client.GenerationList(None)
        generation_list_ref01_match = {
            "from": setup["idmap"]["from01"],
        }

        generation_list_ref01_list_result = generation_list_ref01_ent.list(generation_list_ref01_match, None)
        assert isinstance(generation_list_ref01_list_result, list)



def _generation_list_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/generation_list/GenerationListTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = CarbonIntensitySDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["generation_list01", "generation_list02", "generation_list03", "generation01", "generation02", "generation03", "from01"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "CARBON_INTENSITY_TEST_GENERATION_LIST_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "CARBON_INTENSITY_TEST_GENERATION_LIST_ENTID": idmap,
        "CARBON_INTENSITY_TEST_LIVE": "FALSE",
        "CARBON_INTENSITY_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("CARBON_INTENSITY_TEST_GENERATION_LIST_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("CARBON_INTENSITY_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
            },
            extra or {},
        ])
        client = CarbonIntensitySDK(helpers.to_map(merged_opts))

    _live = env.get("CARBON_INTENSITY_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("CARBON_INTENSITY_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
