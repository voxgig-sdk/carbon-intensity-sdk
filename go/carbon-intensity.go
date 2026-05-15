package voxgigcarbonintensitysdk

import (
	"github.com/voxgig-sdk/carbon-intensity-sdk/core"
	"github.com/voxgig-sdk/carbon-intensity-sdk/entity"
	"github.com/voxgig-sdk/carbon-intensity-sdk/feature"
	_ "github.com/voxgig-sdk/carbon-intensity-sdk/utility"
)

// Type aliases preserve external API.
type CarbonIntensitySDK = core.CarbonIntensitySDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CarbonIntensityEntity = core.CarbonIntensityEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CarbonIntensityError = core.CarbonIntensityError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGenerationEntityFunc = func(client *core.CarbonIntensitySDK, entopts map[string]any) core.CarbonIntensityEntity {
		return entity.NewGenerationEntity(client, entopts)
	}
	core.NewGenerationListEntityFunc = func(client *core.CarbonIntensitySDK, entopts map[string]any) core.CarbonIntensityEntity {
		return entity.NewGenerationListEntity(client, entopts)
	}
	core.NewIntensityEntityFunc = func(client *core.CarbonIntensitySDK, entopts map[string]any) core.CarbonIntensityEntity {
		return entity.NewIntensityEntity(client, entopts)
	}
	core.NewIntensityFactorEntityFunc = func(client *core.CarbonIntensitySDK, entopts map[string]any) core.CarbonIntensityEntity {
		return entity.NewIntensityFactorEntity(client, entopts)
	}
	core.NewIntensityListEntityFunc = func(client *core.CarbonIntensitySDK, entopts map[string]any) core.CarbonIntensityEntity {
		return entity.NewIntensityListEntity(client, entopts)
	}
	core.NewRegionalEntityFunc = func(client *core.CarbonIntensitySDK, entopts map[string]any) core.CarbonIntensityEntity {
		return entity.NewRegionalEntity(client, entopts)
	}
	core.NewRegionalIntensityEntityFunc = func(client *core.CarbonIntensitySDK, entopts map[string]any) core.CarbonIntensityEntity {
		return entity.NewRegionalIntensityEntity(client, entopts)
	}
	core.NewRegionalIntensityListEntityFunc = func(client *core.CarbonIntensitySDK, entopts map[string]any) core.CarbonIntensityEntity {
		return entity.NewRegionalIntensityListEntity(client, entopts)
	}
	core.NewStatEntityFunc = func(client *core.CarbonIntensitySDK, entopts map[string]any) core.CarbonIntensityEntity {
		return entity.NewStatEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCarbonIntensitySDK = core.NewCarbonIntensitySDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
