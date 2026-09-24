

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":false,"t":"`$ARRAY`","key$":"data","index$":0},"from":{"a":true,"fo":"date-time","h":"From","n":"from","r":false,"sh":"Start datetime of the period","t":"`$STRING`","key$":"from","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"intensity":{"a":true,"h":"Intensity","n":"intensity","r":false,"t":"`$OBJECT`","key$":"intensity","index$":3},"to":{"a":true,"fo":"date-time","h":"To","n":"to","r":false,"sh":"End datetime of the period","t":"`$STRING`","key$":"to","index$":4}},"id":{"field":"id","name":"id"},"name":"intensity","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /intensity","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/intensity","q":{},"r":{},"s":[{"lit":"intensity"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /intensity/date/{date}/{period}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"date","or":"date","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"period","or":"period","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/intensity/date/{date}/{period}","q":{"exist":["date","period"]},"r":{},"s":[{"lit":"intensity"},{"lit":"date"},{"var":"date"},{"var":"period"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /intensity/{from}/{to}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"to","or":"to","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/intensity/{from}/{to}","q":{"exist":["from","to"]},"r":{},"s":[{"lit":"intensity"},{"var":"from"},{"var":"to"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /intensity/{from}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"from","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/intensity/{from}","q":{"exist":["id"]},"r":{"param":{"from":"id"}},"s":[{"lit":"intensity"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"intensity","name__orig":"intensity","Name":"Intensity","name_":"intensity","name-":"intensity","NAME":"INTENSITY","index$":2}, {"active":true,"entity":"intensity","key$":"BasicIntensityFlow","kind":"basic","name":"BasicIntensityFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"intensity_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"intensity_ref01","srcdatavar":"intensity_ref01_data","suffix":"_dt0"},"m":{"id":"intensity01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-intensity_ref01"}}],"index$":1}]}, 'Intensity', {"GET /intensity":{"protocol":"http","operationId":"getCurrentIntensity","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"properties":{"from":{"description":"Start datetime of the period","format":"date-time","type":"string","key$":"from"},"intensity":{"properties":{"actual":{"description":"Actual carbon intensity (gCO2/kWh)","type":"integer"},"forecast":{"description":"Forecasted carbon intensity (gCO2/kWh)","type":"integer"},"index":{"description":"Intensity index","enum":["very low","low","moderate","high","very high"],"type":"string"}},"type":"object","key$":"intensity"},"to":{"description":"End datetime of the period","format":"date-time","type":"string","key$":"to"}},"type":"object","x-ref":"#/components/schemas/IntensityData","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/IntensityResponse"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /intensity/date/{date}/{period}":{"protocol":"http","operationId":"getIntensityByDateAndPeriod","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"properties":{"from":{"description":"Start datetime of the period","format":"date-time","type":"string","key$":"from"},"intensity":{"properties":{"actual":{"description":"Actual carbon intensity (gCO2/kWh)","type":"integer"},"forecast":{"description":"Forecasted carbon intensity (gCO2/kWh)","type":"integer"},"index":{"description":"Intensity index","enum":["very low","low","moderate","high","very high"],"type":"string"}},"type":"object","key$":"intensity"},"to":{"description":"End datetime of the period","format":"date-time","type":"string","key$":"to"}},"type":"object","x-ref":"#/components/schemas/IntensityData","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/IntensityResponse","index$":0}}}}},"parameters":[{"name":"date","in":"path","required":true,"description":"Date in YYYY-MM-DD format","schema":{"type":"string","format":"date"},"index$":0},{"name":"period","in":"path","required":true,"description":"Settlement period (1-48)","schema":{"type":"integer","minimum":1,"maximum":48},"index$":1}],"securitySource":"unspecified"},"GET /intensity/{from}/{to}":{"protocol":"http","operationId":"getIntensityBetweenDatetimes","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"properties":{"from":{"description":"Start datetime of the period","format":"date-time","type":"string","key$":"from"},"intensity":{"properties":{"actual":{"description":"Actual carbon intensity (gCO2/kWh)","type":"integer"},"forecast":{"description":"Forecasted carbon intensity (gCO2/kWh)","type":"integer"},"index":{"description":"Intensity index","enum":["very low","low","moderate","high","very high"],"type":"string"}},"type":"object","key$":"intensity"},"to":{"description":"End datetime of the period","format":"date-time","type":"string","key$":"to"}},"type":"object","x-ref":"#/components/schemas/IntensityData","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/IntensityListResponse","index$":0}}}}},"parameters":[{"name":"from","in":"path","required":true,"description":"Start datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0},{"name":"to","in":"path","required":true,"description":"End datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":1}],"securitySource":"unspecified"},"GET /intensity/{from}":{"protocol":"http","operationId":"getIntensityByDatetime","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"properties":{"from":{"description":"Start datetime of the period","format":"date-time","type":"string","key$":"from"},"intensity":{"properties":{"actual":{"description":"Actual carbon intensity (gCO2/kWh)","type":"integer"},"forecast":{"description":"Forecasted carbon intensity (gCO2/kWh)","type":"integer"},"index":{"description":"Intensity index","enum":["very low","low","moderate","high","very high"],"type":"string"}},"type":"object","key$":"intensity"},"to":{"description":"End datetime of the period","format":"date-time","type":"string","key$":"to"}},"type":"object","x-ref":"#/components/schemas/IntensityData","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/IntensityResponse","index$":0}}}}},"parameters":[{"name":"from","in":"path","required":true,"description":"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0}],"securitySource":"unspecified"}})
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
    ['intensity01','intensity02','intensity03'],
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
  
