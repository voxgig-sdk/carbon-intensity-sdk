
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { CarbonIntensitySDK } from '../../..'

import {
  envOverride,
  liveDelay,
  maybeSkipControl,
  skipIfMissingIds,
} from '../../utility'


describe('IntensityListDirect', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CARBONINTENSITY_TEST_LIVE=TRUE.
  afterEach(liveDelay('CARBONINTENSITY_TEST_LIVE'))

  test('direct-exists', async () => {
    const sdk = new CarbonIntensitySDK({
      system: { fetch: async () => ({}) }
    })
    assert('function' === typeof sdk.direct)
    assert('function' === typeof sdk.prepare)
  })


  test('direct-load-intensity_list', async (t: any) => {
    const setup = directSetup({ id: 'direct01' })
    if (maybeSkipControl(t, 'direct', 'direct-load-intensity_list', setup.live)) return
    if (skipIfMissingIds(t, setup, ["date01"])) return
    const { client, calls } = setup

    const params: any = {}
    const query: any = {}
    if (setup.live) {
      const listResult: any = await client.direct({
        path: 'intensity/{from}/fw24h',
        method: 'GET',
        params: {
        from: setup.idmap['from01'],
        },
      })
      if (!listResult.ok) {
        return // skip: list call failed (likely synthetic IDs against live API)
      }
      const listArr = unwrapListData(listResult.data)
      if (null == listArr || listArr.length === 0) {
        return // skip: no entities to load in live mode
      }
      const candidateId = listArr[0]?.date ?? listArr[0]?.id
      if (null == candidateId) {
        return // skip: list response shape does not expose load identifier
      }
      params.date = candidateId
      params.date = setup.idmap['date01']
    } else {
      params.date = 'direct01'
    }

    const result: any = await client.direct({
      path: 'intensity/date/{date}',
      method: 'GET',
      params,
      query,
    })

    if (setup.live) {
      // Live mode is lenient: synthetic IDs frequently 4xx. Skip rather
      // than fail when the load endpoint isn't reachable with the IDs we
      // can construct from setup.idmap.
      if (!result.ok || result.status < 200 || result.status >= 300) {
        return
      }
    } else {
      assert(result.ok === true)
      assert(result.status === 200)
      assert(null != result.data)
      assert(result.data.id === 'direct01')
      assert(calls.length === 1)
      assert(calls[0].init.method === 'GET')
      assert(calls[0].url.includes('direct01'))
    }
  })

  test('direct-list-intensity_list', async (t: any) => {
    const setup = directSetup([{ id: 'direct01' }, { id: 'direct02' }])
    if (maybeSkipControl(t, 'direct', 'direct-list-intensity_list', setup.live)) return
    if (skipIfMissingIds(t, setup, ["from01"])) return
    const { client, calls } = setup

    const params: any = {}
    const query: any = {}
    if (setup.live) {
      params.from = setup.idmap['from01']
    } else {
      params.from = 'direct01'
    }

    const result: any = await client.direct({
      path: 'intensity/{from}/fw24h',
      method: 'GET',
      params,
      query,
    })

    if (setup.live) {
      // Live mode is lenient: synthetic IDs frequently 4xx and the list-
      // response shape varies wildly across public APIs. Skip rather than
      // fail when the call doesn't return a usable list.
      if (!result.ok || result.status < 200 || result.status >= 300) {
        return
      }
      const listArr = unwrapListData(result.data)
      if (!Array.isArray(listArr)) {
        return
      }
    } else {
      assert(result.ok === true)
      assert(result.status === 200)
      assert(null != result.data)
      const listArr = unwrapListData(result.data)
      assert(Array.isArray(listArr))
      assert(listArr!.length === 2)
      assert(calls.length === 1)
      assert(calls[0].init.method === 'GET')
      assert(calls[0].url.includes('direct01'))
    }
  })

})



function directSetup(mockres?: any) {
  const calls: any[] = []

  const env = envOverride({
    'CARBONINTENSITY_TEST_INTENSITY_LIST_ENTID': {},
    'CARBONINTENSITY_TEST_LIVE': 'FALSE',
    'CARBONINTENSITY_APIKEY': 'NONE',
  })

  const live = 'TRUE' === env.CARBONINTENSITY_TEST_LIVE

  if (live) {
    const client = new CarbonIntensitySDK({
      apikey: env.CARBONINTENSITY_APIKEY,
    })

    let idmap: any = env['CARBONINTENSITY_TEST_INTENSITY_LIST_ENTID']
    if ('string' === typeof idmap && idmap.startsWith('{')) {
      idmap = JSON.parse(idmap)
    }

    return { client, calls, live, idmap }
  }

  const mockFetch = async (url: string, init: any) => {
    calls.push({ url, init })
    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      json: async () => (null != mockres ? mockres : { id: 'direct01' }),
    }
  }

  const client = new CarbonIntensitySDK({
    base: 'http://localhost:8080',
    system: { fetch: mockFetch },
  })

  return { client, calls, live, idmap: {} as any }
}

// direct() returns the raw response body. List endpoints often wrap the
// array in an envelope (e.g. { data: [...] }, { entities: [...] },
// { pagination, data: [...] }). The test transforms the raw body to
// extract the first array — either the body itself or the first array
// property of an envelope object.
function unwrapListData(data: any): any[] | null {
  if (Array.isArray(data)) return data
  if (data && 'object' === typeof data) {
    for (const v of Object.values(data)) {
      if (Array.isArray(v)) return v as any[]
    }
  }
  return null
}
  
