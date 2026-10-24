# Typed models for the CarbonIntensity SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
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


Generation = TypedDict('Generation', {
    "data": list,
    "from": str,
    "generationmix": list,
    "id": str,
    "to": str,
}, total=False)


GenerationLoadMatch = TypedDict('GenerationLoadMatch', {
    "from": str,
    "to": str,
})


GenerationListMatch = TypedDict('GenerationListMatch', {
    "data": list,
    "from": str,
    "generationmix": list,
    "id": str,
    "to": str,
}, total=False)


GenerationList = TypedDict('GenerationList', {
    "from": str,
    "generationmix": list,
    "to": str,
}, total=False)


GenerationListListMatch = TypedDict('GenerationListListMatch', {
    "from": str,
})


Intensity = TypedDict('Intensity', {
    "data": list,
    "from": str,
    "id": str,
    "intensity": dict,
    "to": str,
}, total=False)


class IntensityLoadMatch(TypedDict):
    id: str


IntensityListMatch = TypedDict('IntensityListMatch', {
    "data": list,
    "from": str,
    "id": str,
    "intensity": dict,
    "to": str,
}, total=False)


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


IntensityList = TypedDict('IntensityList', {
    "data": list,
    "from": str,
    "intensity": dict,
    "to": str,
}, total=False)


class IntensityListLoadMatch(TypedDict):
    date: str


IntensityListListMatch = TypedDict('IntensityListListMatch', {
    "data": list,
    "from": str,
    "intensity": dict,
    "to": str,
}, total=False)


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


RegionalIntensityListLoadMatchRequired = TypedDict('RegionalIntensityListLoadMatchRequired', {
    "from": str,
})

RegionalIntensityListLoadMatchOptional = TypedDict('RegionalIntensityListLoadMatchOptional', {
    "postcode": str,
    "to": str,
    "regionid": int,
}, total=False)


class RegionalIntensityListLoadMatch(RegionalIntensityListLoadMatchRequired, RegionalIntensityListLoadMatchOptional):
    pass


RegionalIntensityListListMatch = TypedDict('RegionalIntensityListListMatch', {
    "from": str,
})


class Stat(TypedDict, total=False):
    data: list
    id: str


StatLoadMatchRequired = TypedDict('StatLoadMatchRequired', {
    "from": str,
    "to": str,
})

StatLoadMatchOptional = TypedDict('StatLoadMatchOptional', {
    "block": int,
}, total=False)


class StatLoadMatch(StatLoadMatchRequired, StatLoadMatchOptional):
    pass
