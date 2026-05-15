# CarbonIntensity SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module CarbonIntensityFeatures
  def self.make_feature(name)
    case name
    when "base"
      CarbonIntensityBaseFeature.new
    when "test"
      CarbonIntensityTestFeature.new
    else
      CarbonIntensityBaseFeature.new
    end
  end
end
