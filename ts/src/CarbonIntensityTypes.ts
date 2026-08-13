// Typed models for the CarbonIntensity SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Generation {
  from?: string
  generationmix?: any[]
  to?: string
}

export interface GenerationListMatch {
  from?: string
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
  intensity?: Record<string, any>
  to?: string
}

export interface IntensityLoadMatch {
  id: string
}

export interface IntensityListMatch {
  date?: string
  period?: number
  from?: string
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
  from?: string
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
  postcode?: string
  regionid?: number
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
  postcode?: string
  regionid?: number
  shortname?: string
}

export interface RegionalIntensityListLoadMatch {
  intensity_id: string
  postcode?: string
  to?: string
  regionid?: number
}

export interface RegionalIntensityListListMatch {
  from: string
  to?: string
}

export interface Stat {
  from?: string
  intensity?: Record<string, any>
  to?: string
}

export interface StatListMatch {
  block?: number
  from: string
  to: string
}

