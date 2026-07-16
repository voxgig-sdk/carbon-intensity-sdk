<?php
declare(strict_types=1);

// CarbonIntensity SDK base feature

class CarbonIntensityBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CarbonIntensityContext $ctx, array $options): void {}
    public function PostConstruct(CarbonIntensityContext $ctx): void {}
    public function PostConstructEntity(CarbonIntensityContext $ctx): void {}
    public function SetData(CarbonIntensityContext $ctx): void {}
    public function GetData(CarbonIntensityContext $ctx): void {}
    public function GetMatch(CarbonIntensityContext $ctx): void {}
    public function SetMatch(CarbonIntensityContext $ctx): void {}
    public function PrePoint(CarbonIntensityContext $ctx): void {}
    public function PreSpec(CarbonIntensityContext $ctx): void {}
    public function PreRequest(CarbonIntensityContext $ctx): void {}
    public function PreResponse(CarbonIntensityContext $ctx): void {}
    public function PreResult(CarbonIntensityContext $ctx): void {}
    public function PreDone(CarbonIntensityContext $ctx): void {}
    public function PreUnexpected(CarbonIntensityContext $ctx): void {}
}
