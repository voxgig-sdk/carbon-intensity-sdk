package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGenerationEntityFunc func(client *CarbonIntensitySDK, entopts map[string]any) CarbonIntensityEntity

var NewGenerationListEntityFunc func(client *CarbonIntensitySDK, entopts map[string]any) CarbonIntensityEntity

var NewIntensityEntityFunc func(client *CarbonIntensitySDK, entopts map[string]any) CarbonIntensityEntity

var NewIntensityFactorEntityFunc func(client *CarbonIntensitySDK, entopts map[string]any) CarbonIntensityEntity

var NewIntensityListEntityFunc func(client *CarbonIntensitySDK, entopts map[string]any) CarbonIntensityEntity

var NewRegionalEntityFunc func(client *CarbonIntensitySDK, entopts map[string]any) CarbonIntensityEntity

var NewRegionalIntensityEntityFunc func(client *CarbonIntensitySDK, entopts map[string]any) CarbonIntensityEntity

var NewRegionalIntensityListEntityFunc func(client *CarbonIntensitySDK, entopts map[string]any) CarbonIntensityEntity

var NewStatEntityFunc func(client *CarbonIntensitySDK, entopts map[string]any) CarbonIntensityEntity

