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
(0, node_test_1.describe)('GenerationListEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CARBON_INTENSITY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CARBON_INTENSITY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CarbonIntensitySDK.test();
        const ent = testsdk.GenerationList();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CARBON_INTENSITY_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'generation_list.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "from": { "a": true, "fo": "date-time", "h": "From", "n": "from", "r": false, "t": "`$STRING`", "key$": "from", "index$": 0 }, "generationmix": { "a": true, "h": "Generationmix", "n": "generationmix", "r": false, "t": "`$ARRAY`", "key$": "generationmix", "index$": 1 }, "to": { "a": true, "fo": "date-time", "h": "To", "n": "to", "r": false, "t": "`$STRING`", "key$": "to", "index$": 2 } }, "name": "generation_list", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /generation/{from}/pt24h", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "from", "or": "from", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/generation/{from}/pt24h", "q": { "exist": ["from"] }, "r": {}, "s": [{ "lit": "generation" }, { "var": "from" }, { "lit": "pt24h" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.generation"]] }, "key$": "generation_list", "name__orig": "generation_list", "Name": "GenerationList", "name_": "generation_list", "name-": "generation-list", "NAME": "GENERATION_LIST", "index$": 1 }, { "active": true, "entity": "generation_list", "key$": "BasicGenerationListFlow", "kind": "basic", "name": "BasicGenerationListFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "from": "from01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "generation_list_ref01" } }], "index$": 0 }] }, 'GenerationList', { "GET /generation/{from}/pt24h": { "protocol": "http", "operationId": "getGenerationPast24h", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "data": { "items": { "properties": { "from": { "format": "date-time", "type": "string", "key$": "from" }, "generationmix": { "items": { "properties": { "fuel": { "description": "Fuel type", "type": "string" }, "perc": { "description": "Percentage of total generation", "format": "float", "type": "number" } }, "type": "object", "x-ref": "#/components/schemas/GenerationMix" }, "type": "array", "key$": "generationmix" }, "to": { "format": "date-time", "type": "string", "key$": "to" } }, "type": "object", "x-ref": "#/components/schemas/GenerationData", "index$": 0 }, "key$": "data", "type": "array" } }, "x-ref": "#/components/schemas/GenerationListResponse" } } } } }, "parameters": [{ "name": "from", "in": "path", "required": true, "description": "Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)", "schema": { "type": "string", "format": "date-time" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let generation_list_ref01_data = Object.values(setup.data.existing.generation_list)[0];
        // LIST
        const generation_list_ref01_ent = client.GenerationList();
        const generation_list_ref01_match = {};
        generation_list_ref01_match['from'] = setup.idmap['from01'];
        const generation_list_ref01_list = (await generation_list_ref01_ent.list(generation_list_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/generation_list/GenerationListTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CarbonIntensitySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['generation_list01', 'generation_list02', 'generation_list03', 'generation01', 'generation02', 'generation03', 'from01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CARBON_INTENSITY_TEST_GENERATION_LIST_ENTID': idmap,
        'CARBON_INTENSITY_TEST_LIVE': 'FALSE',
        'CARBON_INTENSITY_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CARBON_INTENSITY_TEST_GENERATION_LIST_ENTID'];
    const live = 'TRUE' === env.CARBON_INTENSITY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CARBON_INTENSITY_TEST_GENERATION_LIST_ENTID'];
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
//# sourceMappingURL=GenerationListEntity.test.js.map