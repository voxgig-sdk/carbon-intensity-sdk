

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


describe('RegionalIntensityListEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CARBON_INTENSITY_TEST_LIVE=TRUE.
  afterEach(liveDelay('CARBON_INTENSITY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CarbonIntensitySDK.test()
    const ent = testsdk.RegionalIntensityList()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CarbonIntensitySDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.RegionalIntensityList().list({"from":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CARBON_INTENSITY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'regional_intensity_list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":false,"t":"`$ARRAY`","key$":"data","index$":0},"dnoregion":{"a":true,"h":"Dnoregion","n":"dnoregion","r":false,"sh":"Distribution Network Operator region","t":"`$STRING`","key$":"dnoregion","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"postcode":{"a":true,"h":"Postcode","n":"postcode","r":false,"sh":"Outward postcode","t":"`$STRING`","key$":"postcode","index$":3},"regionid":{"a":true,"h":"Regionid","n":"regionid","r":false,"sh":"Region ID (1-17)","t":"`$INTEGER`","key$":"regionid","index$":4},"shortname":{"a":true,"h":"Shortname","n":"shortname","r":false,"sh":"Short region name","t":"`$STRING`","key$":"shortname","index$":5}},"id":{"field":"id","name":"id","parts":["from","to"],"sep":"/"},"name":"regional_intensity_list","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /regional/intensity/{from}/fw24h","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/regional/intensity/{from}/fw24h","q":{"exist":["from"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"regional"},{"lit":"intensity"},{"var":"from"},{"lit":"fw24h"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /regional/intensity/{from}/fw48h","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/regional/intensity/{from}/fw48h","q":{"exist":["from"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"regional"},{"lit":"intensity"},{"var":"from"},{"lit":"fw48h"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1},{"a":true,"co":{"id":"GET /regional/intensity/{from}/pt24h","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/regional/intensity/{from}/pt24h","q":{"exist":["from"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"regional"},{"lit":"intensity"},{"var":"from"},{"lit":"pt24h"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":2}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /regional/intensity/{from}/{to}/postcode/{postcode}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"postcode","or":"postcode","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"to","or":"to","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/regional/intensity/{from}/{to}/postcode/{postcode}","q":{"exist":["from","postcode","to"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"regional"},{"lit":"intensity"},{"var":"from"},{"var":"to"},{"lit":"postcode"},{"var":"postcode"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /regional/intensity/{from}/{to}/regionid/{regionid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"regionid","or":"regionid","r":true,"t":"`$INTEGER`","index$":1},{"a":true,"k":"param","n":"to","or":"to","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/regional/intensity/{from}/{to}/regionid/{regionid}","q":{"exist":["from","regionid","to"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"regional"},{"lit":"intensity"},{"var":"from"},{"var":"to"},{"lit":"regionid"},{"var":"regionid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /regional/intensity/{from}/fw24h/postcode/{postcode}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"postcode","or":"postcode","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/regional/intensity/{from}/fw24h/postcode/{postcode}","q":{"exist":["from","postcode"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"regional"},{"lit":"intensity"},{"var":"from"},{"lit":"fw24h"},{"lit":"postcode"},{"var":"postcode"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /regional/intensity/{from}/fw48h/postcode/{postcode}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"postcode","or":"postcode","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/regional/intensity/{from}/fw48h/postcode/{postcode}","q":{"exist":["from","postcode"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"regional"},{"lit":"intensity"},{"var":"from"},{"lit":"fw48h"},{"lit":"postcode"},{"var":"postcode"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"GET /regional/intensity/{from}/pt24h/postcode/{postcode}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"postcode","or":"postcode","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/regional/intensity/{from}/pt24h/postcode/{postcode}","q":{"exist":["from","postcode"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"regional"},{"lit":"intensity"},{"var":"from"},{"lit":"pt24h"},{"lit":"postcode"},{"var":"postcode"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4},{"a":true,"co":{"id":"GET /regional/intensity/{from}/fw24h/regionid/{regionid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"regionid","or":"regionid","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/regional/intensity/{from}/fw24h/regionid/{regionid}","q":{"exist":["from","regionid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"regional"},{"lit":"intensity"},{"var":"from"},{"lit":"fw24h"},{"lit":"regionid"},{"var":"regionid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":5},{"a":true,"co":{"id":"GET /regional/intensity/{from}/fw48h/regionid/{regionid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"regionid","or":"regionid","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/regional/intensity/{from}/fw48h/regionid/{regionid}","q":{"exist":["from","regionid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"regional"},{"lit":"intensity"},{"var":"from"},{"lit":"fw48h"},{"lit":"regionid"},{"var":"regionid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":6},{"a":true,"co":{"id":"GET /regional/intensity/{from}/pt24h/regionid/{regionid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"regionid","or":"regionid","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/regional/intensity/{from}/pt24h/regionid/{regionid}","q":{"exist":["from","regionid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"regional"},{"lit":"intensity"},{"var":"from"},{"lit":"pt24h"},{"lit":"regionid"},{"var":"regionid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":7},{"a":true,"co":{"id":"GET /regional/intensity/{from}/{to}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"to","or":"to","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/regional/intensity/{from}/{to}","q":{"exist":["from","to"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"regional"},{"lit":"intensity"},{"var":"from"},{"var":"to"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":8}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.intensity"],["$.main.kit.entity.intensity"],["$.main.kit.entity.intensity"]]},"key$":"regional_intensity_list","name__orig":"regional_intensity_list","Name":"RegionalIntensityList","name_":"regional_intensity_list","name-":"regional-intensity-list","NAME":"REGIONAL_INTENSITY_LIST","index$":7}, {"active":true,"entity":"regional_intensity_list","key$":"BasicRegionalIntensityListFlow","kind":"basic","name":"BasicRegionalIntensityListFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"from":"from01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"regional_intensity_list_ref01"}}],"index$":0},{"a":false,"d":{},"i":{"ref":"regional_intensity_list_ref01","srcdatavar":"regional_intensity_list_ref01_data","suffix":"_dt0"},"m":{"from":"from01","id":"regional_intensity_list01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-regional_intensity_list_ref01"}}],"unreachable":true}]}, 'RegionalIntensityList', {"GET /regional/intensity/{from}/fw24h":{"protocol":"http","parameters":[{"name":"from","in":"path","required":true,"description":"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0}]},"GET /regional/intensity/{from}/fw48h":{"protocol":"http","parameters":[{"name":"from","in":"path","required":true,"description":"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0}]},"GET /regional/intensity/{from}/pt24h":{"protocol":"http","parameters":[{"name":"from","in":"path","required":true,"description":"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0}]},"GET /regional/intensity/{from}/{to}/postcode/{postcode}":{"protocol":"http","parameters":[{"name":"from","in":"path","required":true,"description":"Start datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0},{"name":"to","in":"path","required":true,"description":"End datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":1},{"name":"postcode","in":"path","required":true,"description":"Outward postcode (e.g., SW1)","schema":{"type":"string"},"index$":2}]},"GET /regional/intensity/{from}/{to}/regionid/{regionid}":{"protocol":"http","parameters":[{"name":"from","in":"path","required":true,"description":"Start datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0},{"name":"to","in":"path","required":true,"description":"End datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":1},{"name":"regionid","in":"path","required":true,"description":"Region ID (1-17)","schema":{"type":"integer","minimum":1,"maximum":17},"index$":2}]},"GET /regional/intensity/{from}/fw24h/postcode/{postcode}":{"protocol":"http","parameters":[{"name":"from","in":"path","required":true,"description":"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0},{"name":"postcode","in":"path","required":true,"description":"Outward postcode (e.g., SW1)","schema":{"type":"string"},"index$":1}]},"GET /regional/intensity/{from}/fw48h/postcode/{postcode}":{"protocol":"http","parameters":[{"name":"from","in":"path","required":true,"description":"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0},{"name":"postcode","in":"path","required":true,"description":"Outward postcode (e.g., SW1)","schema":{"type":"string"},"index$":1}]},"GET /regional/intensity/{from}/pt24h/postcode/{postcode}":{"protocol":"http","parameters":[{"name":"from","in":"path","required":true,"description":"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0},{"name":"postcode","in":"path","required":true,"description":"Outward postcode (e.g., SW1)","schema":{"type":"string"},"index$":1}]},"GET /regional/intensity/{from}/fw24h/regionid/{regionid}":{"protocol":"http","parameters":[{"name":"from","in":"path","required":true,"description":"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0},{"name":"regionid","in":"path","required":true,"description":"Region ID (1-17)","schema":{"type":"integer","minimum":1,"maximum":17},"index$":1}]},"GET /regional/intensity/{from}/fw48h/regionid/{regionid}":{"protocol":"http","parameters":[{"name":"from","in":"path","required":true,"description":"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0},{"name":"regionid","in":"path","required":true,"description":"Region ID (1-17)","schema":{"type":"integer","minimum":1,"maximum":17},"index$":1}]},"GET /regional/intensity/{from}/pt24h/regionid/{regionid}":{"protocol":"http","parameters":[{"name":"from","in":"path","required":true,"description":"Datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0},{"name":"regionid","in":"path","required":true,"description":"Region ID (1-17)","schema":{"type":"integer","minimum":1,"maximum":17},"index$":1}]},"GET /regional/intensity/{from}/{to}":{"protocol":"http","parameters":[{"name":"from","in":"path","required":true,"description":"Start datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":0},{"name":"to","in":"path","required":true,"description":"End datetime in ISO8601 format (YYYY-MM-DDThh:mmZ)","schema":{"type":"string","format":"date-time"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let regional_intensity_list_ref01_data = Object.values(setup.data.existing.regional_intensity_list)[0] as any

    // LIST
    const regional_intensity_list_ref01_ent = client.RegionalIntensityList()
    const regional_intensity_list_ref01_match: any = {}
    regional_intensity_list_ref01_match['from'] = setup.idmap['from01']

    const regional_intensity_list_ref01_list = (await regional_intensity_list_ref01_ent.list(regional_intensity_list_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/regional_intensity_list/RegionalIntensityListTestData.json')

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
    ['regional_intensity_list01','regional_intensity_list02','regional_intensity_list03','intensity01','intensity02','intensity03','from01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CARBON_INTENSITY_TEST_REGIONAL_INTENSITY_LIST_ENTID': idmap,
    'CARBON_INTENSITY_TEST_LIVE': 'FALSE',
    'CARBON_INTENSITY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CARBON_INTENSITY_TEST_REGIONAL_INTENSITY_LIST_ENTID']

  const live = 'TRUE' === env.CARBON_INTENSITY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CARBON_INTENSITY_TEST_REGIONAL_INTENSITY_LIST_ENTID']
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
  
