# CarbonIntensity SDK exists test

require "minitest/autorun"
require_relative "../CarbonIntensity_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = CarbonIntensitySDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
