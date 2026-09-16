

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"data","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"format":"date-time","name":"from","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"generationmix","req":false,"type":"`$ARRAY`","index$":2},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":3},{"active":true,"format":"date-time","name":"to","req":false,"type":"`$STRING`","index$":4}],"id":{"field":"id","from":{"from":"from","to":"to"},"name":"id","parts":["from","to"],"sep":"/"},"name":"generation","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /generation","json":"{\"operationId\":\"getCurrentGeneration\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"format\":\"date-time\",\"type\":\"string\"},\"generationmix\":{\"items\":{\"properties\":{\"fuel\":{\"description\":\"Fuel type\",\"type\":\"string\"},\"perc\":{\"description\":\"Percentage of total generation\",\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"to\":{\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/generation","segments":[{"lit":"generation"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"from","orig":"from","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"to","orig":"to","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /generation/{from}/{to}","json":"{\"operationId\":\"getGenerationBetweenDatetimes\",\"parameters\":[{\"description\":\"Start datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)\",\"in\":\"path\",\"name\":\"from\",\"required\":true,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"End datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)\",\"in\":\"path\",\"name\":\"to\",\"required\":true,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"from\":{\"format\":\"date-time\",\"type\":\"string\"},\"generationmix\":{\"items\":{\"properties\":{\"fuel\":{\"description\":\"Fuel type\",\"type\":\"string\"},\"perc\":{\"description\":\"Percentage of total generation\",\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"to\":{\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/generation/{from}/{to}","segments":[{"lit":"generation"},{"var":"from"},{"var":"to"}],"select":{"exist":["from","to"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["generation"]]},"key$":"generation","name__orig":"generation","Name":"Generation","name_":"generation","name-":"generation","NAME":"GENERATION","index$":0}, {"active":true,"entity":"generation","key$":"BasicGenerationFlow","kind":"basic","name":"BasicGenerationFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"generation_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"generation_ref01","srcdatavar":"generation_ref01_data","suffix":"_dt0"},"match":{"from":"from01","id":"generation01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-generation_ref01"}}],"index$":1}]}, 'Generation')
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
    ['generation01','generation02','generation03','generation01','generation02','generation03'],
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
  
