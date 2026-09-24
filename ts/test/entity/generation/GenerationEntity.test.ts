

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


describe('GenerationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CARBON_INTENSITY_TEST_LIVE=TRUE.
  afterEach(liveDelay('CARBON_INTENSITY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CarbonIntensitySDK.test()
    const ent = testsdk.Generation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CARBON_INTENSITY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'generation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":false,"t":"`$ARRAY`","key$":"data","index$":0},"from":{"a":true,"fo":"date-time","h":"From","n":"from","r":false,"t":"`$STRING`","key$":"from","index$":1},"generationmix":{"a":true,"h":"Generationmix","n":"generationmix","r":false,"t":"`$ARRAY`","key$":"generationmix","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"to":{"a":true,"fo":"date-time","h":"To","n":"to","r":false,"t":"`$STRING`","key$":"to","index$":4}},"id":{"field":"id","from":{"from":"from","to":"to"},"name":"id","parts":["from","to"],"sep":"/"},"name":"generation","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /generation","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/generation","q":{},"r":{},"s":[{"lit":"generation"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /generation/{from}/{to}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"to","or":"to","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/generation/{from}/{to}","q":{"exist":["from","to"]},"r":{},"s":[{"lit":"generation"},{"var":"from"},{"var":"to"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"generation","name__orig":"generation","Name":"Generation","name_":"generation","name-":"generation","NAME":"GENERATION","index$":0}, {"active":true,"entity":"generation","key$":"BasicGenerationFlow","kind":"basic","name":"BasicGenerationFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"generation_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"generation_ref01","srcdatavar":"generation_ref01_data","suffix":"_dt0"},"m":{"from":"from01","id":"generation01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-generation_ref01"}}],"index$":1}]}, 'Generation', {"GET /generation":{"protocol":"http","operationId":"getCurrentGeneration","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"properties":{"from":{"format":"date-time","type":"string","key$":"from"},"generationmix":{"items":{"properties":{"fuel":{"description":"Fuel type","type":"string"},"perc":{"description":"Percentage of total generation","format":"float","type":"number"}},"type":"object","x-ref":"#/components/schemas/GenerationMix"},"type":"array","key$":"generationmix"},"to":{"format":"date-time","type":"string","key$":"to"}},"type":"object","x-ref":"#/components/schemas/GenerationData","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/GenerationResponse"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /generation/{from}/{to}":{"protocol":"http","operationId":"getGenerationBetweenDatetimes","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"properties":{"from":{"format":"date-time","type":"string","key$":"from"},"generationmix":{"items":{"properties":{"fuel":{"description":"Fuel type","type":"string"},"perc":{"description":"Percentage of total generation","format":"float","type":"number"}},"type":"object","x-ref":"#/components/schemas/GenerationMix"},"type":"array","key$":"generationmix"},"to":{"format":"date-time","type":"string","key$":"to"}},"type":"object","x-ref":"#/components/schemas/GenerationData","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/GenerationListResponse","index$":0}}}}},"parameters":[{"name":"from","in":"path","required":true,"description":"Start datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0},{"name":"to","in":"path","required":true,"description":"End datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let generation_ref01_data = Object.values(setup.data.existing.generation)[0] as any

    // LIST
    const generation_ref01_ent = client.Generation()
    const generation_ref01_match: any = {}

    const generation_ref01_list = (await generation_ref01_ent.list(generation_ref01_match)).map((e: any) => e.data())


    // LOAD
    const generation_ref01_match_dt0: any = {}
    generation_ref01_match_dt0.id = generation_ref01_data.id
    const generation_ref01_data_dt0 = (await generation_ref01_ent.load(generation_ref01_match_dt0)).data()
    assert(generation_ref01_data_dt0.id === generation_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/generation/GenerationTestData.json')

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
    ['generation01','generation02','generation03','from01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CARBON_INTENSITY_TEST_GENERATION_ENTID': idmap,
    'CARBON_INTENSITY_TEST_LIVE': 'FALSE',
    'CARBON_INTENSITY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CARBON_INTENSITY_TEST_GENERATION_ENTID']

  const live = 'TRUE' === env.CARBON_INTENSITY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CARBON_INTENSITY_TEST_GENERATION_ENTID']
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
  
