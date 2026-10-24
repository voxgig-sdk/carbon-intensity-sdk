

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CarbonIntensitySDK, BaseFeature, config, stdutil } from '../../..'

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


describe('IntensityListEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CARBON_INTENSITY_TEST_LIVE=TRUE.
  afterEach(liveDelay('CARBON_INTENSITY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CarbonIntensitySDK.test()
    const ent = testsdk.IntensityList()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('intensity_list hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of CarbonIntensitySDK.test(offline).IntensityList().stream('list')) { }
    }, /offline/)

    for await (const _item of CarbonIntensitySDK.test(offline).IntensityList()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = CarbonIntensitySDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.IntensityList().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of CarbonIntensitySDK.test().IntensityList().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new CarbonIntensitySDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.IntensityList().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.IntensityList().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CarbonIntensitySDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.IntensityList().list({"from":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CARBON_INTENSITY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'intensity_list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":false,"t":"`$ARRAY`","key$":"data","index$":0},"from":{"a":true,"fo":"date-time","h":"From","n":"from","r":false,"sh":"Start datetime of the period","t":"`$STRING`","key$":"from","index$":1},"intensity":{"a":true,"h":"Intensity","n":"intensity","r":false,"t":"`$OBJECT`","key$":"intensity","index$":2},"to":{"a":true,"fo":"date-time","h":"To","n":"to","r":false,"sh":"End datetime of the period","t":"`$STRING`","key$":"to","index$":3}},"name":"intensity_list","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /intensity/{from}/fw24h","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/intensity/{from}/fw24h","q":{"exist":["from"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"intensity"},{"var":"from"},{"lit":"fw24h"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /intensity/{from}/fw48h","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/intensity/{from}/fw48h","q":{"exist":["from"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"intensity"},{"var":"from"},{"lit":"fw48h"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1},{"a":true,"co":{"id":"GET /intensity/{from}/pt24h","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/intensity/{from}/pt24h","q":{"exist":["from"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"intensity"},{"var":"from"},{"lit":"pt24h"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":2},{"a":true,"co":{"id":"GET /intensity/date","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/intensity/date","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"intensity"},{"lit":"date"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":3}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /intensity/date/{date}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"date","or":"date","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/intensity/date/{date}","q":{"exist":["date"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"intensity"},{"lit":"date"},{"var":"date"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.intensity"]]},"key$":"intensity_list","name__orig":"intensity_list","Name":"IntensityList","name_":"intensity_list","name-":"intensity-list","NAME":"INTENSITY_LIST","index$":4}, {"active":true,"entity":"intensity_list","key$":"BasicIntensityListFlow","kind":"basic","name":"BasicIntensityListFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"intensity_list_ref01"}}],"index$":0},{"a":false,"d":{},"i":{"ref":"intensity_list_ref01","srcdatavar":"intensity_list_ref01_data","suffix":"_dt0"},"m":{"id":"intensity_list01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-intensity_list_ref01"}}],"unreachable":true}]}, 'IntensityList', {"GET /intensity/{from}/fw24h":{"protocol":"http","parameters":[{"name":"from","in":"path","required":true,"description":"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0}]},"GET /intensity/{from}/fw48h":{"protocol":"http","parameters":[{"name":"from","in":"path","required":true,"description":"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0}]},"GET /intensity/{from}/pt24h":{"protocol":"http","parameters":[{"name":"from","in":"path","required":true,"description":"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0}]},"GET /intensity/date":{"protocol":"http","parameters":[]},"GET /intensity/date/{date}":{"protocol":"http","parameters":[{"name":"date","in":"path","required":true,"description":"Date in YYYY-MM-DD format","schema":{"type":"string","format":"date"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let intensity_list_ref01_data = Object.values(setup.data.existing.intensity_list)[0] as any

    // LIST
    const intensity_list_ref01_ent = client.IntensityList()
    const intensity_list_ref01_match: any = {}

    const intensity_list_ref01_list = (await intensity_list_ref01_ent.list(intensity_list_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/intensity_list/IntensityListTestData.json')

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
    ['intensity_list01','intensity_list02','intensity_list03','intensity01','intensity02','intensity03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CARBON_INTENSITY_TEST_INTENSITY_LIST_ENTID': idmap,
    'CARBON_INTENSITY_TEST_LIVE': 'FALSE',
    'CARBON_INTENSITY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CARBON_INTENSITY_TEST_INTENSITY_LIST_ENTID']

  const live = 'TRUE' === env.CARBON_INTENSITY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CARBON_INTENSITY_TEST_INTENSITY_LIST_ENTID']
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
  
