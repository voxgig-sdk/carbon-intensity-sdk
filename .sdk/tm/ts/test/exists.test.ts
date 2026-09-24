
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CarbonIntensitySDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CarbonIntensitySDK.test()
    equal(testsdk instanceof CarbonIntensitySDK, true,
      'CarbonIntensitySDK.test() must return a client synchronously')
  })

})
