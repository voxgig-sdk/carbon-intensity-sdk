-- Typed models for the CarbonIntensity SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Generation
---@field from? string
---@field generationmix? table
---@field to? string

---@class GenerationListMatch
---@field from string
---@field to string

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
---@field date string
---@field period number
---@field from string
---@field to string

---@class IntensityFactor
---@field biomass? number
---@field coal? number
---@field dutch_import? number
---@field french_import? number
---@field gas__combined_cycle? number
---@field gas__open_cycle? number
---@field hydro? number
---@field irish_import? number
---@field nuclear? number
---@field oil? number
---@field other? number
---@field pumped_storage? number
---@field solar? number
---@field wind? number

---@class IntensityFactorListMatch
---@field biomass? number
---@field coal? number
---@field dutch_import? number
---@field french_import? number
---@field gas__combined_cycle? number
---@field gas__open_cycle? number
---@field hydro? number
---@field irish_import? number
---@field nuclear? number
---@field oil? number
---@field other? number
---@field pumped_storage? number
---@field solar? number
---@field wind? number

---@class IntensityList
---@field data? table
---@field from? string
---@field intensity? table
---@field to? string

---@class IntensityListLoadMatch
---@field date string

---@class IntensityListListMatch
---@field from string

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
---@field regionid number

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
---@field intensity_id string
---@field postcode string
---@field to string
---@field regionid number

---@class RegionalIntensityListListMatch
---@field from string
---@field to string

---@class Stat
---@field from? string
---@field intensity? table
---@field to? string

---@class StatListMatch
---@field block number
---@field from string
---@field to string

local M = {}

return M
