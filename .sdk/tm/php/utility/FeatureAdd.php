<?php
declare(strict_types=1);

// CarbonIntensity SDK utility: feature_add

class CarbonIntensityFeatureAdd
{
    public static function call(CarbonIntensityContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
