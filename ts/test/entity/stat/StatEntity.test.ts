

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":false,"t":"`$ARRAY`","key$":"data","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1}},"id":{"field":"id","name":"id","parts":["from","to","block"],"sep":"/"},"name":"stat","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /intensity/stats/{from}/{to}/{block}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"block","or":"block","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"to","or":"to","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/intensity/stats/{from}/{to}/{block}","q":{"exist":["block","from","to"]},"r":{},"s":[{"lit":"intensity"},{"lit":"stats"},{"var":"from"},{"var":"to"},{"var":"block"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /intensity/stats/{from}/{to}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"to","or":"to","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/intensity/stats/{from}/{to}","q":{"exist":["from","to"]},"r":{},"s":[{"lit":"intensity"},{"lit":"stats"},{"var":"from"},{"var":"to"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"stat","name__orig":"stat","Name":"Stat","name_":"stat","name-":"stat","NAME":"STAT","index$":8}, {"active":true,"entity":"stat","key$":"BasicStatFlow","kind":"basic","name":"BasicStatFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"stat_ref01","srcdatavar":"stat_ref01_data","suffix":"_dt0"},"m":{"from":"from01","id":"stat01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-stat_ref01"}}],"index$":0}]}, 'Stat', {"GET /intensity/stats/{from}/{to}/{block}":{"protocol":"http","operationId":"getIntensityStatsBlocks","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","properties":{"from":{"type":"string","format":"date-time"},"to":{"type":"string","format":"date-time"},"intensity":{"type":"object","properties":{"max":{"type":"integer","description":"Maximum carbon intensity (gCO2/kWh)"},"average":{"type":"integer","description":"Average carbon intensity (gCO2/kWh)"},"min":{"type":"integer","description":"Minimum carbon intensity (gCO2/kWh)"},"index":{"type":"string","description":"Average intensity index"}}}}},"key$":"data"}},"x-ref":"#/components/schemas/StatsBlockResponse","index$":0}}}}},"parameters":[{"name":"from","in":"path","required":true,"description":"Start datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0},{"name":"to","in":"path","required":true,"description":"End datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":1},{"name":"block","in":"path","required":true,"description":"Block length in hours (e.g., 2 for 2-hour blocks)","schema":{"type":"integer"},"index$":2}],"securitySource":"unspecified"},"GET /intensity/stats/{from}/{to}":{"protocol":"http","operationId":"getIntensityStats","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","properties":{"from":{"type":"string","format":"date-time"},"to":{"type":"string","format":"date-time"},"intensity":{"type":"object","properties":{"max":{"type":"integer","description":"Maximum carbon intensity (gCO2/kWh)"},"average":{"type":"integer","description":"Average carbon intensity (gCO2/kWh)"},"min":{"type":"integer","description":"Minimum carbon intensity (gCO2/kWh)"},"index":{"type":"string","description":"Average intensity index"}}}}},"key$":"data"}},"x-ref":"#/components/schemas/StatsResponse","index$":0}}}}},"parameters":[{"name":"from","in":"path","required":true,"description":"Start datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0},{"name":"to","in":"path","required":true,"description":"End datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":1}],"securitySource":"unspecified"}})
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
    ['stat01','stat02','stat03','from01'],
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
  
