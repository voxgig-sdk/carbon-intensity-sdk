# CarbonIntensity Ruby SDK



The Ruby SDK for the CarbonIntensity API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Generation` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/carbon-intensity-sdk/releases](https://github.com/voxgig-sdk/carbon-intensity-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "CarbonIntensity_sdk"

client = CarbonIntensitySDK.new
```

### 2. List generation records

```ruby
begin
  # list returns an Array of Generation records — iterate directly.
  generations = client.Generation.list
  generations.each do |item|
    puts "#{item["from"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  generations = client.Generation.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = CarbonIntensitySDK.test

# Entity ops return the bare mock record (raises on error).
generation = client.Generation.list()
puts generation
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = CarbonIntensitySDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CARBON_INTENSITY_TEST_LIVE=TRUE
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### CarbonIntensitySDK

```ruby
require_relative "CarbonIntensity_sdk"
client = CarbonIntensitySDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = CarbonIntensitySDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CarbonIntensitySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Generation` | `(data) -> GenerationEntity` | Create a Generation entity instance. |
| `GenerationList` | `(data) -> GenerationListEntity` | Create a GenerationList entity instance. |
| `Intensity` | `(data) -> IntensityEntity` | Create an Intensity entity instance. |
| `IntensityFactor` | `(data) -> IntensityFactorEntity` | Create an IntensityFactor entity instance. |
| `IntensityList` | `(data) -> IntensityListEntity` | Create an IntensityList entity instance. |
| `Regional` | `(data) -> RegionalEntity` | Create a Regional entity instance. |
| `RegionalIntensity` | `(data) -> RegionalIntensityEntity` | Create a RegionalIntensity entity instance. |
| `RegionalIntensityList` | `(data) -> RegionalIntensityListEntity` | Create a RegionalIntensityList entity instance. |
| `Stat` | `(data) -> StatEntity` | Create a Stat entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `CarbonIntensityError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `generation = client.Generation`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | `String` |  |
| `generationmix` | `Array` |  |
| `to` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Generation records (raises on error).
generations = client.Generation.list
```


### GenerationList

Create an instance: `generation_list = client.GenerationList`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | `String` |  |
| `generationmix` | `Array` |  |
| `to` | `String` |  |

#### Example: List

```ruby
# list returns an Array of GenerationList records (raises on error).
generation_lists = client.GenerationList.list
```


### Intensity

Create an instance: `intensity = client.Intensity`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Array` |  |
| `from` | `String` |  |
| `intensity` | `Hash` |  |
| `to` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Intensity record (raises on error).
intensity = client.Intensity.load({ "id" => "intensity_id" })
```

#### Example: List

```ruby
# list returns an Array of Intensity records (raises on error).
intensitys = client.Intensity.list
```


### IntensityFactor

Create an instance: `intensity_factor = client.IntensityFactor`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `biomass` | `Integer` |  |
| `coal` | `Integer` |  |
| `dutch_import` | `Integer` |  |
| `french_import` | `Integer` |  |
| `gas__combined_cycle` | `Integer` |  |
| `gas__open_cycle` | `Integer` |  |
| `hydro` | `Integer` |  |
| `irish_import` | `Integer` |  |
| `nuclear` | `Integer` |  |
| `oil` | `Integer` |  |
| `other` | `Integer` |  |
| `pumped_storage` | `Integer` |  |
| `solar` | `Integer` |  |
| `wind` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of IntensityFactor records (raises on error).
intensity_factors = client.IntensityFactor.list
```


### IntensityList

Create an instance: `intensity_list = client.IntensityList`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Array` |  |
| `from` | `String` |  |
| `intensity` | `Hash` |  |
| `to` | `String` |  |

#### Example: Load

```ruby
# load returns the bare IntensityList record (raises on error).
intensity_list = client.IntensityList.load()
```

#### Example: List

```ruby
# list returns an Array of IntensityList records (raises on error).
intensity_lists = client.IntensityList.list
```


### Regional

Create an instance: `regional = client.Regional`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Array` |  |
| `dnoregion` | `String` |  |
| `postcode` | `String` |  |
| `regionid` | `Integer` |  |
| `shortname` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Regional records (raises on error).
regionals = client.Regional.list
```


### RegionalIntensity

Create an instance: `regional_intensity = client.RegionalIntensity`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Array` |  |
| `dnoregion` | `String` |  |
| `postcode` | `String` |  |
| `regionid` | `Integer` |  |
| `shortname` | `String` |  |

#### Example: Load

```ruby
# load returns the bare RegionalIntensity record (raises on error).
regional_intensity = client.RegionalIntensity.load()
```

#### Example: List

```ruby
# list returns an Array of RegionalIntensity records (raises on error).
regional_intensitys = client.RegionalIntensity.list
```


### RegionalIntensityList

Create an instance: `regional_intensity_list = client.RegionalIntensityList`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Array` |  |
| `dnoregion` | `String` |  |
| `postcode` | `String` |  |
| `regionid` | `Integer` |  |
| `shortname` | `String` |  |

#### Example: Load

```ruby
# load returns the bare RegionalIntensityList record (raises on error).
regional_intensity_list = client.RegionalIntensityList.load()
```

#### Example: List

```ruby
# list returns an Array of RegionalIntensityList records (raises on error).
regional_intensity_lists = client.RegionalIntensityList.list
```


### Stat

Create an instance: `stat = client.Stat`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | `String` |  |
| `intensity` | `Hash` |  |
| `to` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Stat records (raises on error).
stats = client.Stat.list
```


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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── CarbonIntensity_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`CarbonIntensity_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
generation = client.Generation
generation.list()

# generation.data_get now returns the generation data from the last list
# generation.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
