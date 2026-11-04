package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewGenerationEntityFunc func(client *CarbonIntensitySDK, entopts map[string]any) CarbonIntensityEntityBase

var NewGenerationListEntityFunc func(client *CarbonIntensitySDK, entopts map[string]any) CarbonIntensityEntityBase

var NewIntensityEntityFunc func(client *CarbonIntensitySDK, entopts map[string]any) CarbonIntensityEntityBase

var NewIntensityFactorEntityFunc func(client *CarbonIntensitySDK, entopts map[string]any) CarbonIntensityEntityBase

var NewIntensityListEntityFunc func(client *CarbonIntensitySDK, entopts map[string]any) CarbonIntensityEntityBase

var NewRegionalEntityFunc func(client *CarbonIntensitySDK, entopts map[string]any) CarbonIntensityEntityBase

var NewRegionalIntensityEntityFunc func(client *CarbonIntensitySDK, entopts map[string]any) CarbonIntensityEntityBase

var NewRegionalIntensityListEntityFunc func(client *CarbonIntensitySDK, entopts map[string]any) CarbonIntensityEntityBase

var NewStatEntityFunc func(client *CarbonIntensitySDK, entopts map[string]any) CarbonIntensityEntityBase

