# CarbonIntensity PHP SDK Reference

Complete API reference for the CarbonIntensity PHP SDK.


## CarbonIntensitySDK

### Constructor

```php
require_once __DIR__ . '/carbon-intensity_sdk.php';

$client = new CarbonIntensitySDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

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

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## GenerationEntity

```php
$generation = $client->Generation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | ``$STRING`` | No |  |
| `generationmix` | ``$ARRAY`` | No |  |
| `to` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Generation()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GenerationEntity`

Create a new `GenerationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GenerationListEntity

```php
$generation_list = $client->GenerationList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | ``$STRING`` | No |  |
| `generationmix` | ``$ARRAY`` | No |  |
| `to` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->GenerationList()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GenerationListEntity`

Create a new `GenerationListEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## IntensityEntity

```php
$intensity = $client->Intensity();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ARRAY`` | No |  |
| `from` | ``$STRING`` | No |  |
| `intensity` | ``$OBJECT`` | No |  |
| `to` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Intensity()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Intensity()->load(["id" => "intensity_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): IntensityEntity`

Create a new `IntensityEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## IntensityFactorEntity

```php
$intensity_factor = $client->IntensityFactor();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `biomass` | ``$INTEGER`` | No |  |
| `coal` | ``$INTEGER`` | No |  |
| `dutch_import` | ``$INTEGER`` | No |  |
| `french_import` | ``$INTEGER`` | No |  |
| `gas__combined_cycle` | ``$INTEGER`` | No |  |
| `gas__open_cycle` | ``$INTEGER`` | No |  |
| `hydro` | ``$INTEGER`` | No |  |
| `irish_import` | ``$INTEGER`` | No |  |
| `nuclear` | ``$INTEGER`` | No |  |
| `oil` | ``$INTEGER`` | No |  |
| `other` | ``$INTEGER`` | No |  |
| `pumped_storage` | ``$INTEGER`` | No |  |
| `solar` | ``$INTEGER`` | No |  |
| `wind` | ``$INTEGER`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->IntensityFactor()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): IntensityFactorEntity`

Create a new `IntensityFactorEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## IntensityListEntity

```php
$intensity_list = $client->IntensityList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ARRAY`` | No |  |
| `from` | ``$STRING`` | No |  |
| `intensity` | ``$OBJECT`` | No |  |
| `to` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->IntensityList()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->IntensityList()->load(["id" => "intensity_list_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): IntensityListEntity`

Create a new `IntensityListEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RegionalEntity

```php
$regional = $client->Regional();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ARRAY`` | No |  |
| `dnoregion` | ``$STRING`` | No |  |
| `postcode` | ``$STRING`` | No |  |
| `regionid` | ``$INTEGER`` | No |  |
| `shortname` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Regional()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RegionalEntity`

Create a new `RegionalEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RegionalIntensityEntity

```php
$regional_intensity = $client->RegionalIntensity();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ARRAY`` | No |  |
| `dnoregion` | ``$STRING`` | No |  |
| `postcode` | ``$STRING`` | No |  |
| `regionid` | ``$INTEGER`` | No |  |
| `shortname` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->RegionalIntensity()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->RegionalIntensity()->load(["id" => "regional_intensity_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RegionalIntensityEntity`

Create a new `RegionalIntensityEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RegionalIntensityListEntity

```php
$regional_intensity_list = $client->RegionalIntensityList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ARRAY`` | No |  |
| `dnoregion` | ``$STRING`` | No |  |
| `postcode` | ``$STRING`` | No |  |
| `regionid` | ``$INTEGER`` | No |  |
| `shortname` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->RegionalIntensityList()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->RegionalIntensityList()->load(["id" => "regional_intensity_list_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RegionalIntensityListEntity`

Create a new `RegionalIntensityListEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## StatEntity

```php
$stat = $client->Stat();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | ``$STRING`` | No |  |
| `intensity` | ``$OBJECT`` | No |  |
| `to` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Stat()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): StatEntity`

Create a new `StatEntity` instance with the same client and
options.

#### `getName(): string`

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

