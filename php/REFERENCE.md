# CarbonIntensity PHP SDK Reference

Complete API reference for the CarbonIntensity PHP SDK.


## CarbonIntensitySDK

### Constructor

```php
require_once __DIR__ . '/carbonintensity_sdk.php';

$client = new CarbonIntensitySDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CarbonIntensitySDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = CarbonIntensitySDK::test();
```


### Instance Methods

#### `Generation($data = null)`

Create a new `GenerationEntity` instance. Pass `null` for no initial data.

#### `GenerationList($data = null)`

Create a new `GenerationListEntity` instance. Pass `null` for no initial data.

#### `Intensity($data = null)`

Create a new `IntensityEntity` instance. Pass `null` for no initial data.

#### `IntensityFactor($data = null)`

Create a new `IntensityFactorEntity` instance. Pass `null` for no initial data.

#### `IntensityList($data = null)`

Create a new `IntensityListEntity` instance. Pass `null` for no initial data.

#### `Regional($data = null)`

Create a new `RegionalEntity` instance. Pass `null` for no initial data.

#### `RegionalIntensity($data = null)`

Create a new `RegionalIntensityEntity` instance. Pass `null` for no initial data.

#### `RegionalIntensityList($data = null)`

Create a new `RegionalIntensityListEntity` instance. Pass `null` for no initial data.

#### `Stat($data = null)`

Create a new `StatEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): CarbonIntensityUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## GenerationEntity

```php
$generation = $client->Generation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `array` | No |  |
| `from` | `string` | No |  |
| `generationmix` | `array` | No |  |
| `id` | `string` | No |  |
| `to` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Generation()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Generation()->load(["from" => "from", "to" => "to"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GenerationEntity`

Create a new `GenerationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GenerationListEntity

```php
$generation_list = $client->GenerationList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `string` | No |  |
| `generationmix` | `array` | No |  |
| `to` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->GenerationList()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GenerationListEntity`

Create a new `GenerationListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IntensityEntity

```php
$intensity = $client->Intensity();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `array` | No |  |
| `from` | `string` | No | Start datetime of the period |
| `id` | `string` | No |  |
| `intensity` | `array` | No |  |
| `to` | `string` | No | End datetime of the period |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Intensity()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Intensity()->load(["id" => "intensity_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IntensityEntity`

Create a new `IntensityEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IntensityFactorEntity

```php
$intensity_factor = $client->IntensityFactor();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Biomass` | `int` | No | Carbon intensity factor for biomass (gCO2/kWh) |
| `Coal` | `int` | No | Carbon intensity factor for coal (gCO2/kWh) |
| `DutchImports` | `int` | No | Carbon intensity factor for Dutch imports (gCO2/kWh) |
| `FrenchImports` | `int` | No | Carbon intensity factor for French imports (gCO2/kWh) |
| `GasCombinedCycle` | `int` | No | Carbon intensity factor for gas combined cycle (gCO2/kWh) |
| `GasOpenCycle` | `int` | No | Carbon intensity factor for gas open cycle (gCO2/kWh) |
| `Hydro` | `int` | No | Carbon intensity factor for hydro (gCO2/kWh) |
| `IrishImports` | `int` | No | Carbon intensity factor for Irish imports (gCO2/kWh) |
| `Nuclear` | `int` | No | Carbon intensity factor for nuclear (gCO2/kWh) |
| `Oil` | `int` | No | Carbon intensity factor for oil (gCO2/kWh) |
| `Other` | `int` | No | Carbon intensity factor for other (gCO2/kWh) |
| `PumpedStorage` | `int` | No | Carbon intensity factor for pumped storage (gCO2/kWh) |
| `Solar` | `int` | No | Carbon intensity factor for solar (gCO2/kWh) |
| `Wind` | `int` | No | Carbon intensity factor for wind (gCO2/kWh) |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->IntensityFactor()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IntensityFactorEntity`

Create a new `IntensityFactorEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IntensityListEntity

```php
$intensity_list = $client->IntensityList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `array` | No |  |
| `from` | `string` | No | Start datetime of the period |
| `intensity` | `array` | No |  |
| `to` | `string` | No | End datetime of the period |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->IntensityList()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->IntensityList()->load(["date" => "date"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IntensityListEntity`

Create a new `IntensityListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RegionalEntity

```php
$regional = $client->Regional();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `array` | No |  |
| `dnoregion` | `string` | No | Distribution Network Operator region |
| `postcode` | `string` | No | Outward postcode |
| `regionid` | `int` | No | Region ID (1-17) |
| `shortname` | `string` | No | Short region name |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Regional()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RegionalEntity`

Create a new `RegionalEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RegionalIntensityEntity

```php
$regional_intensity = $client->RegionalIntensity();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `array` | No |  |
| `dnoregion` | `string` | No | Distribution Network Operator region |
| `postcode` | `string` | No | Outward postcode |
| `regionid` | `int` | No | Region ID (1-17) |
| `shortname` | `string` | No | Short region name |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->RegionalIntensity()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->RegionalIntensity()->load(["postcode" => "postcode"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RegionalIntensityEntity`

Create a new `RegionalIntensityEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RegionalIntensityListEntity

```php
$regional_intensity_list = $client->RegionalIntensityList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `array` | No |  |
| `dnoregion` | `string` | No | Distribution Network Operator region |
| `id` | `string` | No |  |
| `postcode` | `string` | No | Outward postcode |
| `regionid` | `int` | No | Region ID (1-17) |
| `shortname` | `string` | No | Short region name |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->RegionalIntensityList()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->RegionalIntensityList()->load(["from" => "from", "to" => "to"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RegionalIntensityListEntity`

Create a new `RegionalIntensityListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StatEntity

```php
$stat = $client->Stat();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `array` | No |  |
| `id` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Stat()->load(["from" => "from", "to" => "to"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StatEntity`

Create a new `StatEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new CarbonIntensitySDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

