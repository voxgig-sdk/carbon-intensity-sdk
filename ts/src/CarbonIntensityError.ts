
import { Context } from './Context'


class CarbonIntensityError extends Error {

  isCarbonIntensityError = true

  sdk = 'CarbonIntensity'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  CarbonIntensityError
}

