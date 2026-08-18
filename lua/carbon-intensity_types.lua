-- Typed models for the CarbonIntensity SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Generation
---@field data? table
---@field from? string
---@field generationmix? table
---@field to? string

---@class GenerationLoadMatch
---@field from string
---@field to string

---@class GenerationListMatch
---@field data? table
---@field from? string
---@field generationmix? table
---@field to? string

---@class GenerationList
---@field from? string
---@field generationmix? table
---@field to? string

---@class GenerationListListMatch
---@field from string

---@class Intensity
---@field data? table
---@field from? string
---@field intensity? table
---@field to? string

---@class IntensityLoadMatch
---@field id string

---@class IntensityListMatch
---@field data? table
---@field from? string
---@field intensity? table
---@field to? string

---@class IntensityFactor
---@field Biomass? number
---@field Coal? number
---@field DutchImports? number
---@field FrenchImports? number
---@field GasCombinedCycle? number
---@field GasOpenCycle? number
---@field Hydro? number
---@field IrishImports? number
---@field Nuclear? number
---@field Oil? number
---@field Other? number
---@field PumpedStorage? number
---@field Solar? number
---@field Wind? number

---@class IntensityFactorListMatch
---@field Biomass? number
---@field Coal? number
---@field DutchImports? number
---@field FrenchImports? number
---@field GasCombinedCycle? number
---@field GasOpenCycle? number
---@field Hydro? number
---@field IrishImports? number
---@field Nuclear? number
---@field Oil? number
---@field Other? number
---@field PumpedStorage? number
---@field Solar? number
---@field Wind? number

---@class IntensityList
---@field data? table
---@field from? string
---@field intensity? table
---@field to? string

---@class IntensityListLoadMatch
---@field date string

---@class IntensityListListMatch
---@field data? table
---@field from? string
---@field intensity? table
---@field to? string

---@class Regional
---@field data? table
---@field dnoregion? string
---@field postcode? string
---@field regionid? number
---@field shortname? string

---@class RegionalListMatch
---@field data? table
---@field dnoregion? string
---@field postcode? string
---@field regionid? number
---@field shortname? string

---@class RegionalIntensity
---@field data? table
---@field dnoregion? string
---@field postcode? string
---@field regionid? number
---@field shortname? string

---@class RegionalIntensityLoadMatch
---@field postcode string

---@class RegionalIntensityListMatch
---@field data? table
---@field dnoregion? string
---@field postcode? string
---@field regionid? number
---@field shortname? string

---@class RegionalIntensityList
---@field data? table
---@field dnoregion? string
---@field postcode? string
---@field regionid? number
---@field shortname? string

---@class RegionalIntensityListLoadMatch
---@field from string
---@field to string

---@class RegionalIntensityListListMatch
---@field from string

---@class Stat
---@field data? table

---@class StatLoadMatch
---@field block? number
---@field from string
---@field to string

local M = {}

return M
