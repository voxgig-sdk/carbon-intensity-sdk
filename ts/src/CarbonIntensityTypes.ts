// Typed models for the CarbonIntensity SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Generation {
  data?: any[]
  from?: string
  generationmix?: any[]
  id?: string
  to?: string
}

export interface GenerationLoadMatch {
  from: string
  to: string
}

export interface GenerationListMatch {
  data?: any[]
  from?: string
  generationmix?: any[]
  id?: string
  to?: string
}

export interface GenerationList {
  from?: string
  generationmix?: any[]
  to?: string
}

export interface GenerationListListMatch {
  from: string
}

export interface Intensity {
  data?: any[]
  from?: string
  id?: string
  intensity?: Record<string, any>
  to?: string
}

export interface IntensityLoadMatch {
  id: string
}

export interface IntensityListMatch {
  data?: any[]
  from?: string
  id?: string
  intensity?: Record<string, any>
  to?: string
}

export interface IntensityFactor {
  Biomass?: number
  Coal?: number
  DutchImports?: number
  FrenchImports?: number
  GasCombinedCycle?: number
  GasOpenCycle?: number
  Hydro?: number
  IrishImports?: number
  Nuclear?: number
  Oil?: number
  Other?: number
  PumpedStorage?: number
  Solar?: number
  Wind?: number
}

export interface IntensityFactorListMatch {
  Biomass?: number
  Coal?: number
  DutchImports?: number
  FrenchImports?: number
  GasCombinedCycle?: number
  GasOpenCycle?: number
  Hydro?: number
  IrishImports?: number
  Nuclear?: number
  Oil?: number
  Other?: number
  PumpedStorage?: number
  Solar?: number
  Wind?: number
}

export interface IntensityList {
  data?: any[]
  from?: string
  intensity?: Record<string, any>
  to?: string
}

export interface IntensityListLoadMatch {
  date: string
}

export interface IntensityListListMatch {
  data?: any[]
  from?: string
  intensity?: Record<string, any>
  to?: string
}

export interface Regional {
  data?: any[]
  dnoregion?: string
  postcode?: string
  regionid?: number
  shortname?: string
}

export interface RegionalListMatch {
  data?: any[]
  dnoregion?: string
  postcode?: string
  regionid?: number
  shortname?: string
}

export interface RegionalIntensity {
  data?: any[]
  dnoregion?: string
  postcode?: string
  regionid?: number
  shortname?: string
}

export interface RegionalIntensityLoadMatch {
  postcode: string
}

export interface RegionalIntensityListMatch {
  data?: any[]
  dnoregion?: string
  postcode?: string
  regionid?: number
  shortname?: string
}

export interface RegionalIntensityList {
  data?: any[]
  dnoregion?: string
  id?: string
  postcode?: string
  regionid?: number
  shortname?: string
}

export interface RegionalIntensityListLoadMatch {
  from: string
  to: string
}

export interface RegionalIntensityListListMatch {
  from: string
}

export interface Stat {
  data?: any[]
  id?: string
}

export interface StatLoadMatch {
  block?: number
  from: string
  to: string
}

