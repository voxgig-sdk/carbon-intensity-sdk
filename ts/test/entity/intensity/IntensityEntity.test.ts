

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


describe('IntensityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CARBON_INTENSITY_TEST_LIVE=TRUE.
  afterEach(liveDelay('CARBON_INTENSITY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CarbonIntensitySDK.test()
    const ent = testsdk.Intensity()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CARBON_INTENSITY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'intensity.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"data","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"format":"date-time","name":"from","req":false,"short":"Start datetime of the period","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"intensity","req":false,"type":"`$OBJECT`","index$":3},{"active":true,"format":"date-time","name":"to","req":false,"short":"End datetime of the period","type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"intensity","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /intensity","json":"{\"operationId\":\"getCurrentIntensity\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"description\":\"Start datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"},\"intensity\":{\"properties\":{\"actual\":{\"description\":\"Actual carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"forecast\":{\"description\":\"Forecasted carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Intensity index\",\"enum\":[\"very low\",\"low\",\"moderate\",\"high\",\"very high\"],\"type\":\"string\"}},\"type\":\"object\"},\"to\":{\"description\":\"End datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/intensity","segments":[{"lit":"intensity"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"date","orig":"date","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"period","orig":"period","reqd":true,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /intensity/date/{date}/{period}","json":"{\"operationId\":\"getIntensityByDateAndPeriod\",\"parameters\":[{\"description\":\"Date in YYYY-MM-DD format\",\"in\":\"path\",\"name\":\"date\",\"required\":true,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Settlement period (1-48)\",\"in\":\"path\",\"name\":\"period\",\"required\":true,\"schema\":{\"maximum\":48,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"description\":\"Start datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"},\"intensity\":{\"properties\":{\"actual\":{\"description\":\"Actual carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"forecast\":{\"description\":\"Forecasted carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Intensity index\",\"enum\":[\"very low\",\"low\",\"moderate\",\"high\",\"very high\"],\"type\":\"string\"}},\"type\":\"object\"},\"to\":{\"description\":\"End datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/intensity/date/{date}/{period}","segments":[{"lit":"intensity"},{"lit":"date"},{"var":"date"},{"var":"period"}],"select":{"exist":["date","period"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"from","orig":"from","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"to","orig":"to","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /intensity/{from}/{to}","json":"{\"operationId\":\"getIntensityBetweenDatetimes\",\"parameters\":[{\"description\":\"Start datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)\",\"in\":\"path\",\"name\":\"from\",\"required\":true,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"End datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)\",\"in\":\"path\",\"name\":\"to\",\"required\":true,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"description\":\"Start datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"},\"intensity\":{\"properties\":{\"actual\":{\"description\":\"Actual carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"forecast\":{\"description\":\"Forecasted carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Intensity index\",\"enum\":[\"very low\",\"low\",\"moderate\",\"high\",\"very high\"],\"type\":\"string\"}},\"type\":\"object\"},\"to\":{\"description\":\"End datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/intensity/{from}/{to}","segments":[{"lit":"intensity"},{"var":"from"},{"var":"to"}],"select":{"exist":["from","to"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"from","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /intensity/{from}","json":"{\"operationId\":\"getIntensityByDatetime\",\"parameters\":[{\"description\":\"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)\",\"in\":\"path\",\"name\":\"from\",\"required\":true,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"description\":\"Start datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"},\"intensity\":{\"properties\":{\"actual\":{\"description\":\"Actual carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"forecast\":{\"description\":\"Forecasted carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Intensity index\",\"enum\":[\"very low\",\"low\",\"moderate\",\"high\",\"very high\"],\"type\":\"string\"}},\"type\":\"object\"},\"to\":{\"description\":\"End datetime of the period\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/intensity/{from}","rename":{"param":{"from":"id"}},"segments":[{"lit":"intensity"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["date"],["intensity"]]},"key$":"intensity","name__orig":"intensity","Name":"Intensity","name_":"intensity","name-":"intensity","NAME":"INTENSITY","index$":2}, {"active":true,"entity":"intensity","key$":"BasicIntensityFlow","kind":"basic","name":"BasicIntensityFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"intensity_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"intensity_ref01","srcdatavar":"intensity_ref01_data","suffix":"_dt0"},"match":{"id":"intensity01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-intensity_ref01"}}],"index$":1}]}, 'Intensity')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let intensity_ref01_data = Object.values(setup.data.existing.intensity)[0] as any

    // LIST
    const intensity_ref01_ent = client.Intensity()
    const intensity_ref01_match: any = {}

    const intensity_ref01_list = (await intensity_ref01_ent.list(intensity_ref01_match)).map((e: any) => e.data())


    // LOAD
    const intensity_ref01_match_dt0: any = {}
    intensity_ref01_match_dt0.id = intensity_ref01_data.id
    const intensity_ref01_data_dt0 = (await intensity_ref01_ent.load(intensity_ref01_match_dt0)).data()
    assert(intensity_ref01_data_dt0.id === intensity_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/intensity/IntensityTestData.json')

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
    ['intensity01','intensity02','intensity03','date01','date02','date03','intensity01','intensity02','intensity03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CARBON_INTENSITY_TEST_INTENSITY_ENTID': idmap,
    'CARBON_INTENSITY_TEST_LIVE': 'FALSE',
    'CARBON_INTENSITY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CARBON_INTENSITY_TEST_INTENSITY_ENTID']

  const live = 'TRUE' === env.CARBON_INTENSITY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CARBON_INTENSITY_TEST_INTENSITY_ENTID']
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
  
