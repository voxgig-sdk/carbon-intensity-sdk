# CarbonIntensity SDK utility: prepare_body
require_relative 'media'
module CarbonIntensityUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return CarbonIntensityUtilities.raw_body(ctx.reqdata) if CarbonIntensityUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
