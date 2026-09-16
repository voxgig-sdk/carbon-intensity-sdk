

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


describe('IntensityFactorEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CARBON_INTENSITY_TEST_LIVE=TRUE.
  afterEach(liveDelay('CARBON_INTENSITY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CarbonIntensitySDK.test()
    const ent = testsdk.IntensityFactor()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CARBON_INTENSITY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'intensity_factor.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"Biomass","req":false,"short":"Carbon intensity factor for biomass (gCO2/kWh)","type":"`$INTEGER`","index$":0},{"active":true,"name":"Coal","req":false,"short":"Carbon intensity factor for coal (gCO2/kWh)","type":"`$INTEGER`","index$":1},{"active":true,"name":"DutchImports","req":false,"short":"Carbon intensity factor for Dutch imports (gCO2/kWh)","type":"`$INTEGER`","index$":2},{"active":true,"name":"FrenchImports","req":false,"short":"Carbon intensity factor for French imports (gCO2/kWh)","type":"`$INTEGER`","index$":3},{"active":true,"name":"GasCombinedCycle","req":false,"short":"Carbon intensity factor for gas combined cycle (gCO2/kWh)","type":"`$INTEGER`","index$":4},{"active":true,"name":"GasOpenCycle","req":false,"short":"Carbon intensity factor for gas open cycle (gCO2/kWh)","type":"`$INTEGER`","index$":5},{"active":true,"name":"Hydro","req":false,"short":"Carbon intensity factor for hydro (gCO2/kWh)","type":"`$INTEGER`","index$":6},{"active":true,"name":"IrishImports","req":false,"short":"Carbon intensity factor for Irish imports (gCO2/kWh)","type":"`$INTEGER`","index$":7},{"active":true,"name":"Nuclear","req":false,"short":"Carbon intensity factor for nuclear (gCO2/kWh)","type":"`$INTEGER`","index$":8},{"active":true,"name":"Oil","req":false,"short":"Carbon intensity factor for oil (gCO2/kWh)","type":"`$INTEGER`","index$":9},{"active":true,"name":"Other","req":false,"short":"Carbon intensity factor for other (gCO2/kWh)","type":"`$INTEGER`","index$":10},{"active":true,"name":"PumpedStorage","req":false,"short":"Carbon intensity factor for pumped storage (gCO2/kWh)","type":"`$INTEGER`","index$":11},{"active":true,"name":"Solar","req":false,"short":"Carbon intensity factor for solar (gCO2/kWh)","type":"`$INTEGER`","index$":12},{"active":true,"name":"Wind","req":false,"short":"Carbon intensity factor for wind (gCO2/kWh)","type":"`$INTEGER`","index$":13}],"name":"intensity_factor","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /intensity/factors","json":"{\"operationId\":\"getIntensityFactors\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"Biomass\":{\"description\":\"Carbon intensity factor for biomass (gCO2/kWh)\",\"type\":\"integer\"},\"Coal\":{\"description\":\"Carbon intensity factor for coal (gCO2/kWh)\",\"type\":\"integer\"},\"Dutch Imports\":{\"description\":\"Carbon intensity factor for Dutch imports (gCO2/kWh)\",\"type\":\"integer\"},\"French Imports\":{\"description\":\"Carbon intensity factor for French imports (gCO2/kWh)\",\"type\":\"integer\"},\"Gas (Combined Cycle)\":{\"description\":\"Carbon intensity factor for gas combined cycle (gCO2/kWh)\",\"type\":\"integer\"},\"Gas (Open Cycle)\":{\"description\":\"Carbon intensity factor for gas open cycle (gCO2/kWh)\",\"type\":\"integer\"},\"Hydro\":{\"description\":\"Carbon intensity factor for hydro (gCO2/kWh)\",\"type\":\"integer\"},\"Irish Imports\":{\"description\":\"Carbon intensity factor for Irish imports (gCO2/kWh)\",\"type\":\"integer\"},\"Nuclear\":{\"description\":\"Carbon intensity factor for nuclear (gCO2/kWh)\",\"type\":\"integer\"},\"Oil\":{\"description\":\"Carbon intensity factor for oil (gCO2/kWh)\",\"type\":\"integer\"},\"Other\":{\"description\":\"Carbon intensity factor for other (gCO2/kWh)\",\"type\":\"integer\"},\"Pumped Storage\":{\"description\":\"Carbon intensity factor for pumped storage (gCO2/kWh)\",\"type\":\"integer\"},\"Solar\":{\"description\":\"Carbon intensity factor for solar (gCO2/kWh)\",\"type\":\"integer\"},\"Wind\":{\"description\":\"Carbon intensity factor for wind (gCO2/kWh)\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/intensity/factors","segments":[{"lit":"intensity"},{"lit":"factors"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"intensity_factor","name__orig":"intensity_factor","Name":"IntensityFactor","name_":"intensity_factor","name-":"intensity-factor","NAME":"INTENSITY_FACTOR","index$":3}, {"active":true,"entity":"intensity_factor","key$":"BasicIntensityFactorFlow","kind":"basic","name":"BasicIntensityFactorFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"intensity_factor_ref01"}}],"index$":0}]}, 'IntensityFactor')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let intensity_factor_ref01_data = Object.values(setup.data.existing.intensity_factor)[0] as any

    // LIST
    const intensity_factor_ref01_ent = client.IntensityFactor()
    const intensity_factor_ref01_match: any = {}

    const intensity_factor_ref01_list = (await intensity_factor_ref01_ent.list(intensity_factor_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/intensity_factor/IntensityFactorTestData.json')

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
    ['intensity_factor01','intensity_factor02','intensity_factor03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CARBON_INTENSITY_TEST_INTENSITY_FACTOR_ENTID': idmap,
    'CARBON_INTENSITY_TEST_LIVE': 'FALSE',
    'CARBON_INTENSITY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CARBON_INTENSITY_TEST_INTENSITY_FACTOR_ENTID']

  const live = 'TRUE' === env.CARBON_INTENSITY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CARBON_INTENSITY_TEST_INTENSITY_FACTOR_ENTID']
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
  
