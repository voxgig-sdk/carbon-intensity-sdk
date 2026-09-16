

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


describe('RegionalIntensityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CARBON_INTENSITY_TEST_LIVE=TRUE.
  afterEach(liveDelay('CARBON_INTENSITY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CarbonIntensitySDK.test()
    const ent = testsdk.RegionalIntensity()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CARBON_INTENSITY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'regional_intensity.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"data","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"dnoregion","req":false,"short":"Distribution Network Operator region","type":"`$STRING`","index$":1},{"active":true,"name":"postcode","req":false,"short":"Outward postcode","type":"`$STRING`","index$":2},{"active":true,"name":"regionid","req":false,"short":"Region ID (1-17)","type":"`$INTEGER`","index$":3},{"active":true,"name":"shortname","req":false,"short":"Short region name","type":"`$STRING`","index$":4}],"name":"regional_intensity","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /regional/england","json":"{\"operationId\":\"getEnglandIntensity\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"format\":\"date-time\",\"type\":\"string\"},\"generationmix\":{\"items\":{\"properties\":{\"fuel\":{\"description\":\"Fuel type\",\"type\":\"string\"},\"perc\":{\"description\":\"Percentage of total generation\",\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"intensity\":{\"properties\":{\"forecast\":{\"description\":\"Forecasted carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Intensity index\",\"type\":\"string\"}},\"type\":\"object\"},\"to\":{\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"dnoregion\":{\"description\":\"Distribution Network Operator region\",\"type\":\"string\"},\"postcode\":{\"description\":\"Outward postcode\",\"type\":\"string\"},\"regionid\":{\"description\":\"Region ID (1-17)\",\"type\":\"integer\"},\"shortname\":{\"description\":\"Short region name\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/regional/england","segments":[{"lit":"regional"},{"lit":"england"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /regional/scotland","json":"{\"operationId\":\"getScotlandIntensity\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"format\":\"date-time\",\"type\":\"string\"},\"generationmix\":{\"items\":{\"properties\":{\"fuel\":{\"description\":\"Fuel type\",\"type\":\"string\"},\"perc\":{\"description\":\"Percentage of total generation\",\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"intensity\":{\"properties\":{\"forecast\":{\"description\":\"Forecasted carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Intensity index\",\"type\":\"string\"}},\"type\":\"object\"},\"to\":{\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"dnoregion\":{\"description\":\"Distribution Network Operator region\",\"type\":\"string\"},\"postcode\":{\"description\":\"Outward postcode\",\"type\":\"string\"},\"regionid\":{\"description\":\"Region ID (1-17)\",\"type\":\"integer\"},\"shortname\":{\"description\":\"Short region name\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/regional/scotland","segments":[{"lit":"regional"},{"lit":"scotland"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":1},{"active":true,"args":{},"contract":{"id":"GET /regional/wales","json":"{\"operationId\":\"getWalesIntensity\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"format\":\"date-time\",\"type\":\"string\"},\"generationmix\":{\"items\":{\"properties\":{\"fuel\":{\"description\":\"Fuel type\",\"type\":\"string\"},\"perc\":{\"description\":\"Percentage of total generation\",\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"intensity\":{\"properties\":{\"forecast\":{\"description\":\"Forecasted carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Intensity index\",\"type\":\"string\"}},\"type\":\"object\"},\"to\":{\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"dnoregion\":{\"description\":\"Distribution Network Operator region\",\"type\":\"string\"},\"postcode\":{\"description\":\"Outward postcode\",\"type\":\"string\"},\"regionid\":{\"description\":\"Region ID (1-17)\",\"type\":\"integer\"},\"shortname\":{\"description\":\"Short region name\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/regional/wales","segments":[{"lit":"regional"},{"lit":"wales"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":2}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"postcode","orig":"postcode","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /regional/postcode/{postcode}","json":"{\"operationId\":\"getIntensityByPostcode\",\"parameters\":[{\"description\":\"Outward postcode (e.g., SW1)\",\"in\":\"path\",\"name\":\"postcode\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"format\":\"date-time\",\"type\":\"string\"},\"generationmix\":{\"items\":{\"properties\":{\"fuel\":{\"description\":\"Fuel type\",\"type\":\"string\"},\"perc\":{\"description\":\"Percentage of total generation\",\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"intensity\":{\"properties\":{\"forecast\":{\"description\":\"Forecasted carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Intensity index\",\"type\":\"string\"}},\"type\":\"object\"},\"to\":{\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"dnoregion\":{\"description\":\"Distribution Network Operator region\",\"type\":\"string\"},\"postcode\":{\"description\":\"Outward postcode\",\"type\":\"string\"},\"regionid\":{\"description\":\"Region ID (1-17)\",\"type\":\"integer\"},\"shortname\":{\"description\":\"Short region name\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/regional/postcode/{postcode}","segments":[{"lit":"regional"},{"lit":"postcode"},{"var":"postcode"}],"select":{"exist":["postcode"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"regionid","orig":"regionid","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /regional/regionid/{regionid}","json":"{\"operationId\":\"getIntensityByRegionId\",\"parameters\":[{\"description\":\"Region ID (1-17)\",\"in\":\"path\",\"name\":\"regionid\",\"required\":true,\"schema\":{\"maximum\":17,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"format\":\"date-time\",\"type\":\"string\"},\"generationmix\":{\"items\":{\"properties\":{\"fuel\":{\"description\":\"Fuel type\",\"type\":\"string\"},\"perc\":{\"description\":\"Percentage of total generation\",\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"intensity\":{\"properties\":{\"forecast\":{\"description\":\"Forecasted carbon intensity (gCO2/kWh)\",\"type\":\"integer\"},\"index\":{\"description\":\"Intensity index\",\"type\":\"string\"}},\"type\":\"object\"},\"to\":{\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"dnoregion\":{\"description\":\"Distribution Network Operator region\",\"type\":\"string\"},\"postcode\":{\"description\":\"Outward postcode\",\"type\":\"string\"},\"regionid\":{\"description\":\"Region ID (1-17)\",\"type\":\"integer\"},\"shortname\":{\"description\":\"Short region name\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/regional/regionid/{regionid}","segments":[{"lit":"regional"},{"lit":"regionid"},{"var":"regionid"}],"select":{"exist":["regionid"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["postcode"],["regionid"]]},"key$":"regional_intensity","name__orig":"regional_intensity","Name":"RegionalIntensity","name_":"regional_intensity","name-":"regional-intensity","NAME":"REGIONAL_INTENSITY","index$":6}, {"active":true,"entity":"regional_intensity","key$":"BasicRegionalIntensityFlow","kind":"basic","name":"BasicRegionalIntensityFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"regional_intensity_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"regional_intensity_ref01","srcdatavar":"regional_intensity_ref01_data","suffix":"_dt0"},"match":{"id":"regional_intensity01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-regional_intensity_ref01"}}],"index$":1}]}, 'RegionalIntensity')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let regional_intensity_ref01_data = Object.values(setup.data.existing.regional_intensity)[0] as any

    // LIST
    const regional_intensity_ref01_ent = client.RegionalIntensity()
    const regional_intensity_ref01_match: any = {}

    const regional_intensity_ref01_list = (await regional_intensity_ref01_ent.list(regional_intensity_ref01_match)).map((e: any) => e.data())



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/regional_intensity/RegionalIntensityTestData.json')

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
    ['regional_intensity01','regional_intensity02','regional_intensity03','postcode01','postcode02','postcode03','regionid01','regionid02','regionid03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CARBON_INTENSITY_TEST_REGIONAL_INTENSITY_ENTID': idmap,
    'CARBON_INTENSITY_TEST_LIVE': 'FALSE',
    'CARBON_INTENSITY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CARBON_INTENSITY_TEST_REGIONAL_INTENSITY_ENTID']

  const live = 'TRUE' === env.CARBON_INTENSITY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CARBON_INTENSITY_TEST_REGIONAL_INTENSITY_ENTID']
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
  
