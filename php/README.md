# CarbonIntensity PHP SDK



The PHP SDK for the CarbonIntensity API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
composer require voxgig/carbon-intensity-sdk
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'carbonintensity_sdk.php';

$client = new CarbonIntensitySDK([
    "apikey" => getenv("CARBON-INTENSITY_APIKEY"),
]);
```

### 2. List generations

```php
[$result, $err] = $client->Generation()->list();
if ($err) { throw new \Exception($err); }

if (is_array($result)) {
    foreach ($result as $item) {
        $d = $item->data_get();
        echo $d["id"] . " " . $d["name"] . "\n";
    }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
if ($err) { throw new \Exception($err); }

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
}
```

### Prepare a request without sending it

```php
[$fetchdef, $err] = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);
if ($err) { throw new \Exception($err); }

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = CarbonIntensitySDK::test();

[$result, $err] = $client->CarbonIntensity()->load(["id" => "test01"]);
// $result contains mock response data
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
CARBON-INTENSITY_TEST_LIVE=TRUE
CARBON-INTENSITY_APIKEY=<your-key>
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
| `apikey` | `string` | API key for authentication. |
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
| `Intensity` | `($data): IntensityEntity` | Create a Intensity entity instance. |
| `IntensityFactor` | `($data): IntensityFactorEntity` | Create a IntensityFactor entity instance. |
| `IntensityList` | `($data): IntensityListEntity` | Create a IntensityList entity instance. |
| `Regional` | `($data): RegionalEntity` | Create a Regional entity instance. |
| `RegionalIntensity` | `($data): RegionalIntensityEntity` | Create a RegionalIntensity entity instance. |
| `RegionalIntensityList` | `($data): RegionalIntensityListEntity` | Create a RegionalIntensityList entity instance. |
| `Stat` | `($data): StatEntity` | Create a Stat entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return `[$result, $err]`. The first value is an
`array` with these keys:

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
| `from` |  |
| `generationmix` |  |
| `to` |  |

Operations: List.

API path: `/generation/{from}/{to}`

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
| `from` |  |
| `intensity` |  |
| `to` |  |

Operations: List, Load.

API path: `/intensity/date/{date}/{period}`

#### IntensityFactor

| Field | Description |
| --- | --- |
| `biomass` |  |
| `coal` |  |
| `dutch_import` |  |
| `french_import` |  |
| `gas__combined_cycle` |  |
| `gas__open_cycle` |  |
| `hydro` |  |
| `irish_import` |  |
| `nuclear` |  |
| `oil` |  |
| `other` |  |
| `pumped_storage` |  |
| `solar` |  |
| `wind` |  |

Operations: List.

API path: `/intensity/factors`

#### IntensityList

| Field | Description |
| --- | --- |
| `data` |  |
| `from` |  |
| `intensity` |  |
| `to` |  |

Operations: List, Load.

API path: `/intensity/{from}/fw24h`

#### Regional

| Field | Description |
| --- | --- |
| `data` |  |
| `dnoregion` |  |
| `postcode` |  |
| `regionid` |  |
| `shortname` |  |

Operations: List.

API path: `/regional`

#### RegionalIntensity

| Field | Description |
| --- | --- |
| `data` |  |
| `dnoregion` |  |
| `postcode` |  |
| `regionid` |  |
| `shortname` |  |

Operations: List, Load.

API path: `/regional/england`

#### RegionalIntensityList

| Field | Description |
| --- | --- |
| `data` |  |
| `dnoregion` |  |
| `postcode` |  |
| `regionid` |  |
| `shortname` |  |

Operations: List, Load.

API path: `/regional/intensity/{from}/{to}`

#### Stat

| Field | Description |
| --- | --- |
| `from` |  |
| `intensity` |  |
| `to` |  |

Operations: List.

API path: `/intensity/stats/{from}/{to}/{block}`



## Entities


### Generation

Create an instance: `const generation = client.Generation()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | ``$STRING`` |  |
| `generationmix` | ``$ARRAY`` |  |
| `to` | ``$STRING`` |  |

#### Example: List

```ts
const generations = await client.Generation().list()
```


### GenerationList

Create an instance: `const generation_list = client.GenerationList()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | ``$STRING`` |  |
| `generationmix` | ``$ARRAY`` |  |
| `to` | ``$STRING`` |  |

#### Example: List

```ts
const generation_lists = await client.GenerationList().list()
```


### Intensity

Create an instance: `const intensity = client.Intensity()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$ARRAY`` |  |
| `from` | ``$STRING`` |  |
| `intensity` | ``$OBJECT`` |  |
| `to` | ``$STRING`` |  |

#### Example: Load

```ts
const intensity = await client.Intensity().load({ id: 'intensity_id' })
```

#### Example: List

```ts
const intensitys = await client.Intensity().list()
```


### IntensityFactor

Create an instance: `const intensity_factor = client.IntensityFactor()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `biomass` | ``$INTEGER`` |  |
| `coal` | ``$INTEGER`` |  |
| `dutch_import` | ``$INTEGER`` |  |
| `french_import` | ``$INTEGER`` |  |
| `gas__combined_cycle` | ``$INTEGER`` |  |
| `gas__open_cycle` | ``$INTEGER`` |  |
| `hydro` | ``$INTEGER`` |  |
| `irish_import` | ``$INTEGER`` |  |
| `nuclear` | ``$INTEGER`` |  |
| `oil` | ``$INTEGER`` |  |
| `other` | ``$INTEGER`` |  |
| `pumped_storage` | ``$INTEGER`` |  |
| `solar` | ``$INTEGER`` |  |
| `wind` | ``$INTEGER`` |  |

#### Example: List

```ts
const intensity_factors = await client.IntensityFactor().list()
```


### IntensityList

Create an instance: `const intensity_list = client.IntensityList()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$ARRAY`` |  |
| `from` | ``$STRING`` |  |
| `intensity` | ``$OBJECT`` |  |
| `to` | ``$STRING`` |  |

#### Example: Load

```ts
const intensity_list = await client.IntensityList().load({ id: 'intensity_list_id' })
```

#### Example: List

```ts
const intensity_lists = await client.IntensityList().list()
```


### Regional

Create an instance: `const regional = client.Regional()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$ARRAY`` |  |
| `dnoregion` | ``$STRING`` |  |
| `postcode` | ``$STRING`` |  |
| `regionid` | ``$INTEGER`` |  |
| `shortname` | ``$STRING`` |  |

#### Example: List

```ts
const regionals = await client.Regional().list()
```


### RegionalIntensity

Create an instance: `const regional_intensity = client.RegionalIntensity()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$ARRAY`` |  |
| `dnoregion` | ``$STRING`` |  |
| `postcode` | ``$STRING`` |  |
| `regionid` | ``$INTEGER`` |  |
| `shortname` | ``$STRING`` |  |

#### Example: Load

```ts
const regional_intensity = await client.RegionalIntensity().load({ id: 'regional_intensity_id' })
```

#### Example: List

```ts
const regional_intensitys = await client.RegionalIntensity().list()
```


### RegionalIntensityList

Create an instance: `const regional_intensity_list = client.RegionalIntensityList()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$ARRAY`` |  |
| `dnoregion` | ``$STRING`` |  |
| `postcode` | ``$STRING`` |  |
| `regionid` | ``$INTEGER`` |  |
| `shortname` | ``$STRING`` |  |

#### Example: Load

```ts
const regional_intensity_list = await client.RegionalIntensityList().load({ id: 'regional_intensity_list_id' })
```

#### Example: List

```ts
const regional_intensity_lists = await client.RegionalIntensityList().list()
```


### Stat

Create an instance: `const stat = client.Stat()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | ``$STRING`` |  |
| `intensity` | ``$OBJECT`` |  |
| `to` | ``$STRING`` |  |

#### Example: List

```ts
const stats = await client.Stat().list()
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$moon = $client->Moon();
[$result, $err] = $moon->load(["planet_id" => "earth", "id" => "luna"]);

// $moon->dataGet() now returns the loaded moon data
// $moon->matchGet() returns the last match criteria
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
