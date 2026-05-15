# ProjectName SDK exists test

import pytest
from carbonintensity_sdk import CarbonIntensitySDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CarbonIntensitySDK.test(None, None)
        assert testsdk is not None
