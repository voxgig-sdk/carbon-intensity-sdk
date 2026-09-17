# CarbonIntensity Python SDK



The Python SDK for the CarbonIntensity API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Generation()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/carbon-intensity-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from carbonintensity_sdk import CarbonIntensitySDK

client = CarbonIntensitySDK()
```

### 2. List generation records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    generations = client.Generation().list()
    for generation in generations:
        print(generation)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a generation

Generation is nested under from, so provide the `from`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    generation = client.Generation().load({"from": "example_from", "to": "example_to"})
    print(generation)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    intensitylists = client.IntensityList().list()
    print(intensitylists)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = CarbonIntensitySDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
intensitylist = client.IntensityList().list()
# intensitylist contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = CarbonIntensitySDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### CarbonIntensitySDK

```python
from carbonintensity_sdk import CarbonIntensitySDK

client = CarbonIntensitySDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = CarbonIntensitySDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### CarbonIntensitySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `generation = client.Generation()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `list` |  |
| `from` | `str` |  |
| `generationmix` | `list` |  |
| `id` | `str` |  |
| `to` | `str` |  |

#### Example: Load

```python
generation = client.Generation().load({"from": "from", "to": "to"})
```

#### Example: List

```python
generations = client.Generation().list()
```


### GenerationList

Create an instance: `generation_list = client.GenerationList()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | `str` |  |
| `generationmix` | `list` |  |
| `to` | `str` |  |

#### Example: List

```python
generation_lists = client.GenerationList().list({"from": "example"})
```


### Intensity

Create an instance: `intensity = client.Intensity()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `list` |  |
| `from` | `str` | Start datetime of the period |
| `id` | `str` |  |
| `intensity` | `dict` |  |
| `to` | `str` | End datetime of the period |

#### Example: Load

```python
intensity = client.Intensity().load({"id": "intensity_id"})
```

#### Example: List

```python
intensitys = client.Intensity().list()
```


### IntensityFactor

Create an instance: `intensity_factor = client.IntensityFactor()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

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

```python
intensity_factors = client.IntensityFactor().list()
```


### IntensityList

Create an instance: `intensity_list = client.IntensityList()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `list` |  |
| `from` | `str` | Start datetime of the period |
| `intensity` | `dict` |  |
| `to` | `str` | End datetime of the period |

#### Example: Load

```python
intensity_list = client.IntensityList().load({"date": "date"})
```

#### Example: List

```python
intensity_lists = client.IntensityList().list()
```


### Regional

Create an instance: `regional = client.Regional()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `list` |  |
| `dnoregion` | `str` | Distribution Network Operator region |
| `postcode` | `str` | Outward postcode |
| `regionid` | `int` | Region ID (1-17) |
| `shortname` | `str` | Short region name |

#### Example: List

```python
regionals = client.Regional().list()
```


### RegionalIntensity

Create an instance: `regional_intensity = client.RegionalIntensity()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `list` |  |
| `dnoregion` | `str` | Distribution Network Operator region |
| `postcode` | `str` | Outward postcode |
| `regionid` | `int` | Region ID (1-17) |
| `shortname` | `str` | Short region name |

#### Example: Load

```python
regional_intensity = client.RegionalIntensity().load({"postcode": "postcode"})
```

#### Example: List

```python
regional_intensitys = client.RegionalIntensity().list()
```


### RegionalIntensityList

Create an instance: `regional_intensity_list = client.RegionalIntensityList()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `list` |  |
| `dnoregion` | `str` | Distribution Network Operator region |
| `id` | `str` |  |
| `postcode` | `str` | Outward postcode |
| `regionid` | `int` | Region ID (1-17) |
| `shortname` | `str` | Short region name |

#### Example: Load

```python
regional_intensity_list = client.RegionalIntensityList().load({"from": "from", "to": "to"})
```

#### Example: List

```python
regional_intensity_lists = client.RegionalIntensityList().list({"from": "example"})
```


### Stat

Create an instance: `stat = client.Stat()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `list` |  |
| `id` | `str` |  |

#### Example: Load

```python
stat = client.Stat().load({"from": "from", "to": "to"})
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── carbonintensity_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`carbonintensity_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
intensitylist = client.IntensityList()
intensitylist.list()

# intensitylist.data_get() now returns the intensitylist data from the last list
# intensitylist.match_get() returns the last match criteria
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
