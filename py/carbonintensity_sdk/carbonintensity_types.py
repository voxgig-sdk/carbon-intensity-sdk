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
    data: list
    generationmix: list
    id: str
    to: str


class GenerationLoadMatch(TypedDict):
    to: str


class GenerationListMatch(TypedDict, total=False):
    data: list
    generationmix: list
    id: str
    to: str


class GenerationList(TypedDict, total=False):
    generationmix: list
    to: str


class GenerationListListMatch(TypedDict):
    pass


class Intensity(TypedDict, total=False):
    data: list
    id: str
    intensity: dict
    to: str


class IntensityLoadMatch(TypedDict):
    id: str


class IntensityListMatch(TypedDict, total=False):
    data: list
    id: str
    intensity: dict
    to: str


class IntensityFactor(TypedDict, total=False):
    Biomass: int
    Coal: int
    DutchImports: int
    FrenchImports: int
    GasCombinedCycle: int
    GasOpenCycle: int
    Hydro: int
    IrishImports: int
    Nuclear: int
    Oil: int
    Other: int
    PumpedStorage: int
    Solar: int
    Wind: int


class IntensityFactorListMatch(TypedDict, total=False):
    Biomass: int
    Coal: int
    DutchImports: int
    FrenchImports: int
    GasCombinedCycle: int
    GasOpenCycle: int
    Hydro: int
    IrishImports: int
    Nuclear: int
    Oil: int
    Other: int
    PumpedStorage: int
    Solar: int
    Wind: int


class IntensityList(TypedDict, total=False):
    data: list
    intensity: dict
    to: str


class IntensityListLoadMatch(TypedDict):
    date: str


class IntensityListListMatch(TypedDict, total=False):
    data: list
    intensity: dict
    to: str


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


class RegionalIntensityLoadMatch(TypedDict):
    postcode: str


class RegionalIntensityListMatch(TypedDict, total=False):
    data: list
    dnoregion: str
    postcode: str
    regionid: int
    shortname: str


class RegionalIntensityList(TypedDict, total=False):
    data: list
    dnoregion: str
    id: str
    postcode: str
    regionid: int
    shortname: str


class RegionalIntensityListLoadMatch(TypedDict):
    to: str


class RegionalIntensityListListMatch(TypedDict):
    pass


class Stat(TypedDict, total=False):
    data: list
    id: str


class StatLoadMatchRequired(TypedDict):
    to: str


class StatLoadMatch(StatLoadMatchRequired, total=False):
    block: int
