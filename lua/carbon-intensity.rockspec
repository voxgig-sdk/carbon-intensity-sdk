package = "voxgig-sdk-carbon-intensity"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/carbon-intensity-sdk.git"
}
description = {
  summary = "CarbonIntensity SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["carbon-intensity_sdk"] = "carbon-intensity_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
