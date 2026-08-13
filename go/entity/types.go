// Typed models for the CarbonIntensity SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/carbon-intensity-sdk/go/core"
)

// Generation is the typed data model for the generation entity.
type Generation struct {
	From *string `json:"from,omitempty"`
	Generationmix *[]any `json:"generationmix,omitempty"`
	To *string `json:"to,omitempty"`
}

// GenerationListMatch is the typed request payload for Generation.ListTyped.
type GenerationListMatch struct {
	From *string `json:"from,omitempty"`
	To *string `json:"to,omitempty"`
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
	Date *string `json:"date,omitempty"`
	Period *int `json:"period,omitempty"`
	From *string `json:"from,omitempty"`
	To *string `json:"to,omitempty"`
}

// IntensityFactor is the typed data model for the intensity_factor entity.
type IntensityFactor struct {
	Biomass *int `json:"Biomass,omitempty"`
	Coal *int `json:"Coal,omitempty"`
	DutchImports *int `json:"DutchImports,omitempty"`
	FrenchImports *int `json:"FrenchImports,omitempty"`
	GasCombinedCycle *int `json:"GasCombinedCycle,omitempty"`
	GasOpenCycle *int `json:"GasOpenCycle,omitempty"`
	Hydro *int `json:"Hydro,omitempty"`
	IrishImports *int `json:"IrishImports,omitempty"`
	Nuclear *int `json:"Nuclear,omitempty"`
	Oil *int `json:"Oil,omitempty"`
	Other *int `json:"Other,omitempty"`
	PumpedStorage *int `json:"PumpedStorage,omitempty"`
	Solar *int `json:"Solar,omitempty"`
	Wind *int `json:"Wind,omitempty"`
}

// IntensityFactorListMatch is the typed request payload for IntensityFactor.ListTyped.
type IntensityFactorListMatch struct {
	Biomass *int `json:"Biomass,omitempty"`
	Coal *int `json:"Coal,omitempty"`
	DutchImports *int `json:"DutchImports,omitempty"`
	FrenchImports *int `json:"FrenchImports,omitempty"`
	GasCombinedCycle *int `json:"GasCombinedCycle,omitempty"`
	GasOpenCycle *int `json:"GasOpenCycle,omitempty"`
	Hydro *int `json:"Hydro,omitempty"`
	IrishImports *int `json:"IrishImports,omitempty"`
	Nuclear *int `json:"Nuclear,omitempty"`
	Oil *int `json:"Oil,omitempty"`
	Other *int `json:"Other,omitempty"`
	PumpedStorage *int `json:"PumpedStorage,omitempty"`
	Solar *int `json:"Solar,omitempty"`
	Wind *int `json:"Wind,omitempty"`
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
	From *string `json:"from,omitempty"`
}

// Regional is the typed data model for the regional entity.
type Regional struct {
	Data *[]any `json:"data,omitempty"`
	Dnoregion *string `json:"dnoregion,omitempty"`
	Postcode *string `json:"postcode,omitempty"`
	Regionid *int `json:"regionid,omitempty"`
	Shortname *string `json:"shortname,omitempty"`
}

// RegionalListMatch is the typed request payload for Regional.ListTyped.
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
	Postcode *string `json:"postcode,omitempty"`
	Regionid *int `json:"regionid,omitempty"`
}

// RegionalIntensityListMatch is the typed request payload for RegionalIntensity.ListTyped.
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
	Postcode *string `json:"postcode,omitempty"`
	To *string `json:"to,omitempty"`
	Regionid *int `json:"regionid,omitempty"`
}

// RegionalIntensityListListMatch is the typed request payload for RegionalIntensityList.ListTyped.
type RegionalIntensityListListMatch struct {
	From string `json:"from"`
	To *string `json:"to,omitempty"`
}

// Stat is the typed data model for the stat entity.
type Stat struct {
	From *string `json:"from,omitempty"`
	Intensity *map[string]any `json:"intensity,omitempty"`
	To *string `json:"to,omitempty"`
}

// StatListMatch is the typed request payload for Stat.ListTyped.
type StatListMatch struct {
	Block *int `json:"block,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
