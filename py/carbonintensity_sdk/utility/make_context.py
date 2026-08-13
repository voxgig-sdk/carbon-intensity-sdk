# CarbonIntensity SDK utility: make_context

from carbonintensity_sdk.core.context import CarbonIntensityContext


def make_context_util(ctxmap, basectx):
    return CarbonIntensityContext(ctxmap, basectx)
