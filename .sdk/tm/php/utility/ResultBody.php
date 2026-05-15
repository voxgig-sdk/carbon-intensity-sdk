<?php
declare(strict_types=1);

// CarbonIntensity SDK utility: result_body

class CarbonIntensityResultBody
{
    public static function call(CarbonIntensityContext $ctx): ?CarbonIntensityResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
