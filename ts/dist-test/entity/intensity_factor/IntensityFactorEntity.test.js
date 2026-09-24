"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('IntensityFactorEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CARBON_INTENSITY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CARBON_INTENSITY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CarbonIntensitySDK.test();
        const ent = testsdk.IntensityFactor();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CARBON_INTENSITY_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'intensity_factor.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "Biomass": { "a": true, "h": "Biomass", "n": "Biomass", "r": false, "sh": "Carbon intensity factor for biomass (gCO2/kWh)", "t": "`$INTEGER`", "key$": "Biomass", "index$": 0 }, "Coal": { "a": true, "h": "Coal", "n": "Coal", "r": false, "sh": "Carbon intensity factor for coal (gCO2/kWh)", "t": "`$INTEGER`", "key$": "Coal", "index$": 1 }, "DutchImports": { "a": true, "h": "Dutch Imports", "n": "DutchImports", "r": false, "sh": "Carbon intensity factor for Dutch imports (gCO2/kWh)", "t": "`$INTEGER`", "key$": "DutchImports", "index$": 2 }, "FrenchImports": { "a": true, "h": "French Imports", "n": "FrenchImports", "r": false, "sh": "Carbon intensity factor for French imports (gCO2/kWh)", "t": "`$INTEGER`", "key$": "FrenchImports", "index$": 3 }, "GasCombinedCycle": { "a": true, "h": "Gas Combined Cycle", "n": "GasCombinedCycle", "r": false, "sh": "Carbon intensity factor for gas combined cycle (gCO2/kWh)", "t": "`$INTEGER`", "key$": "GasCombinedCycle", "index$": 4 }, "GasOpenCycle": { "a": true, "h": "Gas Open Cycle", "n": "GasOpenCycle", "r": false, "sh": "Carbon intensity factor for gas open cycle (gCO2/kWh)", "t": "`$INTEGER`", "key$": "GasOpenCycle", "index$": 5 }, "Hydro": { "a": true, "h": "Hydro", "n": "Hydro", "r": false, "sh": "Carbon intensity factor for hydro (gCO2/kWh)", "t": "`$INTEGER`", "key$": "Hydro", "index$": 6 }, "IrishImports": { "a": true, "h": "Irish Imports", "n": "IrishImports", "r": false, "sh": "Carbon intensity factor for Irish imports (gCO2/kWh)", "t": "`$INTEGER`", "key$": "IrishImports", "index$": 7 }, "Nuclear": { "a": true, "h": "Nuclear", "n": "Nuclear", "r": false, "sh": "Carbon intensity factor for nuclear (gCO2/kWh)", "t": "`$INTEGER`", "key$": "Nuclear", "index$": 8 }, "Oil": { "a": true, "h": "Oil", "n": "Oil", "r": false, "sh": "Carbon intensity factor for oil (gCO2/kWh)", "t": "`$INTEGER`", "key$": "Oil", "index$": 9 }, "Other": { "a": true, "h": "Other", "n": "Other", "r": false, "sh": "Carbon intensity factor for other (gCO2/kWh)", "t": "`$INTEGER`", "key$": "Other", "index$": 10 }, "PumpedStorage": { "a": true, "h": "Pumped Storage", "n": "PumpedStorage", "r": false, "sh": "Carbon intensity factor for pumped storage (gCO2/kWh)", "t": "`$INTEGER`", "key$": "PumpedStorage", "index$": 11 }, "Solar": { "a": true, "h": "Solar", "n": "Solar", "r": false, "sh": "Carbon intensity factor for solar (gCO2/kWh)", "t": "`$INTEGER`", "key$": "Solar", "index$": 12 }, "Wind": { "a": true, "h": "Wind", "n": "Wind", "r": false, "sh": "Carbon intensity factor for wind (gCO2/kWh)", "t": "`$INTEGER`", "key$": "Wind", "index$": 13 } }, "name": "intensity_factor", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /intensity/factors", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/intensity/factors", "q": {}, "r": {}, "s": [{ "lit": "intensity" }, { "lit": "factors" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "intensity_factor", "name__orig": "intensity_factor", "Name": "IntensityFactor", "name_": "intensity_factor", "name-": "intensity-factor", "NAME": "INTENSITY_FACTOR", "index$": 3 }, { "active": true, "entity": "intensity_factor", "key$": "BasicIntensityFactorFlow", "kind": "basic", "name": "BasicIntensityFactorFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "intensity_factor_ref01" } }], "index$": 0 }] }, 'IntensityFactor', { "GET /intensity/factors": { "protocol": "http", "operationId": "getIntensityFactors", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "data": { "items": { "properties": { "Biomass": { "description": "Carbon intensity factor for biomass (gCO2/kWh)", "type": "integer", "key$": "Biomass" }, "Coal": { "description": "Carbon intensity factor for coal (gCO2/kWh)", "type": "integer", "key$": "Coal" }, "Dutch Imports": { "description": "Carbon intensity factor for Dutch imports (gCO2/kWh)", "type": "integer", "key$": "Dutch Imports" }, "French Imports": { "description": "Carbon intensity factor for French imports (gCO2/kWh)", "type": "integer", "key$": "French Imports" }, "Gas (Combined Cycle)": { "description": "Carbon intensity factor for gas combined cycle (gCO2/kWh)", "type": "integer", "key$": "Gas (Combined Cycle)" }, "Gas (Open Cycle)": { "description": "Carbon intensity factor for gas open cycle (gCO2/kWh)", "type": "integer", "key$": "Gas (Open Cycle)" }, "Hydro": { "description": "Carbon intensity factor for hydro (gCO2/kWh)", "type": "integer", "key$": "Hydro" }, "Irish Imports": { "description": "Carbon intensity factor for Irish imports (gCO2/kWh)", "type": "integer", "key$": "Irish Imports" }, "Nuclear": { "description": "Carbon intensity factor for nuclear (gCO2/kWh)", "type": "integer", "key$": "Nuclear" }, "Oil": { "description": "Carbon intensity factor for oil (gCO2/kWh)", "type": "integer", "key$": "Oil" }, "Other": { "description": "Carbon intensity factor for other (gCO2/kWh)", "type": "integer", "key$": "Other" }, "Pumped Storage": { "description": "Carbon intensity factor for pumped storage (gCO2/kWh)", "type": "integer", "key$": "Pumped Storage" }, "Solar": { "description": "Carbon intensity factor for solar (gCO2/kWh)", "type": "integer", "key$": "Solar" }, "Wind": { "description": "Carbon intensity factor for wind (gCO2/kWh)", "type": "integer", "key$": "Wind" } }, "type": "object", "index$": 0 }, "key$": "data", "type": "array" } }, "x-ref": "#/components/schemas/IntensityFactorsResponse" } } } } }, "parameters": [], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let intensity_factor_ref01_data = Object.values(setup.data.existing.intensity_factor)[0];
        // LIST
        const intensity_factor_ref01_ent = client.IntensityFactor();
        const intensity_factor_ref01_match = {};
        const intensity_factor_ref01_list = (await intensity_factor_ref01_ent.list(intensity_factor_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/intensity_factor/IntensityFactorTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CarbonIntensitySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['intensity_factor01', 'intensity_factor02', 'intensity_factor03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CARBON_INTENSITY_TEST_INTENSITY_FACTOR_ENTID': idmap,
        'CARBON_INTENSITY_TEST_LIVE': 'FALSE',
        'CARBON_INTENSITY_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CARBON_INTENSITY_TEST_INTENSITY_FACTOR_ENTID'];
    const live = 'TRUE' === env.CARBON_INTENSITY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CARBON_INTENSITY_TEST_INTENSITY_FACTOR_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CarbonIntensitySDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.CARBON_INTENSITY_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=IntensityFactorEntity.test.js.map