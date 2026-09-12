# frozen_string_literal: true

# Typed models for the CarbonIntensity SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Generation entity data model.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] generationmix
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
Generation = Struct.new(
  :data,
  :from,
  :generationmix,
  :id,
  :to,
  keyword_init: true
)

# Request payload for Generation#load.
#
# @!attribute [rw] from
#   @return [String]
#
# @!attribute [rw] to
#   @return [String]
GenerationLoadMatch = Struct.new(
  :from,
  :to,
  keyword_init: true
)

# Request payload for Generation#list.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] generationmix
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
GenerationListMatch = Struct.new(
  :data,
  :from,
  :generationmix,
  :id,
  :to,
  keyword_init: true
)

# GenerationList entity data model.
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] generationmix
#   @return [Array, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
GenerationList = Struct.new(
  :from,
  :generationmix,
  :to,
  keyword_init: true
)

# Request payload for GenerationList#list.
#
# @!attribute [rw] from
#   @return [String]
GenerationListListMatch = Struct.new(
  :from,
  keyword_init: true
)

# Intensity entity data model.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] intensity
#   @return [Hash, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
Intensity = Struct.new(
  :data,
  :from,
  :id,
  :intensity,
  :to,
  keyword_init: true
)

# Request payload for Intensity#load.
#
# @!attribute [rw] id
#   @return [String]
IntensityLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Intensity#list.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] intensity
#   @return [Hash, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
IntensityListMatch = Struct.new(
  :data,
  :from,
  :id,
  :intensity,
  :to,
  keyword_init: true
)

# IntensityFactor entity data model.
#
# @!attribute [rw] Biomass
#   @return [Integer, nil]
#
# @!attribute [rw] Coal
#   @return [Integer, nil]
#
# @!attribute [rw] DutchImports
#   @return [Integer, nil]
#
# @!attribute [rw] FrenchImports
#   @return [Integer, nil]
#
# @!attribute [rw] GasCombinedCycle
#   @return [Integer, nil]
#
# @!attribute [rw] GasOpenCycle
#   @return [Integer, nil]
#
# @!attribute [rw] Hydro
#   @return [Integer, nil]
#
# @!attribute [rw] IrishImports
#   @return [Integer, nil]
#
# @!attribute [rw] Nuclear
#   @return [Integer, nil]
#
# @!attribute [rw] Oil
#   @return [Integer, nil]
#
# @!attribute [rw] Other
#   @return [Integer, nil]
#
# @!attribute [rw] PumpedStorage
#   @return [Integer, nil]
#
# @!attribute [rw] Solar
#   @return [Integer, nil]
#
# @!attribute [rw] Wind
#   @return [Integer, nil]
IntensityFactor = Struct.new(
  :Biomass,
  :Coal,
  :DutchImports,
  :FrenchImports,
  :GasCombinedCycle,
  :GasOpenCycle,
  :Hydro,
  :IrishImports,
  :Nuclear,
  :Oil,
  :Other,
  :PumpedStorage,
  :Solar,
  :Wind,
  keyword_init: true
)

# Request payload for IntensityFactor#list.
#
# @!attribute [rw] Biomass
#   @return [Integer, nil]
#
# @!attribute [rw] Coal
#   @return [Integer, nil]
#
# @!attribute [rw] DutchImports
#   @return [Integer, nil]
#
# @!attribute [rw] FrenchImports
#   @return [Integer, nil]
#
# @!attribute [rw] GasCombinedCycle
#   @return [Integer, nil]
#
# @!attribute [rw] GasOpenCycle
#   @return [Integer, nil]
#
# @!attribute [rw] Hydro
#   @return [Integer, nil]
#
# @!attribute [rw] IrishImports
#   @return [Integer, nil]
#
# @!attribute [rw] Nuclear
#   @return [Integer, nil]
#
# @!attribute [rw] Oil
#   @return [Integer, nil]
#
# @!attribute [rw] Other
#   @return [Integer, nil]
#
# @!attribute [rw] PumpedStorage
#   @return [Integer, nil]
#
# @!attribute [rw] Solar
#   @return [Integer, nil]
#
# @!attribute [rw] Wind
#   @return [Integer, nil]
IntensityFactorListMatch = Struct.new(
  :Biomass,
  :Coal,
  :DutchImports,
  :FrenchImports,
  :GasCombinedCycle,
  :GasOpenCycle,
  :Hydro,
  :IrishImports,
  :Nuclear,
  :Oil,
  :Other,
  :PumpedStorage,
  :Solar,
  :Wind,
  keyword_init: true
)

# IntensityList entity data model.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] intensity
#   @return [Hash, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
IntensityList = Struct.new(
  :data,
  :from,
  :intensity,
  :to,
  keyword_init: true
)

# Request payload for IntensityList#load.
#
# @!attribute [rw] date
#   @return [String]
IntensityListLoadMatch = Struct.new(
  :date,
  keyword_init: true
)

# Request payload for IntensityList#list.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] intensity
#   @return [Hash, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
IntensityListListMatch = Struct.new(
  :data,
  :from,
  :intensity,
  :to,
  keyword_init: true
)

# Regional entity data model.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] dnoregion
#   @return [String, nil]
#
# @!attribute [rw] postcode
#   @return [String, nil]
#
# @!attribute [rw] regionid
#   @return [Integer, nil]
#
# @!attribute [rw] shortname
#   @return [String, nil]
Regional = Struct.new(
  :data,
  :dnoregion,
  :postcode,
  :regionid,
  :shortname,
  keyword_init: true
)

# Request payload for Regional#list.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] dnoregion
#   @return [String, nil]
#
# @!attribute [rw] postcode
#   @return [String, nil]
#
# @!attribute [rw] regionid
#   @return [Integer, nil]
#
# @!attribute [rw] shortname
#   @return [String, nil]
RegionalListMatch = Struct.new(
  :data,
  :dnoregion,
  :postcode,
  :regionid,
  :shortname,
  keyword_init: true
)

# RegionalIntensity entity data model.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] dnoregion
#   @return [String, nil]
#
# @!attribute [rw] postcode
#   @return [String, nil]
#
# @!attribute [rw] regionid
#   @return [Integer, nil]
#
# @!attribute [rw] shortname
#   @return [String, nil]
RegionalIntensity = Struct.new(
  :data,
  :dnoregion,
  :postcode,
  :regionid,
  :shortname,
  keyword_init: true
)

# Request payload for RegionalIntensity#load.
#
# @!attribute [rw] postcode
#   @return [String]
RegionalIntensityLoadMatch = Struct.new(
  :postcode,
  keyword_init: true
)

# Request payload for RegionalIntensity#list.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] dnoregion
#   @return [String, nil]
#
# @!attribute [rw] postcode
#   @return [String, nil]
#
# @!attribute [rw] regionid
#   @return [Integer, nil]
#
# @!attribute [rw] shortname
#   @return [String, nil]
RegionalIntensityListMatch = Struct.new(
  :data,
  :dnoregion,
  :postcode,
  :regionid,
  :shortname,
  keyword_init: true
)

# RegionalIntensityList entity data model.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] dnoregion
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] postcode
#   @return [String, nil]
#
# @!attribute [rw] regionid
#   @return [Integer, nil]
#
# @!attribute [rw] shortname
#   @return [String, nil]
RegionalIntensityList = Struct.new(
  :data,
  :dnoregion,
  :id,
  :postcode,
  :regionid,
  :shortname,
  keyword_init: true
)

# Request payload for RegionalIntensityList#load.
#
# @!attribute [rw] from
#   @return [String]
#
# @!attribute [rw] to
#   @return [String]
RegionalIntensityListLoadMatch = Struct.new(
  :from,
  :to,
  keyword_init: true
)

# Request payload for RegionalIntensityList#list.
#
# @!attribute [rw] from
#   @return [String]
RegionalIntensityListListMatch = Struct.new(
  :from,
  keyword_init: true
)

# Stat entity data model.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
Stat = Struct.new(
  :data,
  :id,
  keyword_init: true
)

# Request payload for Stat#load.
#
# @!attribute [rw] block
#   @return [Integer, nil]
#
# @!attribute [rw] from
#   @return [String]
#
# @!attribute [rw] to
#   @return [String]
StatLoadMatch = Struct.new(
  :block,
  :from,
  :to,
  keyword_init: true
)

