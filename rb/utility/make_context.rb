# CarbonIntensity SDK utility: make_context
require_relative '../core/context'
module CarbonIntensityUtilities
  MakeContext = ->(ctxmap, basectx) {
    CarbonIntensityContext.new(ctxmap, basectx)
  }
end
