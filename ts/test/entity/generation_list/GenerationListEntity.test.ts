

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


describe('GenerationListEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CARBON_INTENSITY_TEST_LIVE=TRUE.
  afterEach(liveDelay('CARBON_INTENSITY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CarbonIntensitySDK.test()
    const ent = testsdk.GenerationList()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CARBON_INTENSITY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'generation_list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"from":{"a":true,"fo":"date-time","h":"From","n":"from","r":false,"t":"`$STRING`","key$":"from","index$":0},"generationmix":{"a":true,"h":"Generationmix","n":"generationmix","r":false,"t":"`$ARRAY`","key$":"generationmix","index$":1},"to":{"a":true,"fo":"date-time","h":"To","n":"to","r":false,"t":"`$STRING`","key$":"to","index$":2}},"name":"generation_list","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /generation/{from}/pt24h","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/generation/{from}/pt24h","q":{"exist":["from"]},"r":{},"s":[{"lit":"generation"},{"var":"from"},{"lit":"pt24h"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.generation"]]},"key$":"generation_list","name__orig":"generation_list","Name":"GenerationList","name_":"generation_list","name-":"generation-list","NAME":"GENERATION_LIST","index$":1}, {"active":true,"entity":"generation_list","key$":"BasicGenerationListFlow","kind":"basic","name":"BasicGenerationListFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"from":"from01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"generation_list_ref01"}}],"index$":0}]}, 'GenerationList', {"GET /generation/{from}/pt24h":{"protocol":"http","operationId":"getGenerationPast24h","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"properties":{"from":{"format":"date-time","type":"string","key$":"from"},"generationmix":{"items":{"properties":{"fuel":{"description":"Fuel type","type":"string"},"perc":{"description":"Percentage of total generation","format":"float","type":"number"}},"type":"object","x-ref":"#/components/schemas/GenerationMix"},"type":"array","key$":"generationmix"},"to":{"format":"date-time","type":"string","key$":"to"}},"type":"object","x-ref":"#/components/schemas/GenerationData","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/GenerationListResponse"}}}}},"parameters":[{"name":"from","in":"path","required":true,"description":"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let generation_list_ref01_data = Object.values(setup.data.existing.generation_list)[0] as any

    // LIST
    const generation_list_ref01_ent = client.GenerationList()
    const generation_list_ref01_match: any = {}
    generation_list_ref01_match['from'] = setup.idmap['from01']

    const generation_list_ref01_list = (await generation_list_ref01_ent.list(generation_list_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/generation_list/GenerationListTestData.json')

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
    ['generation_list01','generation_list02','generation_list03','generation01','generation02','generation03','from01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CARBON_INTENSITY_TEST_GENERATION_LIST_ENTID': idmap,
    'CARBON_INTENSITY_TEST_LIVE': 'FALSE',
    'CARBON_INTENSITY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CARBON_INTENSITY_TEST_GENERATION_LIST_ENTID']

  const live = 'TRUE' === env.CARBON_INTENSITY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CARBON_INTENSITY_TEST_GENERATION_LIST_ENTID']
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
  
