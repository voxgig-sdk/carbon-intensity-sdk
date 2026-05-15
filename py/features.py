# CarbonIntensity SDK feature factory

from feature.base_feature import CarbonIntensityBaseFeature
from feature.test_feature import CarbonIntensityTestFeature


def _make_feature(name):
    features = {
        "base": lambda: CarbonIntensityBaseFeature(),
        "test": lambda: CarbonIntensityTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
