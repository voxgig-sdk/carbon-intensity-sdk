# Typed models for the CarbonIntensity SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Generation:
    generationmix: Optional[list] = None
    to: Optional[str] = None


@dataclass
class GenerationListMatch:
    to: str


@dataclass
class GenerationList:
    generationmix: Optional[list] = None
    to: Optional[str] = None


@dataclass
class GenerationListListMatch:
    pass


@dataclass
class Intensity:
    data: Optional[list] = None
    intensity: Optional[dict] = None
    to: Optional[str] = None


@dataclass
class IntensityLoadMatch:
    id: str


@dataclass
class IntensityListMatch:
    date: str
    period: int
    to: str


@dataclass
class IntensityFactor:
    biomass: Optional[int] = None
    coal: Optional[int] = None
    dutch_import: Optional[int] = None
    french_import: Optional[int] = None
    gas__combined_cycle: Optional[int] = None
    gas__open_cycle: Optional[int] = None
    hydro: Optional[int] = None
    irish_import: Optional[int] = None
    nuclear: Optional[int] = None
    oil: Optional[int] = None
    other: Optional[int] = None
    pumped_storage: Optional[int] = None
    solar: Optional[int] = None
    wind: Optional[int] = None


@dataclass
class IntensityFactorListMatch:
    biomass: Optional[int] = None
    coal: Optional[int] = None
    dutch_import: Optional[int] = None
    french_import: Optional[int] = None
    gas__combined_cycle: Optional[int] = None
    gas__open_cycle: Optional[int] = None
    hydro: Optional[int] = None
    irish_import: Optional[int] = None
    nuclear: Optional[int] = None
    oil: Optional[int] = None
    other: Optional[int] = None
    pumped_storage: Optional[int] = None
    solar: Optional[int] = None
    wind: Optional[int] = None


@dataclass
class IntensityList:
    data: Optional[list] = None
    intensity: Optional[dict] = None
    to: Optional[str] = None


@dataclass
class IntensityListLoadMatch:
    date: str


@dataclass
class IntensityListListMatch:
    pass


@dataclass
class Regional:
    data: Optional[list] = None
    dnoregion: Optional[str] = None
    postcode: Optional[str] = None
    regionid: Optional[int] = None
    shortname: Optional[str] = None


@dataclass
class RegionalListMatch:
    data: Optional[list] = None
    dnoregion: Optional[str] = None
    postcode: Optional[str] = None
    regionid: Optional[int] = None
    shortname: Optional[str] = None


@dataclass
class RegionalIntensity:
    data: Optional[list] = None
    dnoregion: Optional[str] = None
    postcode: Optional[str] = None
    regionid: Optional[int] = None
    shortname: Optional[str] = None


@dataclass
class RegionalIntensityLoadMatch:
    postcode: str
    regionid: int


@dataclass
class RegionalIntensityListMatch:
    data: Optional[list] = None
    dnoregion: Optional[str] = None
    postcode: Optional[str] = None
    regionid: Optional[int] = None
    shortname: Optional[str] = None


@dataclass
class RegionalIntensityList:
    data: Optional[list] = None
    dnoregion: Optional[str] = None
    postcode: Optional[str] = None
    regionid: Optional[int] = None
    shortname: Optional[str] = None


@dataclass
class RegionalIntensityListLoadMatch:
    intensity_id: str
    postcode: str
    to: str
    regionid: int


@dataclass
class RegionalIntensityListListMatch:
    to: str


@dataclass
class Stat:
    intensity: Optional[dict] = None
    to: Optional[str] = None


@dataclass
class StatListMatch:
    block: int
    to: str

