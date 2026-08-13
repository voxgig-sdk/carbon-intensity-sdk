# CarbonIntensity SDK feature factory

from carbonintensity_sdk.feature.base_feature import CarbonIntensityBaseFeature
from carbonintensity_sdk.feature.test_feature import CarbonIntensityTestFeature


def _make_feature(name):
    features = {
        "base": lambda: CarbonIntensityBaseFeature(),
        "test": lambda: CarbonIntensityTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
