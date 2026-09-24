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
(0, node_test_1.describe)('StatEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CARBON_INTENSITY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CARBON_INTENSITY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CarbonIntensitySDK.test();
        const ent = testsdk.Stat();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CARBON_INTENSITY_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'stat.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "data": { "a": true, "h": "Data", "n": "data", "r": false, "t": "`$ARRAY`", "key$": "data", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 1 } }, "id": { "field": "id", "name": "id", "parts": ["from", "to", "block"], "sep": "/" }, "name": "stat", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /intensity/stats/{from}/{to}/{block}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "block", "or": "block", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "param", "n": "from", "or": "from", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "to", "or": "to", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/intensity/stats/{from}/{to}/{block}", "q": { "exist": ["block", "from", "to"] }, "r": {}, "s": [{ "lit": "intensity" }, { "lit": "stats" }, { "var": "from" }, { "var": "to" }, { "var": "block" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /intensity/stats/{from}/{to}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "from", "or": "from", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "to", "or": "to", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/intensity/stats/{from}/{to}", "q": { "exist": ["from", "to"] }, "r": {}, "s": [{ "lit": "intensity" }, { "lit": "stats" }, { "var": "from" }, { "var": "to" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "stat", "name__orig": "stat", "Name": "Stat", "name_": "stat", "name-": "stat", "NAME": "STAT", "index$": 8 }, { "active": true, "entity": "stat", "key$": "BasicStatFlow", "kind": "basic", "name": "BasicStatFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "stat_ref01", "srcdatavar": "stat_ref01_data", "suffix": "_dt0" }, "m": { "from": "from01", "id": "stat01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-stat_ref01" } }], "index$": 0 }] }, 'Stat', { "GET /intensity/stats/{from}/{to}/{block}": { "protocol": "http", "operationId": "getIntensityStatsBlocks", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "data": { "type": "array", "items": { "type": "object", "properties": { "from": { "type": "string", "format": "date-time" }, "to": { "type": "string", "format": "date-time" }, "intensity": { "type": "object", "properties": { "max": { "type": "integer", "description": "Maximum carbon intensity (gCO2/kWh)" }, "average": { "type": "integer", "description": "Average carbon intensity (gCO2/kWh)" }, "min": { "type": "integer", "description": "Minimum carbon intensity (gCO2/kWh)" }, "index": { "type": "string", "description": "Average intensity index" } } } } }, "key$": "data" } }, "x-ref": "#/components/schemas/StatsBlockResponse", "index$": 0 } } } } }, "parameters": [{ "name": "from", "in": "path", "required": true, "description": "Start datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)", "schema": { "type": "string", "format": "date-time" }, "index$": 0 }, { "name": "to", "in": "path", "required": true, "description": "End datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)", "schema": { "type": "string", "format": "date-time" }, "index$": 1 }, { "name": "block", "in": "path", "required": true, "description": "Block length in hours (e.g., 2 for 2-hour blocks)", "schema": { "type": "integer" }, "index$": 2 }], "securitySource": "unspecified" }, "GET /intensity/stats/{from}/{to}": { "protocol": "http", "operationId": "getIntensityStats", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "data": { "type": "array", "items": { "type": "object", "properties": { "from": { "type": "string", "format": "date-time" }, "to": { "type": "string", "format": "date-time" }, "intensity": { "type": "object", "properties": { "max": { "type": "integer", "description": "Maximum carbon intensity (gCO2/kWh)" }, "average": { "type": "integer", "description": "Average carbon intensity (gCO2/kWh)" }, "min": { "type": "integer", "description": "Minimum carbon intensity (gCO2/kWh)" }, "index": { "type": "string", "description": "Average intensity index" } } } } }, "key$": "data" } }, "x-ref": "#/components/schemas/StatsResponse", "index$": 0 } } } } }, "parameters": [{ "name": "from", "in": "path", "required": true, "description": "Start datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)", "schema": { "type": "string", "format": "date-time" }, "index$": 0 }, { "name": "to", "in": "path", "required": true, "description": "End datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)", "schema": { "type": "string", "format": "date-time" }, "index$": 1 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let stat_ref01_data = Object.values(setup.data.existing.stat)[0];
        // LOAD
        const stat_ref01_ent = client.Stat();
        const stat_ref01_match_dt0 = {};
        stat_ref01_match_dt0.id = stat_ref01_data.id;
        const stat_ref01_data_dt0 = (await stat_ref01_ent.load(stat_ref01_match_dt0)).data();
        (0, node_assert_1.default)(stat_ref01_data_dt0.id === stat_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/stat/StatTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CarbonIntensitySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['stat01', 'stat02', 'stat03', 'from01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CARBON_INTENSITY_TEST_STAT_ENTID': idmap,
        'CARBON_INTENSITY_TEST_LIVE': 'FALSE',
        'CARBON_INTENSITY_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CARBON_INTENSITY_TEST_STAT_ENTID'];
    const live = 'TRUE' === env.CARBON_INTENSITY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CARBON_INTENSITY_TEST_STAT_ENTID'];
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
//# sourceMappingURL=StatEntity.test.js.map