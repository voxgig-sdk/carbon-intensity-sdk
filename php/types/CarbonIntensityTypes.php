<?php
declare(strict_types=1);

// Typed models for the CarbonIntensity SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Generation entity data model. */
class Generation
{
    public ?string $from = null;
    public ?array $generationmix = null;
    public ?string $to = null;
}

/** Request payload for Generation#list. */
class GenerationListMatch
{
    public string $from;
    public string $to;
}

/** GenerationList entity data model. */
class GenerationList
{
    public ?string $from = null;
    public ?array $generationmix = null;
    public ?string $to = null;
}

/** Request payload for GenerationList#list. */
class GenerationListListMatch
{
    public string $from;
}

/** Intensity entity data model. */
class Intensity
{
    public ?array $data = null;
    public ?string $from = null;
    public ?array $intensity = null;
    public ?string $to = null;
}

/** Request payload for Intensity#load. */
class IntensityLoadMatch
{
    public string $id;
}

/** Request payload for Intensity#list. */
class IntensityListMatch
{
    public string $date;
    public int $period;
    public string $from;
    public string $to;
}

/** IntensityFactor entity data model. */
class IntensityFactor
{
    public ?int $biomass = null;
    public ?int $coal = null;
    public ?int $dutch_import = null;
    public ?int $french_import = null;
    public ?int $gas__combined_cycle = null;
    public ?int $gas__open_cycle = null;
    public ?int $hydro = null;
    public ?int $irish_import = null;
    public ?int $nuclear = null;
    public ?int $oil = null;
    public ?int $other = null;
    public ?int $pumped_storage = null;
    public ?int $solar = null;
    public ?int $wind = null;
}

/** Request payload for IntensityFactor#list. */
class IntensityFactorListMatch
{
    public ?int $biomass = null;
    public ?int $coal = null;
    public ?int $dutch_import = null;
    public ?int $french_import = null;
    public ?int $gas__combined_cycle = null;
    public ?int $gas__open_cycle = null;
    public ?int $hydro = null;
    public ?int $irish_import = null;
    public ?int $nuclear = null;
    public ?int $oil = null;
    public ?int $other = null;
    public ?int $pumped_storage = null;
    public ?int $solar = null;
    public ?int $wind = null;
}

/** IntensityList entity data model. */
class IntensityList
{
    public ?array $data = null;
    public ?string $from = null;
    public ?array $intensity = null;
    public ?string $to = null;
}

/** Request payload for IntensityList#load. */
class IntensityListLoadMatch
{
    public string $date;
}

/** Request payload for IntensityList#list. */
class IntensityListListMatch
{
    public string $from;
}

/** Regional entity data model. */
class Regional
{
    public ?array $data = null;
    public ?string $dnoregion = null;
    public ?string $postcode = null;
    public ?int $regionid = null;
    public ?string $shortname = null;
}

/** Request payload for Regional#list. */
class RegionalListMatch
{
    public ?array $data = null;
    public ?string $dnoregion = null;
    public ?string $postcode = null;
    public ?int $regionid = null;
    public ?string $shortname = null;
}

/** RegionalIntensity entity data model. */
class RegionalIntensity
{
    public ?array $data = null;
    public ?string $dnoregion = null;
    public ?string $postcode = null;
    public ?int $regionid = null;
    public ?string $shortname = null;
}

/** Request payload for RegionalIntensity#load. */
class RegionalIntensityLoadMatch
{
    public string $postcode;
    public int $regionid;
}

/** Request payload for RegionalIntensity#list. */
class RegionalIntensityListMatch
{
    public ?array $data = null;
    public ?string $dnoregion = null;
    public ?string $postcode = null;
    public ?int $regionid = null;
    public ?string $shortname = null;
}

/** RegionalIntensityList entity data model. */
class RegionalIntensityList
{
    public ?array $data = null;
    public ?string $dnoregion = null;
    public ?string $postcode = null;
    public ?int $regionid = null;
    public ?string $shortname = null;
}

/** Request payload for RegionalIntensityList#load. */
class RegionalIntensityListLoadMatch
{
    public string $intensity_id;
    public string $postcode;
    public string $to;
    public int $regionid;
}

/** Request payload for RegionalIntensityList#list. */
class RegionalIntensityListListMatch
{
    public string $from;
    public string $to;
}

/** Stat entity data model. */
class Stat
{
    public ?string $from = null;
    public ?array $intensity = null;
    public ?string $to = null;
}

/** Request payload for Stat#list. */
class StatListMatch
{
    public int $block;
    public string $from;
    public string $to;
}

