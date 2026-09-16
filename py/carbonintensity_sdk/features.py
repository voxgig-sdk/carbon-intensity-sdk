# CarbonIntensity SDK feature factory

from carbonintensity_sdk.feature.base_feature import CarbonIntensityBaseFeature
from carbonintensity_sdk.feature.ratelimit_feature import CarbonIntensityRatelimitFeature
from carbonintensity_sdk.feature.retry_feature import CarbonIntensityRetryFeature
from carbonintensity_sdk.feature.test_feature import CarbonIntensityTestFeature
from carbonintensity_sdk.feature.timeout_feature import CarbonIntensityTimeoutFeature


_FEATURES = {
    "base": lambda: CarbonIntensityBaseFeature(),
    "ratelimit": lambda: CarbonIntensityRatelimitFeature(),
    "retry": lambda: CarbonIntensityRetryFeature(),
    "test": lambda: CarbonIntensityTestFeature(),
    "timeout": lambda: CarbonIntensityTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
