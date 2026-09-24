

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


describe('RegionalEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CARBON_INTENSITY_TEST_LIVE=TRUE.
  afterEach(liveDelay('CARBON_INTENSITY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CarbonIntensitySDK.test()
    const ent = testsdk.Regional()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CARBON_INTENSITY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'regional.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":false,"t":"`$ARRAY`","key$":"data","index$":0},"dnoregion":{"a":true,"h":"Dnoregion","n":"dnoregion","r":false,"sh":"Distribution Network Operator region","t":"`$STRING`","key$":"dnoregion","index$":1},"postcode":{"a":true,"h":"Postcode","n":"postcode","r":false,"sh":"Outward postcode","t":"`$STRING`","key$":"postcode","index$":2},"regionid":{"a":true,"h":"Regionid","n":"regionid","r":false,"sh":"Region ID (1-17)","t":"`$INTEGER`","key$":"regionid","index$":3},"shortname":{"a":true,"h":"Shortname","n":"shortname","r":false,"sh":"Short region name","t":"`$STRING`","key$":"shortname","index$":4}},"name":"regional","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /regional","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/regional","q":{},"r":{},"s":[{"lit":"regional"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"regional","name__orig":"regional","Name":"Regional","name_":"regional","name-":"regional","NAME":"REGIONAL","index$":5}, {"active":true,"entity":"regional","key$":"BasicRegionalFlow","kind":"basic","name":"BasicRegionalFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"regional_ref01"}}],"index$":0}]}, 'Regional', {"GET /regional":{"protocol":"http","operationId":"getRegionalIntensity","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"properties":{"data":{"items":{"properties":{"from":{"format":"date-time","type":"string"},"generationmix":{"items":{"properties":{"fuel":{"description":"Fuel type","type":"string"},"perc":{"description":"Percentage of total generation","format":"float","type":"number"}},"type":"object","x-ref":"#/components/schemas/GenerationMix"},"type":"array"},"intensity":{"properties":{"forecast":{"description":"Forecasted carbon intensity (gCO2/kWh)","type":"integer"},"index":{"description":"Intensity index","type":"string"}},"type":"object"},"to":{"format":"date-time","type":"string"}},"type":"object"},"type":"array","key$":"data"},"dnoregion":{"description":"Distribution Network Operator region","type":"string","key$":"dnoregion"},"postcode":{"description":"Outward postcode","type":"string","key$":"postcode"},"regionid":{"description":"Region ID (1-17)","type":"integer","key$":"regionid"},"shortname":{"description":"Short region name","type":"string","key$":"shortname"}},"type":"object","x-ref":"#/components/schemas/RegionalData","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/RegionalIntensityResponse"}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let regional_ref01_data = Object.values(setup.data.existing.regional)[0] as any

    // LIST
    const regional_ref01_ent = client.Regional()
    const regional_ref01_match: any = {}

    const regional_ref01_list = (await regional_ref01_ent.list(regional_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/regional/RegionalTestData.json')

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
    ['regional01','regional02','regional03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CARBON_INTENSITY_TEST_REGIONAL_ENTID': idmap,
    'CARBON_INTENSITY_TEST_LIVE': 'FALSE',
    'CARBON_INTENSITY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CARBON_INTENSITY_TEST_REGIONAL_ENTID']

  const live = 'TRUE' === env.CARBON_INTENSITY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CARBON_INTENSITY_TEST_REGIONAL_ENTID']
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
  
