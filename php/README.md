# CarbonIntensity PHP SDK



The PHP SDK for the CarbonIntensity API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Generation()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/carbon-intensity-sdk/releases](https://github.com/voxgig-sdk/carbon-intensity-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'carbonintensity_sdk.php';

$client = new CarbonIntensitySDK();
```

### 2. List generation records

```php
try {
    // list() returns entity instances; data_get() reads each record.
    $generations = $client->Generation()->list();
    foreach ($generations as $record) {
        $item = $record->data_get();
        echo $item["id"] . " " . $item["data"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a generation

Generation is nested under from, so provide the `from`.

```php
try {
    // load() returns the ENTITY — call data_get() for the Generation record (throws on error).
    $generation = $client->Generation()->load(["from" => "example_from", "to" => "example_to"]);
    print_r($generation->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $intensitylists = $client->IntensityList()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = CarbonIntensitySDK::test([
    "entity" => ["intensity" => ["test01" => ["id" => "test01"]]],
]);

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$intensity = $client->Intensity()->list();
print_r(array_map(fn($item) => $item->data_get(), $intensity));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new CarbonIntensitySDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
CARBON_INTENSITY_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### CarbonIntensitySDK

```php
require_once 'carbonintensity_sdk.php';
$client = new CarbonIntensitySDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = CarbonIntensitySDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### CarbonIntensitySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Generation` | `($data): GenerationEntity` | Create a Generation entity instance. |
| `GenerationList` | `($data): GenerationListEntity` | Create a GenerationList entity instance. |
| `Intensity` | `($data): IntensityEntity` | Create an Intensity entity instance. |
| `IntensityFactor` | `($data): IntensityFactorEntity` | Create an IntensityFactor entity instance. |
| `IntensityList` | `($data): IntensityListEntity` | Create an IntensityList entity instance. |
| `Regional` | `($data): RegionalEntity` | Create a Regional entity instance. |
| `RegionalIntensity` | `($data): RegionalIntensityEntity` | Create a RegionalIntensity entity instance. |
| `RegionalIntensityList` | `($data): RegionalIntensityListEntity` | Create a RegionalIntensityList entity instance. |
| `Stat` | `($data): StatEntity` | Create a Stat entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Generation

| Field | Description |
| --- | --- |
| `data` |  |
| `from` |  |
| `generationmix` |  |
| `id` |  |
| `to` |  |

Operations: List, Load.

API path: `/generation`

#### GenerationList

| Field | Description |
| --- | --- |
| `from` |  |
| `generationmix` |  |
| `to` |  |

Operations: List.

API path: `/generation/{from}/pt24h`

#### Intensity

| Field | Description |
| --- | --- |
| `data` |  |
| `from` | Start datetime of the period |
| `id` |  |
| `intensity` |  |
| `to` | End datetime of the period |

Operations: List, Load.

API path: `/intensity`

#### IntensityFactor

| Field | Description |
| --- | --- |
| `Biomass` | Carbon intensity factor for biomass (gCO2/kWh) |
| `Coal` | Carbon intensity factor for coal (gCO2/kWh) |
| `DutchImports` | Carbon intensity factor for Dutch imports (gCO2/kWh) |
| `FrenchImports` | Carbon intensity factor for French imports (gCO2/kWh) |
| `GasCombinedCycle` | Carbon intensity factor for gas combined cycle (gCO2/kWh) |
| `GasOpenCycle` | Carbon intensity factor for gas open cycle (gCO2/kWh) |
| `Hydro` | Carbon intensity factor for hydro (gCO2/kWh) |
| `IrishImports` | Carbon intensity factor for Irish imports (gCO2/kWh) |
| `Nuclear` | Carbon intensity factor for nuclear (gCO2/kWh) |
| `Oil` | Carbon intensity factor for oil (gCO2/kWh) |
| `Other` | Carbon intensity factor for other (gCO2/kWh) |
| `PumpedStorage` | Carbon intensity factor for pumped storage (gCO2/kWh) |
| `Solar` | Carbon intensity factor for solar (gCO2/kWh) |
| `Wind` | Carbon intensity factor for wind (gCO2/kWh) |

Operations: List.

API path: `/intensity/factors`

#### IntensityList

| Field | Description |
| --- | --- |
| `data` |  |
| `from` | Start datetime of the period |
| `intensity` |  |
| `to` | End datetime of the period |

Operations: List, Load.

API path: `/intensity/{from}/fw24h`

#### Regional

| Field | Description |
| --- | --- |
| `data` |  |
| `dnoregion` | Distribution Network Operator region |
| `postcode` | Outward postcode |
| `regionid` | Region ID (1-17) |
| `shortname` | Short region name |

Operations: List.

API path: `/regional`

#### RegionalIntensity

| Field | Description |
| --- | --- |
| `data` |  |
| `dnoregion` | Distribution Network Operator region |
| `postcode` | Outward postcode |
| `regionid` | Region ID (1-17) |
| `shortname` | Short region name |

Operations: List, Load.

API path: `/regional/england`

#### RegionalIntensityList

| Field | Description |
| --- | --- |
| `data` |  |
| `dnoregion` | Distribution Network Operator region |
| `id` |  |
| `postcode` | Outward postcode |
| `regionid` | Region ID (1-17) |
| `shortname` | Short region name |

Operations: List, Load.

API path: `/regional/intensity/{from}/fw24h`

#### Stat

| Field | Description |
| --- | --- |
| `data` |  |
| `id` |  |

Operations: Load.

API path: `/intensity/stats/{from}/{to}/{block}`



## Entities


### Generation

Create an instance: `$generation = $client->Generation();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `from` | `string` |  |
| `generationmix` | `array` |  |
| `id` | `string` |  |
| `to` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Generation record (throws on error).
$generation = $client->Generation()->load(["from" => "from", "to" => "to"]);
```

#### Example: List

```php
// list() returns an array of Generation records (throws on error).
$generations = $client->Generation()->list();
```


### GenerationList

Create an instance: `$generation_list = $client->GenerationList();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | `string` |  |
| `generationmix` | `array` |  |
| `to` | `string` |  |

#### Example: List

```php
// list() returns an array of GenerationList records (throws on error).
$generation_lists = $client->GenerationList()->list();
```


### Intensity

Create an instance: `$intensity = $client->Intensity();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `from` | `string` | Start datetime of the period |
| `id` | `string` |  |
| `intensity` | `array` |  |
| `to` | `string` | End datetime of the period |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Intensity record (throws on error).
$intensity = $client->Intensity()->load(["id" => "intensity_id"]);
```

#### Example: List

```php
// list() returns an array of Intensity records (throws on error).
$intensitys = $client->Intensity()->list();
```


### IntensityFactor

Create an instance: `$intensity_factor = $client->IntensityFactor();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Biomass` | `int` | Carbon intensity factor for biomass (gCO2/kWh) |
| `Coal` | `int` | Carbon intensity factor for coal (gCO2/kWh) |
| `DutchImports` | `int` | Carbon intensity factor for Dutch imports (gCO2/kWh) |
| `FrenchImports` | `int` | Carbon intensity factor for French imports (gCO2/kWh) |
| `GasCombinedCycle` | `int` | Carbon intensity factor for gas combined cycle (gCO2/kWh) |
| `GasOpenCycle` | `int` | Carbon intensity factor for gas open cycle (gCO2/kWh) |
| `Hydro` | `int` | Carbon intensity factor for hydro (gCO2/kWh) |
| `IrishImports` | `int` | Carbon intensity factor for Irish imports (gCO2/kWh) |
| `Nuclear` | `int` | Carbon intensity factor for nuclear (gCO2/kWh) |
| `Oil` | `int` | Carbon intensity factor for oil (gCO2/kWh) |
| `Other` | `int` | Carbon intensity factor for other (gCO2/kWh) |
| `PumpedStorage` | `int` | Carbon intensity factor for pumped storage (gCO2/kWh) |
| `Solar` | `int` | Carbon intensity factor for solar (gCO2/kWh) |
| `Wind` | `int` | Carbon intensity factor for wind (gCO2/kWh) |

#### Example: List

```php
// list() returns an array of IntensityFactor records (throws on error).
$intensity_factors = $client->IntensityFactor()->list();
```


### IntensityList

Create an instance: `$intensity_list = $client->IntensityList();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `from` | `string` | Start datetime of the period |
| `intensity` | `array` |  |
| `to` | `string` | End datetime of the period |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the IntensityList record (throws on error).
$intensity_list = $client->IntensityList()->load(["date" => "date"]);
```

#### Example: List

```php
// list() returns an array of IntensityList records (throws on error).
$intensity_lists = $client->IntensityList()->list();
```


### Regional

Create an instance: `$regional = $client->Regional();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `dnoregion` | `string` | Distribution Network Operator region |
| `postcode` | `string` | Outward postcode |
| `regionid` | `int` | Region ID (1-17) |
| `shortname` | `string` | Short region name |

#### Example: List

```php
// list() returns an array of Regional records (throws on error).
$regionals = $client->Regional()->list();
```


### RegionalIntensity

Create an instance: `$regional_intensity = $client->RegionalIntensity();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `dnoregion` | `string` | Distribution Network Operator region |
| `postcode` | `string` | Outward postcode |
| `regionid` | `int` | Region ID (1-17) |
| `shortname` | `string` | Short region name |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the RegionalIntensity record (throws on error).
$regional_intensity = $client->RegionalIntensity()->load(["postcode" => "postcode"]);
```

#### Example: List

```php
// list() returns an array of RegionalIntensity records (throws on error).
$regional_intensitys = $client->RegionalIntensity()->list();
```


### RegionalIntensityList

Create an instance: `$regional_intensity_list = $client->RegionalIntensityList();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `dnoregion` | `string` | Distribution Network Operator region |
| `id` | `string` |  |
| `postcode` | `string` | Outward postcode |
| `regionid` | `int` | Region ID (1-17) |
| `shortname` | `string` | Short region name |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the RegionalIntensityList record (throws on error).
$regional_intensity_list = $client->RegionalIntensityList()->load(["from" => "from", "to" => "to"]);
```

#### Example: List

```php
// list() returns an array of RegionalIntensityList records (throws on error).
$regional_intensity_lists = $client->RegionalIntensityList()->list();
```


### Stat

Create an instance: `$stat = $client->Stat();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Stat record (throws on error).
$stat = $client->Stat()->load(["from" => "from", "to" => "to"]);
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── carbonintensity_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`carbonintensity_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$intensitylist = $client->IntensityList();
$intensitylist->list();

// $intensitylist->data_get() now returns the intensitylist data from the last list
// $intensitylist->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
