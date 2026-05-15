<?php
declare(strict_types=1);

// CarbonIntensity SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

CarbonIntensityUtility::setRegistrar(function (CarbonIntensityUtility $u): void {
    $u->clean = [CarbonIntensityClean::class, 'call'];
    $u->done = [CarbonIntensityDone::class, 'call'];
    $u->make_error = [CarbonIntensityMakeError::class, 'call'];
    $u->feature_add = [CarbonIntensityFeatureAdd::class, 'call'];
    $u->feature_hook = [CarbonIntensityFeatureHook::class, 'call'];
    $u->feature_init = [CarbonIntensityFeatureInit::class, 'call'];
    $u->fetcher = [CarbonIntensityFetcher::class, 'call'];
    $u->make_fetch_def = [CarbonIntensityMakeFetchDef::class, 'call'];
    $u->make_context = [CarbonIntensityMakeContext::class, 'call'];
    $u->make_options = [CarbonIntensityMakeOptions::class, 'call'];
    $u->make_request = [CarbonIntensityMakeRequest::class, 'call'];
    $u->make_response = [CarbonIntensityMakeResponse::class, 'call'];
    $u->make_result = [CarbonIntensityMakeResult::class, 'call'];
    $u->make_point = [CarbonIntensityMakePoint::class, 'call'];
    $u->make_spec = [CarbonIntensityMakeSpec::class, 'call'];
    $u->make_url = [CarbonIntensityMakeUrl::class, 'call'];
    $u->param = [CarbonIntensityParam::class, 'call'];
    $u->prepare_auth = [CarbonIntensityPrepareAuth::class, 'call'];
    $u->prepare_body = [CarbonIntensityPrepareBody::class, 'call'];
    $u->prepare_headers = [CarbonIntensityPrepareHeaders::class, 'call'];
    $u->prepare_method = [CarbonIntensityPrepareMethod::class, 'call'];
    $u->prepare_params = [CarbonIntensityPrepareParams::class, 'call'];
    $u->prepare_path = [CarbonIntensityPreparePath::class, 'call'];
    $u->prepare_query = [CarbonIntensityPrepareQuery::class, 'call'];
    $u->result_basic = [CarbonIntensityResultBasic::class, 'call'];
    $u->result_body = [CarbonIntensityResultBody::class, 'call'];
    $u->result_headers = [CarbonIntensityResultHeaders::class, 'call'];
    $u->transform_request = [CarbonIntensityTransformRequest::class, 'call'];
    $u->transform_response = [CarbonIntensityTransformResponse::class, 'call'];
});
