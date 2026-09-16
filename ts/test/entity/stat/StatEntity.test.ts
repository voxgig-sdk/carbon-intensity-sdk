

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


describe('StatEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CARBON_INTENSITY_TEST_LIVE=TRUE.
  afterEach(liveDelay('CARBON_INTENSITY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CarbonIntensitySDK.test()
    const ent = testsdk.Stat()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CARBON_INTENSITY_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'stat.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"data","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":1}],"id":{"field":"id","name":"id","parts":["from","to","block"],"sep":"/"},"name":"stat","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"block","orig":"block","reqd":true,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"param","name":"from","orig":"from","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"kind":"param","name":"to","orig":"to","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /intensity/stats/{from}/{to}/{block}","json":"{\"operationId\":\"getIntensityStatsBlocks\",\"parameters\":[{\"description\":\"Start datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)\",\"in\":\"path\",\"name\":\"from\",\"required\":true,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"End datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)\",\"in\":\"path\",\"name\":\"to\",\"required\":true,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"Block length in hours (e.g., 2 for 2-hour blocks)\",\"in\":\"path\",\"name\":\"block\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"format\":\"date-time\",\"type\":\"string\"},\"intensity\":{\"properties\":{\"average\":{\"description\":\"Average carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Average intensity index\",\"type\":\"string\"},\"max\":{\"description\":\"Maximum carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"min\":{\"description\":\"Minimum carbon intensity (gCO2/kWh)\",\"type\":\"integer\"}},\"type\":\"object\"},\"to\":{\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/intensity/stats/{from}/{to}/{block}","segments":[{"lit":"intensity"},{"lit":"stats"},{"var":"from"},{"var":"to"},{"var":"block"}],"select":{"exist":["block","from","to"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"from","orig":"from","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"to","orig":"to","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /intensity/stats/{from}/{to}","json":"{\"operationId\":\"getIntensityStats\",\"parameters\":[{\"description\":\"Start datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)\",\"in\":\"path\",\"name\":\"from\",\"required\":true,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"End datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)\",\"in\":\"path\",\"name\":\"to\",\"required\":true,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"format\":\"date-time\",\"type\":\"string\"},\"intensity\":{\"properties\":{\"average\":{\"description\":\"Average carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Average intensity index\",\"type\":\"string\"},\"max\":{\"description\":\"Maximum carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"min\":{\"description\":\"Minimum carbon intensity (gCO2/kWh)\",\"type\":\"integer\"}},\"type\":\"object\"},\"to\":{\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/intensity/stats/{from}/{to}","segments":[{"lit":"intensity"},{"lit":"stats"},{"var":"from"},{"var":"to"}],"select":{"exist":["from","to"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["stat"]]},"key$":"stat","name__orig":"stat","Name":"Stat","name_":"stat","name-":"stat","NAME":"STAT","index$":8}, {"active":true,"entity":"stat","key$":"BasicStatFlow","kind":"basic","name":"BasicStatFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"stat_ref01","srcdatavar":"stat_ref01_data","suffix":"_dt0"},"match":{"from":"from01","id":"stat01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-stat_ref01"}}],"index$":0}]}, 'Stat')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let stat_ref01_data = Object.values(setup.data.existing.stat)[0] as any

    // LOAD
    const stat_ref01_ent = client.Stat()
    const stat_ref01_match_dt0: any = {}
    stat_ref01_match_dt0.id = stat_ref01_data.id
    const stat_ref01_data_dt0 = (await stat_ref01_ent.load(stat_ref01_match_dt0)).data()
    assert(stat_ref01_data_dt0.id === stat_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/stat/StatTestData.json')

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
    ['stat01','stat02','stat03','stat01','stat02','stat03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CARBON_INTENSITY_TEST_STAT_ENTID': idmap,
    'CARBON_INTENSITY_TEST_LIVE': 'FALSE',
    'CARBON_INTENSITY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CARBON_INTENSITY_TEST_STAT_ENTID']

  const live = 'TRUE' === env.CARBON_INTENSITY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CARBON_INTENSITY_TEST_STAT_ENTID']
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
  
