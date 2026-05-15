-- ProjectName SDK exists test

local sdk = require("carbon-intensity_sdk")

describe("CarbonIntensitySDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
