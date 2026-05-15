<?php
declare(strict_types=1);

// CarbonIntensity SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CarbonIntensityMakeContext
{
    public static function call(array $ctxmap, ?CarbonIntensityContext $basectx): CarbonIntensityContext
    {
        return new CarbonIntensityContext($ctxmap, $basectx);
    }
}
