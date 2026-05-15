<?php
declare(strict_types=1);

// CarbonIntensity SDK utility: result_headers

class CarbonIntensityResultHeaders
{
    public static function call(CarbonIntensityContext $ctx): ?CarbonIntensityResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
