// Typed models for the CarbonIntensity SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Generation is the typed data model for the generation entity.
type Generation struct {
	From *string `json:"from,omitempty"`
	Generationmix *[]any `json:"generationmix,omitempty"`
	To *string `json:"to,omitempty"`
}

// GenerationListMatch is the typed request payload for Generation.ListTyped.
type GenerationListMatch struct {
	From string `json:"from"`
	To string `json:"to"`
}

// GenerationList is the typed data model for the generation_list entity.
type GenerationList struct {
	From *string `json:"from,omitempty"`
	Generationmix *[]any `json:"generationmix,omitempty"`
	To *string `json:"to,omitempty"`
}

// GenerationListListMatch is the typed request payload for GenerationList.ListTyped.
type GenerationListListMatch struct {
	From string `json:"from"`
}

// Intensity is the typed data model for the intensity entity.
type Intensity struct {
	Data *[]any `json:"data,omitempty"`
	From *string `json:"from,omitempty"`
	Intensity *map[string]any `json:"intensity,omitempty"`
	To *string `json:"to,omitempty"`
}

// IntensityLoadMatch is the typed request payload for Intensity.LoadTyped.
type IntensityLoadMatch struct {
	Id string `json:"id"`
}

// IntensityListMatch is the typed request payload for Intensity.ListTyped.
type IntensityListMatch struct {
	Date string `json:"date"`
	Period int `json:"period"`
	From string `json:"from"`
	To string `json:"to"`
}

// IntensityFactor is the typed data model for the intensity_factor entity.
type IntensityFactor struct {
	Biomass *int `json:"biomass,omitempty"`
	Coal *int `json:"coal,omitempty"`
	DutchImport *int `json:"dutch_import,omitempty"`
	FrenchImport *int `json:"french_import,omitempty"`
	GasCombinedCycle *int `json:"gas__combined_cycle,omitempty"`
	GasOpenCycle *int `json:"gas__open_cycle,omitempty"`
	Hydro *int `json:"hydro,omitempty"`
	IrishImport *int `json:"irish_import,omitempty"`
	Nuclear *int `json:"nuclear,omitempty"`
	Oil *int `json:"oil,omitempty"`
	Other *int `json:"other,omitempty"`
	PumpedStorage *int `json:"pumped_storage,omitempty"`
	Solar *int `json:"solar,omitempty"`
	Wind *int `json:"wind,omitempty"`
}

// IntensityFactorListMatch mirrors the intensity_factor fields as an all-optional match
// filter (Go analog of Partial<IntensityFactor>).
type IntensityFactorListMatch struct {
	Biomass *int `json:"biomass,omitempty"`
	Coal *int `json:"coal,omitempty"`
	DutchImport *int `json:"dutch_import,omitempty"`
	FrenchImport *int `json:"french_import,omitempty"`
	GasCombinedCycle *int `json:"gas__combined_cycle,omitempty"`
	GasOpenCycle *int `json:"gas__open_cycle,omitempty"`
	Hydro *int `json:"hydro,omitempty"`
	IrishImport *int `json:"irish_import,omitempty"`
	Nuclear *int `json:"nuclear,omitempty"`
	Oil *int `json:"oil,omitempty"`
	Other *int `json:"other,omitempty"`
	PumpedStorage *int `json:"pumped_storage,omitempty"`
	Solar *int `json:"solar,omitempty"`
	Wind *int `json:"wind,omitempty"`
}

// IntensityList is the typed data model for the intensity_list entity.
type IntensityList struct {
	Data *[]any `json:"data,omitempty"`
	From *string `json:"from,omitempty"`
	Intensity *map[string]any `json:"intensity,omitempty"`
	To *string `json:"to,omitempty"`
}

// IntensityListLoadMatch is the typed request payload for IntensityList.LoadTyped.
type IntensityListLoadMatch struct {
	Date string `json:"date"`
}

// IntensityListListMatch is the typed request payload for IntensityList.ListTyped.
type IntensityListListMatch struct {
	From string `json:"from"`
}

// Regional is the typed data model for the regional entity.
type Regional struct {
	Data *[]any `json:"data,omitempty"`
	Dnoregion *string `json:"dnoregion,omitempty"`
	Postcode *string `json:"postcode,omitempty"`
	Regionid *int `json:"regionid,omitempty"`
	Shortname *string `json:"shortname,omitempty"`
}

// RegionalListMatch mirrors the regional fields as an all-optional match
// filter (Go analog of Partial<Regional>).
type RegionalListMatch struct {
	Data *[]any `json:"data,omitempty"`
	Dnoregion *string `json:"dnoregion,omitempty"`
	Postcode *string `json:"postcode,omitempty"`
	Regionid *int `json:"regionid,omitempty"`
	Shortname *string `json:"shortname,omitempty"`
}

// RegionalIntensity is the typed data model for the regional_intensity entity.
type RegionalIntensity struct {
	Data *[]any `json:"data,omitempty"`
	Dnoregion *string `json:"dnoregion,omitempty"`
	Postcode *string `json:"postcode,omitempty"`
	Regionid *int `json:"regionid,omitempty"`
	Shortname *string `json:"shortname,omitempty"`
}

// RegionalIntensityLoadMatch is the typed request payload for RegionalIntensity.LoadTyped.
type RegionalIntensityLoadMatch struct {
	Postcode string `json:"postcode"`
	Regionid int `json:"regionid"`
}

// RegionalIntensityListMatch mirrors the regional_intensity fields as an all-optional match
// filter (Go analog of Partial<RegionalIntensity>).
type RegionalIntensityListMatch struct {
	Data *[]any `json:"data,omitempty"`
	Dnoregion *string `json:"dnoregion,omitempty"`
	Postcode *string `json:"postcode,omitempty"`
	Regionid *int `json:"regionid,omitempty"`
	Shortname *string `json:"shortname,omitempty"`
}

// RegionalIntensityList is the typed data model for the regional_intensity_list entity.
type RegionalIntensityList struct {
	Data *[]any `json:"data,omitempty"`
	Dnoregion *string `json:"dnoregion,omitempty"`
	Postcode *string `json:"postcode,omitempty"`
	Regionid *int `json:"regionid,omitempty"`
	Shortname *string `json:"shortname,omitempty"`
}

// RegionalIntensityListLoadMatch is the typed request payload for RegionalIntensityList.LoadTyped.
type RegionalIntensityListLoadMatch struct {
	IntensityId string `json:"intensity_id"`
	Postcode string `json:"postcode"`
	To string `json:"to"`
	Regionid int `json:"regionid"`
}

// RegionalIntensityListListMatch is the typed request payload for RegionalIntensityList.ListTyped.
type RegionalIntensityListListMatch struct {
	From string `json:"from"`
	To string `json:"to"`
}

// Stat is the typed data model for the stat entity.
type Stat struct {
	From *string `json:"from,omitempty"`
	Intensity *map[string]any `json:"intensity,omitempty"`
	To *string `json:"to,omitempty"`
}

// StatListMatch is the typed request payload for Stat.ListTyped.
type StatListMatch struct {
	Block int `json:"block"`
	From string `json:"from"`
	To string `json:"to"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
