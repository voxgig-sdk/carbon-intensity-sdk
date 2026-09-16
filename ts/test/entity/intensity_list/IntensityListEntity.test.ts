

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CarbonIntensitySDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('IntensityListEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CARBON_INTENSITY_TEST_LIVE=TRUE.
  afterEach(liveDelay('CARBON_INTENSITY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CarbonIntensitySDK.test()
    const ent = testsdk.IntensityList()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CARBON_INTENSITY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'intensity_list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"data","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"format":"date-time","name":"from","req":false,"short":"Start datetime of the period","type":"`$STRING`","index$":1},{"active":true,"name":"intensity","req":false,"type":"`$OBJECT`","index$":2},{"active":true,"format":"date-time","name":"to","req":false,"short":"End datetime of the period","type":"`$STRING`","index$":3}],"name":"intensity_list","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"from","orig":"from","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /intensity/{from}/fw24h","json":"{\"operationId\":\"getIntensityForward24h\",\"parameters\":[{\"description\":\"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)\",\"in\":\"path\",\"name\":\"from\",\"required\":true,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"description\":\"Start datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"},\"intensity\":{\"properties\":{\"actual\":{\"description\":\"Actual carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"forecast\":{\"description\":\"Forecasted carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Intensity index\",\"enum\":[\"very low\",\"low\",\"moderate\",\"high\",\"very high\"],\"type\":\"string\"}},\"type\":\"object\"},\"to\":{\"description\":\"End datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/intensity/{from}/fw24h","segments":[{"lit":"intensity"},{"var":"from"},{"lit":"fw24h"}],"select":{"exist":["from"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"from","orig":"from","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /intensity/{from}/fw48h","json":"{\"operationId\":\"getIntensityForward48h\",\"parameters\":[{\"description\":\"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)\",\"in\":\"path\",\"name\":\"from\",\"required\":true,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"description\":\"Start datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"},\"intensity\":{\"properties\":{\"actual\":{\"description\":\"Actual carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"forecast\":{\"description\":\"Forecasted carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Intensity index\",\"enum\":[\"very low\",\"low\",\"moderate\",\"high\",\"very high\"],\"type\":\"string\"}},\"type\":\"object\"},\"to\":{\"description\":\"End datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/intensity/{from}/fw48h","segments":[{"lit":"intensity"},{"var":"from"},{"lit":"fw48h"}],"select":{"exist":["from"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":1},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"from","orig":"from","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /intensity/{from}/pt24h","json":"{\"operationId\":\"getIntensityPast24h\",\"parameters\":[{\"description\":\"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)\",\"in\":\"path\",\"name\":\"from\",\"required\":true,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"description\":\"Start datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"},\"intensity\":{\"properties\":{\"actual\":{\"description\":\"Actual carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"forecast\":{\"description\":\"Forecasted carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Intensity index\",\"enum\":[\"very low\",\"low\",\"moderate\",\"high\",\"very high\"],\"type\":\"string\"}},\"type\":\"object\"},\"to\":{\"description\":\"End datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/intensity/{from}/pt24h","segments":[{"lit":"intensity"},{"var":"from"},{"lit":"pt24h"}],"select":{"exist":["from"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":2},{"active":true,"args":{},"contract":{"id":"GET /intensity/date","json":"{\"operationId\":\"getIntensityToday\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"description\":\"Start datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"},\"intensity\":{\"properties\":{\"actual\":{\"description\":\"Actual carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"forecast\":{\"description\":\"Forecasted carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Intensity index\",\"enum\":[\"very low\",\"low\",\"moderate\",\"high\",\"very high\"],\"type\":\"string\"}},\"type\":\"object\"},\"to\":{\"description\":\"End datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/intensity/date","segments":[{"lit":"intensity"},{"lit":"date"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"date","orig":"date","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /intensity/date/{date}","json":"{\"operationId\":\"getIntensityByDate\",\"parameters\":[{\"description\":\"Date in YYYY-MM-DD format\",\"in\":\"path\",\"name\":\"date\",\"required\":true,\"schema\":{\"format\":\"date\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"description\":\"Start datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"},\"intensity\":{\"properties\":{\"actual\":{\"description\":\"Actual carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"forecast\":{\"description\":\"Forecasted carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Intensity index\",\"enum\":[\"very low\",\"low\",\"moderate\",\"high\",\"very high\"],\"type\":\"string\"}},\"type\":\"object\"},\"to\":{\"description\":\"End datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/intensity/date/{date}","segments":[{"lit":"intensity"},{"lit":"date"},{"var":"date"}],"select":{"exist":["date"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["date"],["intensity"]]},"key$":"intensity_list","name__orig":"intensity_list","Name":"IntensityList","name_":"intensity_list","name-":"intensity-list","NAME":"INTENSITY_LIST","index$":4}, {"active":true,"entity":"intensity_list","key$":"BasicIntensityListFlow","kind":"basic","name":"BasicIntensityListFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"intensity_list_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"intensity_list_ref01","srcdatavar":"intensity_list_ref01_data","suffix":"_dt0"},"match":{"id":"intensity_list01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-intensity_list_ref01"}}],"index$":1}]}, 'IntensityList')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let intensity_list_ref01_data = Object.values(setup.data.existing.intensity_list)[0] as any

    // LIST
    const intensity_list_ref01_ent = client.IntensityList()
    const intensity_list_ref01_match: any = {}

    const intensity_list_ref01_list = (await intensity_list_ref01_ent.list(intensity_list_ref01_match)).map((e: any) => e.data())



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/intensity_list/IntensityListTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CarbonIntensitySDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['intensity_list01','intensity_list02','intensity_list03','date01','date02','date03','intensity01','intensity02','intensity03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CARBON_INTENSITY_TEST_INTENSITY_LIST_ENTID': idmap,
    'CARBON_INTENSITY_TEST_LIVE': 'FALSE',
    'CARBON_INTENSITY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CARBON_INTENSITY_TEST_INTENSITY_LIST_ENTID']

  const live = 'TRUE' === env.CARBON_INTENSITY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CARBON_INTENSITY_TEST_INTENSITY_LIST_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CarbonIntensitySDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
