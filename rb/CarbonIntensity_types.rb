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
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] generationmix
#   @return [Array, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
Generation = Struct.new(
  :from,
  :generationmix,
  :to,
  keyword_init: true
)

# Request payload for Generation#list.
#
# @!attribute [rw] from
#   @return [String]
#
# @!attribute [rw] to
#   @return [String]
GenerationListMatch = Struct.new(
  :from,
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
# @!attribute [rw] intensity
#   @return [Hash, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
Intensity = Struct.new(
  :data,
  :from,
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
# @!attribute [rw] date
#   @return [String]
#
# @!attribute [rw] period
#   @return [Integer]
#
# @!attribute [rw] from
#   @return [String]
#
# @!attribute [rw] to
#   @return [String]
IntensityListMatch = Struct.new(
  :date,
  :period,
  :from,
  :to,
  keyword_init: true
)

# IntensityFactor entity data model.
#
# @!attribute [rw] biomass
#   @return [Integer, nil]
#
# @!attribute [rw] coal
#   @return [Integer, nil]
#
# @!attribute [rw] dutch_import
#   @return [Integer, nil]
#
# @!attribute [rw] french_import
#   @return [Integer, nil]
#
# @!attribute [rw] gas__combined_cycle
#   @return [Integer, nil]
#
# @!attribute [rw] gas__open_cycle
#   @return [Integer, nil]
#
# @!attribute [rw] hydro
#   @return [Integer, nil]
#
# @!attribute [rw] irish_import
#   @return [Integer, nil]
#
# @!attribute [rw] nuclear
#   @return [Integer, nil]
#
# @!attribute [rw] oil
#   @return [Integer, nil]
#
# @!attribute [rw] other
#   @return [Integer, nil]
#
# @!attribute [rw] pumped_storage
#   @return [Integer, nil]
#
# @!attribute [rw] solar
#   @return [Integer, nil]
#
# @!attribute [rw] wind
#   @return [Integer, nil]
IntensityFactor = Struct.new(
  :biomass,
  :coal,
  :dutch_import,
  :french_import,
  :gas__combined_cycle,
  :gas__open_cycle,
  :hydro,
  :irish_import,
  :nuclear,
  :oil,
  :other,
  :pumped_storage,
  :solar,
  :wind,
  keyword_init: true
)

# Request payload for IntensityFactor#list.
#
# @!attribute [rw] biomass
#   @return [Integer, nil]
#
# @!attribute [rw] coal
#   @return [Integer, nil]
#
# @!attribute [rw] dutch_import
#   @return [Integer, nil]
#
# @!attribute [rw] french_import
#   @return [Integer, nil]
#
# @!attribute [rw] gas__combined_cycle
#   @return [Integer, nil]
#
# @!attribute [rw] gas__open_cycle
#   @return [Integer, nil]
#
# @!attribute [rw] hydro
#   @return [Integer, nil]
#
# @!attribute [rw] irish_import
#   @return [Integer, nil]
#
# @!attribute [rw] nuclear
#   @return [Integer, nil]
#
# @!attribute [rw] oil
#   @return [Integer, nil]
#
# @!attribute [rw] other
#   @return [Integer, nil]
#
# @!attribute [rw] pumped_storage
#   @return [Integer, nil]
#
# @!attribute [rw] solar
#   @return [Integer, nil]
#
# @!attribute [rw] wind
#   @return [Integer, nil]
IntensityFactorListMatch = Struct.new(
  :biomass,
  :coal,
  :dutch_import,
  :french_import,
  :gas__combined_cycle,
  :gas__open_cycle,
  :hydro,
  :irish_import,
  :nuclear,
  :oil,
  :other,
  :pumped_storage,
  :solar,
  :wind,
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
# @!attribute [rw] from
#   @return [String]
IntensityListListMatch = Struct.new(
  :from,
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
#
# @!attribute [rw] regionid
#   @return [Integer]
RegionalIntensityLoadMatch = Struct.new(
  :postcode,
  :regionid,
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
  :postcode,
  :regionid,
  :shortname,
  keyword_init: true
)

# Request payload for RegionalIntensityList#load.
#
# @!attribute [rw] intensity_id
#   @return [String]
#
# @!attribute [rw] postcode
#   @return [String]
#
# @!attribute [rw] to
#   @return [String]
#
# @!attribute [rw] regionid
#   @return [Integer]
RegionalIntensityListLoadMatch = Struct.new(
  :intensity_id,
  :postcode,
  :to,
  :regionid,
  keyword_init: true
)

# Request payload for RegionalIntensityList#list.
#
# @!attribute [rw] from
#   @return [String]
#
# @!attribute [rw] to
#   @return [String]
RegionalIntensityListListMatch = Struct.new(
  :from,
  :to,
  keyword_init: true
)

# Stat entity data model.
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] intensity
#   @return [Hash, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
Stat = Struct.new(
  :from,
  :intensity,
  :to,
  keyword_init: true
)

# Request payload for Stat#list.
#
# @!attribute [rw] block
#   @return [Integer]
#
# @!attribute [rw] from
#   @return [String]
#
# @!attribute [rw] to
#   @return [String]
StatListMatch = Struct.new(
  :block,
  :from,
  :to,
  keyword_init: true
)

