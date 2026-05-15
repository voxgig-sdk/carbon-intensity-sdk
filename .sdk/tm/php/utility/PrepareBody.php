<?php
declare(strict_types=1);

// CarbonIntensity SDK utility: prepare_body

class CarbonIntensityPrepareBody
{
    public static function call(CarbonIntensityContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
