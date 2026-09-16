# CarbonIntensity SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CarbonIntensityFeatures
  def self.make_feature(name)
    case name
    when "base"
      CarbonIntensityBaseFeature.new
    when "ratelimit"
      CarbonIntensityRatelimitFeature.new
    when "retry"
      CarbonIntensityRetryFeature.new
    when "test"
      CarbonIntensityTestFeature.new
    when "timeout"
      CarbonIntensityTimeoutFeature.new
    else
      CarbonIntensityBaseFeature.new
    end
  end
end
