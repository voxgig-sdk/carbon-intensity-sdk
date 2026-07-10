# Typed models for the CarbonIntensity SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Generation(TypedDict, total=False):
    generationmix: list
    to: str


class GenerationListMatch(TypedDict, total=False):
    to: str


class GenerationList(TypedDict, total=False):
    generationmix: list
    to: str


class GenerationListListMatch(TypedDict):
    pass


class Intensity(TypedDict, total=False):
    data: list
    intensity: dict
    to: str


class IntensityLoadMatch(TypedDict):
    id: str


class IntensityListMatch(TypedDict, total=False):
    date: str
    period: int
    to: str


class IntensityFactor(TypedDict, total=False):
    biomass: int
    coal: int
    dutch_import: int
    french_import: int
    gas__combined_cycle: int
    gas__open_cycle: int
    hydro: int
    irish_import: int
    nuclear: int
    oil: int
    other: int
    pumped_storage: int
    solar: int
    wind: int


class IntensityFactorListMatch(TypedDict, total=False):
    biomass: int
    coal: int
    dutch_import: int
    french_import: int
    gas__combined_cycle: int
    gas__open_cycle: int
    hydro: int
    irish_import: int
    nuclear: int
    oil: int
    other: int
    pumped_storage: int
    solar: int
    wind: int


class IntensityList(TypedDict, total=False):
    data: list
    intensity: dict
    to: str


class IntensityListLoadMatch(TypedDict):
    date: str


class IntensityListListMatch(TypedDict):
    pass


class Regional(TypedDict, total=False):
    data: list
    dnoregion: str
    postcode: str
    regionid: int
    shortname: str


class RegionalListMatch(TypedDict, total=False):
    data: list
    dnoregion: str
    postcode: str
    regionid: int
    shortname: str


class RegionalIntensity(TypedDict, total=False):
    data: list
    dnoregion: str
    postcode: str
    regionid: int
    shortname: str


class RegionalIntensityLoadMatch(TypedDict, total=False):
    postcode: str
    regionid: int


class RegionalIntensityListMatch(TypedDict, total=False):
    data: list
    dnoregion: str
    postcode: str
    regionid: int
    shortname: str


class RegionalIntensityList(TypedDict, total=False):
    data: list
    dnoregion: str
    postcode: str
    regionid: int
    shortname: str


class RegionalIntensityListLoadMatchRequired(TypedDict):
    intensity_id: str


class RegionalIntensityListLoadMatch(RegionalIntensityListLoadMatchRequired, total=False):
    postcode: str
    to: str
    regionid: int


class RegionalIntensityListListMatch(TypedDict, total=False):
    to: str


class Stat(TypedDict, total=False):
    intensity: dict
    to: str


class StatListMatchRequired(TypedDict):
    to: str


class StatListMatch(StatListMatchRequired, total=False):
    block: int
