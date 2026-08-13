# CarbonIntensity SDK utility: make_context

from projectname_sdk.core.context import CarbonIntensityContext


def make_context_util(ctxmap, basectx):
    return CarbonIntensityContext(ctxmap, basectx)
