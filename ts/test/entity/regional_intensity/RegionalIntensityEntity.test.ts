

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":false,"t":"`$ARRAY`","key$":"data","index$":0},"dnoregion":{"a":true,"h":"Dnoregion","n":"dnoregion","r":false,"sh":"Distribution Network Operator region","t":"`$STRING`","key$":"dnoregion","index$":1},"postcode":{"a":true,"h":"Postcode","n":"postcode","r":false,"sh":"Outward postcode","t":"`$STRING`","key$":"postcode","index$":2},"regionid":{"a":true,"h":"Regionid","n":"regionid","r":false,"sh":"Region ID (1-17)","t":"`$INTEGER`","key$":"regionid","index$":3},"shortname":{"a":true,"h":"Shortname","n":"shortname","r":false,"sh":"Short region name","t":"`$STRING`","key$":"shortname","index$":4}},"name":"regional_intensity","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /regional/england","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/regional/england","q":{},"r":{},"s":[{"lit":"regional"},{"lit":"england"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /regional/scotland","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/regional/scotland","q":{},"r":{},"s":[{"lit":"regional"},{"lit":"scotland"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1},{"a":true,"co":{"id":"GET /regional/wales","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/regional/wales","q":{},"r":{},"s":[{"lit":"regional"},{"lit":"wales"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":2}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /regional/postcode/{postcode}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"postcode","or":"postcode","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/regional/postcode/{postcode}","q":{"exist":["postcode"]},"r":{},"s":[{"lit":"regional"},{"lit":"postcode"},{"var":"postcode"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /regional/regionid/{regionid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"regionid","or":"regionid","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/regional/regionid/{regionid}","q":{"exist":["regionid"]},"r":{},"s":[{"lit":"regional"},{"lit":"regionid"},{"var":"regionid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"regional_intensity","name__orig":"regional_intensity","Name":"RegionalIntensity","name_":"regional_intensity","name-":"regional-intensity","NAME":"REGIONAL_INTENSITY","index$":6}, {"active":true,"entity":"regional_intensity","key$":"BasicRegionalIntensityFlow","kind":"basic","name":"BasicRegionalIntensityFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"regional_intensity_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"regional_intensity_ref01","srcdatavar":"regional_intensity_ref01_data","suffix":"_dt0"},"m":{"id":"regional_intensity01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-regional_intensity_ref01"}}],"index$":1}]}, 'RegionalIntensity', {"GET /regional/england":{"protocol":"http","operationId":"getEnglandIntensity","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"properties":{"data":{"items":{"properties":{"from":{"format":"date-time","type":"string"},"generationmix":{"items":{"properties":{"fuel":{"description":"Fuel type","type":"string"},"perc":{"description":"Percentage of total generation","format":"float","type":"number"}},"type":"object","x-ref":"#/components/schemas/GenerationMix"},"type":"array"},"intensity":{"properties":{"forecast":{"description":"Forecasted carbon intensity (gCO2/kWh)","type":"integer"},"index":{"description":"Intensity index","type":"string"}},"type":"object"},"to":{"format":"date-time","type":"string"}},"type":"object"},"type":"array","key$":"data"},"dnoregion":{"description":"Distribution Network Operator region","type":"string","key$":"dnoregion"},"postcode":{"description":"Outward postcode","type":"string","key$":"postcode"},"regionid":{"description":"Region ID (1-17)","type":"integer","key$":"regionid"},"shortname":{"description":"Short region name","type":"string","key$":"shortname"}},"type":"object","x-ref":"#/components/schemas/RegionalData","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/RegionalIntensityResponse"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /regional/scotland":{"protocol":"http","operationId":"getScotlandIntensity","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"properties":{"data":{"items":{"properties":{"from":{"format":"date-time","type":"string"},"generationmix":{"items":{"properties":{"fuel":{"description":"Fuel type","type":"string"},"perc":{"description":"Percentage of total generation","format":"float","type":"number"}},"type":"object","x-ref":"#/components/schemas/GenerationMix"},"type":"array"},"intensity":{"properties":{"forecast":{"description":"Forecasted carbon intensity (gCO2/kWh)","type":"integer"},"index":{"description":"Intensity index","type":"string"}},"type":"object"},"to":{"format":"date-time","type":"string"}},"type":"object"},"type":"array","key$":"data"},"dnoregion":{"description":"Distribution Network Operator region","type":"string","key$":"dnoregion"},"postcode":{"description":"Outward postcode","type":"string","key$":"postcode"},"regionid":{"description":"Region ID (1-17)","type":"integer","key$":"regionid"},"shortname":{"description":"Short region name","type":"string","key$":"shortname"}},"type":"object","x-ref":"#/components/schemas/RegionalData","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/RegionalIntensityResponse"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /regional/wales":{"protocol":"http","operationId":"getWalesIntensity","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"properties":{"data":{"items":{"properties":{"from":{"format":"date-time","type":"string"},"generationmix":{"items":{"properties":{"fuel":{"description":"Fuel type","type":"string"},"perc":{"description":"Percentage of total generation","format":"float","type":"number"}},"type":"object","x-ref":"#/components/schemas/GenerationMix"},"type":"array"},"intensity":{"properties":{"forecast":{"description":"Forecasted carbon intensity (gCO2/kWh)","type":"integer"},"index":{"description":"Intensity index","type":"string"}},"type":"object"},"to":{"format":"date-time","type":"string"}},"type":"object"},"type":"array","key$":"data"},"dnoregion":{"description":"Distribution Network Operator region","type":"string","key$":"dnoregion"},"postcode":{"description":"Outward postcode","type":"string","key$":"postcode"},"regionid":{"description":"Region ID (1-17)","type":"integer","key$":"regionid"},"shortname":{"description":"Short region name","type":"string","key$":"shortname"}},"type":"object","x-ref":"#/components/schemas/RegionalData","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/RegionalIntensityResponse"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /regional/postcode/{postcode}":{"protocol":"http","operationId":"getIntensityByPostcode","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"properties":{"data":{"items":{"properties":{"from":{"format":"date-time","type":"string"},"generationmix":{"items":{"properties":{"fuel":{"description":"Fuel type","type":"string"},"perc":{"description":"Percentage of total generation","format":"float","type":"number"}},"type":"object","x-ref":"#/components/schemas/GenerationMix"},"type":"array"},"intensity":{"properties":{"forecast":{"description":"Forecasted carbon intensity (gCO2/kWh)","type":"integer"},"index":{"description":"Intensity index","type":"string"}},"type":"object"},"to":{"format":"date-time","type":"string"}},"type":"object"},"type":"array","key$":"data"},"dnoregion":{"description":"Distribution Network Operator region","type":"string","key$":"dnoregion"},"postcode":{"description":"Outward postcode","type":"string","key$":"postcode"},"regionid":{"description":"Region ID (1-17)","type":"integer","key$":"regionid"},"shortname":{"description":"Short region name","type":"string","key$":"shortname"}},"type":"object","x-ref":"#/components/schemas/RegionalData","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/RegionalIntensityResponse","index$":0}}}}},"parameters":[{"name":"postcode","in":"path","required":true,"description":"Outward postcode (e.g., SW1)","schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"},"GET /regional/regionid/{regionid}":{"protocol":"http","operationId":"getIntensityByRegionId","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"properties":{"data":{"items":{"properties":{"from":{"format":"date-time","type":"string"},"generationmix":{"items":{"properties":{"fuel":{"description":"Fuel type","type":"string"},"perc":{"description":"Percentage of total generation","format":"float","type":"number"}},"type":"object","x-ref":"#/components/schemas/GenerationMix"},"type":"array"},"intensity":{"properties":{"forecast":{"description":"Forecasted carbon intensity (gCO2/kWh)","type":"integer"},"index":{"description":"Intensity index","type":"string"}},"type":"object"},"to":{"format":"date-time","type":"string"}},"type":"object"},"type":"array","key$":"data"},"dnoregion":{"description":"Distribution Network Operator region","type":"string","key$":"dnoregion"},"postcode":{"description":"Outward postcode","type":"string","key$":"postcode"},"regionid":{"description":"Region ID (1-17)","type":"integer","key$":"regionid"},"shortname":{"description":"Short region name","type":"string","key$":"shortname"}},"type":"object","x-ref":"#/components/schemas/RegionalData","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/RegionalIntensityResponse","index$":0}}}}},"parameters":[{"name":"regionid","in":"path","required":true,"description":"Region ID (1-17)","schema":{"type":"integer","minimum":1,"maximum":17},"index$":0}],"securitySource":"unspecified"}})
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
    ['regional_intensity01','regional_intensity02','regional_intensity03'],
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
  
