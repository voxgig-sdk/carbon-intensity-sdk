<?php
declare(strict_types=1);

// CarbonIntensity SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class CarbonIntensityFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new CarbonIntensityBaseFeature();
            case "test":
                return new CarbonIntensityTestFeature();
            default:
                return new CarbonIntensityBaseFeature();
        }
    }
}
