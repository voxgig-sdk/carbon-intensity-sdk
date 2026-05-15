<?php
declare(strict_types=1);

// CarbonIntensity SDK exists test

require_once __DIR__ . '/../carbonintensity_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = CarbonIntensitySDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
