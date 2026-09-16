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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('IntensityListEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CARBON_INTENSITY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CARBON_INTENSITY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CarbonIntensitySDK.test();
        const ent = testsdk.IntensityList();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CARBON_INTENSITY_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'intensity_list.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "data", "req": false, "type": "`$ARRAY`", "index$": 0 }, { "active": true, "format": "date-time", "name": "from", "req": false, "short": "Start datetime of the period", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "intensity", "req": false, "type": "`$OBJECT`", "index$": 2 }, { "active": true, "format": "date-time", "name": "to", "req": false, "short": "End datetime of the period", "type": "`$STRING`", "index$": 3 }], "name": "intensity_list", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "from", "orig": "from", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /intensity/{from}/fw24h", "json": "{\"operationId\":\"getIntensityForward24h\",\"parameters\":[{\"description\":\"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)\",\"in\":\"path\",\"name\":\"from\",\"required\":true,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"description\":\"Start datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"},\"intensity\":{\"properties\":{\"actual\":{\"description\":\"Actual carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"forecast\":{\"description\":\"Forecasted carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Intensity index\",\"enum\":[\"very low\",\"low\",\"moderate\",\"high\",\"very high\"],\"type\":\"string\"}},\"type\":\"object\"},\"to\":{\"description\":\"End datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/intensity/{from}/fw24h", "segments": [{ "lit": "intensity" }, { "var": "from" }, { "lit": "fw24h" }], "select": { "exist": ["from"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "from", "orig": "from", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /intensity/{from}/fw48h", "json": "{\"operationId\":\"getIntensityForward48h\",\"parameters\":[{\"description\":\"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)\",\"in\":\"path\",\"name\":\"from\",\"required\":true,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"description\":\"Start datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"},\"intensity\":{\"properties\":{\"actual\":{\"description\":\"Actual carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"forecast\":{\"description\":\"Forecasted carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Intensity index\",\"enum\":[\"very low\",\"low\",\"moderate\",\"high\",\"very high\"],\"type\":\"string\"}},\"type\":\"object\"},\"to\":{\"description\":\"End datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/intensity/{from}/fw48h", "segments": [{ "lit": "intensity" }, { "var": "from" }, { "lit": "fw48h" }], "select": { "exist": ["from"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "from", "orig": "from", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /intensity/{from}/pt24h", "json": "{\"operationId\":\"getIntensityPast24h\",\"parameters\":[{\"description\":\"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)\",\"in\":\"path\",\"name\":\"from\",\"required\":true,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"description\":\"Start datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"},\"intensity\":{\"properties\":{\"actual\":{\"description\":\"Actual carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"forecast\":{\"description\":\"Forecasted carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Intensity index\",\"enum\":[\"very low\",\"low\",\"moderate\",\"high\",\"very high\"],\"type\":\"string\"}},\"type\":\"object\"},\"to\":{\"description\":\"End datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/intensity/{from}/pt24h", "segments": [{ "lit": "intensity" }, { "var": "from" }, { "lit": "pt24h" }], "select": { "exist": ["from"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 2 }, { "active": true, "args": {}, "contract": { "id": "GET /intensity/date", "json": "{\"operationId\":\"getIntensityToday\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"description\":\"Start datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"},\"intensity\":{\"properties\":{\"actual\":{\"description\":\"Actual carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"forecast\":{\"description\":\"Forecasted carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Intensity index\",\"enum\":[\"very low\",\"low\",\"moderate\",\"high\",\"very high\"],\"type\":\"string\"}},\"type\":\"object\"},\"to\":{\"description\":\"End datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/intensity/date", "segments": [{ "lit": "intensity" }, { "lit": "date" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "date", "orig": "date", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /intensity/date/{date}", "json": "{\"operationId\":\"getIntensityByDate\",\"parameters\":[{\"description\":\"Date in YYYY-MM-DD format\",\"in\":\"path\",\"name\":\"date\",\"required\":true,\"schema\":{\"format\":\"date\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"description\":\"Start datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"},\"intensity\":{\"properties\":{\"actual\":{\"description\":\"Actual carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"forecast\":{\"description\":\"Forecasted carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Intensity index\",\"enum\":[\"very low\",\"low\",\"moderate\",\"high\",\"very high\"],\"type\":\"string\"}},\"type\":\"object\"},\"to\":{\"description\":\"End datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/intensity/date/{date}", "segments": [{ "lit": "intensity" }, { "lit": "date" }, { "var": "date" }], "select": { "exist": ["date"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["date"], ["intensity"]] }, "key$": "intensity_list", "name__orig": "intensity_list", "Name": "IntensityList", "name_": "intensity_list", "name-": "intensity-list", "NAME": "INTENSITY_LIST", "index$": 4 }, { "active": true, "entity": "intensity_list", "key$": "BasicIntensityListFlow", "kind": "basic", "name": "BasicIntensityListFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "intensity_list_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "intensity_list_ref01", "srcdatavar": "intensity_list_ref01_data", "suffix": "_dt0" }, "match": { "id": "intensity_list01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-intensity_list_ref01" } }], "index$": 1 }] }, 'IntensityList');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let intensity_list_ref01_data = Object.values(setup.data.existing.intensity_list)[0];
        // LIST
        const intensity_list_ref01_ent = client.IntensityList();
        const intensity_list_ref01_match = {};
        const intensity_list_ref01_list = (await intensity_list_ref01_ent.list(intensity_list_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/intensity_list/IntensityListTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CarbonIntensitySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['intensity_list01', 'intensity_list02', 'intensity_list03', 'date01', 'date02', 'date03', 'intensity01', 'intensity02', 'intensity03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CARBON_INTENSITY_TEST_INTENSITY_LIST_ENTID': idmap,
        'CARBON_INTENSITY_TEST_LIVE': 'FALSE',
        'CARBON_INTENSITY_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CARBON_INTENSITY_TEST_INTENSITY_LIST_ENTID'];
    const live = 'TRUE' === env.CARBON_INTENSITY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CARBON_INTENSITY_TEST_INTENSITY_LIST_ENTID'];
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
//# sourceMappingURL=IntensityListEntity.test.js.map