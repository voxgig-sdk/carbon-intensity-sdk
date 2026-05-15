-- CarbonIntensity SDK error

local CarbonIntensityError = {}
CarbonIntensityError.__index = CarbonIntensityError


function CarbonIntensityError.new(code, msg, ctx)
  local self = setmetatable({}, CarbonIntensityError)
  self.is_sdk_error = true
  self.sdk = "CarbonIntensity"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CarbonIntensityError:error()
  return self.msg
end


function CarbonIntensityError:__tostring()
  return self.msg
end


return CarbonIntensityError
