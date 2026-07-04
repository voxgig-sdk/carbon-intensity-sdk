// CarbonIntensity Ts SDK

import { GenerationEntity } from './entity/GenerationEntity'
import { GenerationListEntity } from './entity/GenerationListEntity'
import { IntensityEntity } from './entity/IntensityEntity'
import { IntensityFactorEntity } from './entity/IntensityFactorEntity'
import { IntensityListEntity } from './entity/IntensityListEntity'
import { RegionalEntity } from './entity/RegionalEntity'
import { RegionalIntensityEntity } from './entity/RegionalIntensityEntity'
import { RegionalIntensityListEntity } from './entity/RegionalIntensityListEntity'
import { StatEntity } from './entity/StatEntity'

export type * from './CarbonIntensityTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { CarbonIntensityEntityBase } from './CarbonIntensityEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class CarbonIntensitySDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _generation?: GenerationEntity

  // Idiomatic facade: `client.generation.list()` / `client.generation.load({ id })`.
  get generation(): GenerationEntity {
    return (this._generation ??= new GenerationEntity(this, undefined))
  }

  /** @deprecated Use `client.generation` instead. */
  Generation(data?: any) {
    const self = this
    return new GenerationEntity(self,data)
  }


  _generation_list?: GenerationListEntity

  // Idiomatic facade: `client.generation_list.list()` / `client.generation_list.load({ id })`.
  get generation_list(): GenerationListEntity {
    return (this._generation_list ??= new GenerationListEntity(this, undefined))
  }

  /** @deprecated Use `client.generation_list` instead. */
  GenerationList(data?: any) {
    const self = this
    return new GenerationListEntity(self,data)
  }


  _intensity?: IntensityEntity

  // Idiomatic facade: `client.intensity.list()` / `client.intensity.load({ id })`.
  get intensity(): IntensityEntity {
    return (this._intensity ??= new IntensityEntity(this, undefined))
  }

  /** @deprecated Use `client.intensity` instead. */
  Intensity(data?: any) {
    const self = this
    return new IntensityEntity(self,data)
  }


  _intensity_factor?: IntensityFactorEntity

  // Idiomatic facade: `client.intensity_factor.list()` / `client.intensity_factor.load({ id })`.
  get intensity_factor(): IntensityFactorEntity {
    return (this._intensity_factor ??= new IntensityFactorEntity(this, undefined))
  }

  /** @deprecated Use `client.intensity_factor` instead. */
  IntensityFactor(data?: any) {
    const self = this
    return new IntensityFactorEntity(self,data)
  }


  _intensity_list?: IntensityListEntity

  // Idiomatic facade: `client.intensity_list.list()` / `client.intensity_list.load({ id })`.
  get intensity_list(): IntensityListEntity {
    return (this._intensity_list ??= new IntensityListEntity(this, undefined))
  }

  /** @deprecated Use `client.intensity_list` instead. */
  IntensityList(data?: any) {
    const self = this
    return new IntensityListEntity(self,data)
  }


  _regional?: RegionalEntity

  // Idiomatic facade: `client.regional.list()` / `client.regional.load({ id })`.
  get regional(): RegionalEntity {
    return (this._regional ??= new RegionalEntity(this, undefined))
  }

  /** @deprecated Use `client.regional` instead. */
  Regional(data?: any) {
    const self = this
    return new RegionalEntity(self,data)
  }


  _regional_intensity?: RegionalIntensityEntity

  // Idiomatic facade: `client.regional_intensity.list()` / `client.regional_intensity.load({ id })`.
  get regional_intensity(): RegionalIntensityEntity {
    return (this._regional_intensity ??= new RegionalIntensityEntity(this, undefined))
  }

  /** @deprecated Use `client.regional_intensity` instead. */
  RegionalIntensity(data?: any) {
    const self = this
    return new RegionalIntensityEntity(self,data)
  }


  _regional_intensity_list?: RegionalIntensityListEntity

  // Idiomatic facade: `client.regional_intensity_list.list()` / `client.regional_intensity_list.load({ id })`.
  get regional_intensity_list(): RegionalIntensityListEntity {
    return (this._regional_intensity_list ??= new RegionalIntensityListEntity(this, undefined))
  }

  /** @deprecated Use `client.regional_intensity_list` instead. */
  RegionalIntensityList(data?: any) {
    const self = this
    return new RegionalIntensityListEntity(self,data)
  }


  _stat?: StatEntity

  // Idiomatic facade: `client.stat.list()` / `client.stat.load({ id })`.
  get stat(): StatEntity {
    return (this._stat ??= new StatEntity(this, undefined))
  }

  /** @deprecated Use `client.stat` instead. */
  Stat(data?: any) {
    const self = this
    return new StatEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new CarbonIntensitySDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return CarbonIntensitySDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'CarbonIntensity' }
  }

  toString() {
    return 'CarbonIntensity ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = CarbonIntensitySDK


export {
  stdutil,

  BaseFeature,
  CarbonIntensityEntityBase,

  CarbonIntensitySDK,
  SDK,
}


