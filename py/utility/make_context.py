# CarbonIntensity SDK utility: make_context

from core.context import CarbonIntensityContext


def make_context_util(ctxmap, basectx):
    return CarbonIntensityContext(ctxmap, basectx)
