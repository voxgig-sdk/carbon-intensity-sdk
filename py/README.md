# CarbonIntensity Python SDK



The Python SDK for the CarbonIntensity API — an entity-oriented client following Pythonic conventions.

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

### 2. List generations

```python
try:
    result = client.generation.list()
    for item in result:
        d = item.data_get()
        print(d["id"], d["name"])
except Exception as err:
    print(f"list failed: {err}")
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
    print(result["err"])     # error value
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

result = client.generation.load({"id": "test01"})
# result contains mock response data
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
| `Intensity` | `(data) -> IntensityEntity` | Create a Intensity entity instance. |
| `IntensityFactor` | `(data) -> IntensityFactorEntity` | Create a IntensityFactor entity instance. |
| `IntensityList` | `(data) -> IntensityListEntity` | Create a IntensityList entity instance. |
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
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
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

Create an instance: `const generation = client.generation`

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
const generations = await client.generation.list()
```


### GenerationList

Create an instance: `const generation_list = client.generation_list`

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
const generation_lists = await client.generation_list.list()
```


### Intensity

Create an instance: `const intensity = client.intensity`

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
const intensity = await client.intensity.load({ id: 'intensity_id' })
```

#### Example: List

```ts
const intensitys = await client.intensity.list()
```


### IntensityFactor

Create an instance: `const intensity_factor = client.intensity_factor`

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
const intensity_factors = await client.intensity_factor.list()
```


### IntensityList

Create an instance: `const intensity_list = client.intensity_list`

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
const intensity_list = await client.intensity_list.load({ id: 'intensity_list_id' })
```

#### Example: List

```ts
const intensity_lists = await client.intensity_list.list()
```


### Regional

Create an instance: `const regional = client.regional`

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
const regionals = await client.regional.list()
```


### RegionalIntensity

Create an instance: `const regional_intensity = client.regional_intensity`

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
const regional_intensity = await client.regional_intensity.load({ id: 'regional_intensity_id' })
```

#### Example: List

```ts
const regional_intensitys = await client.regional_intensity.list()
```


### RegionalIntensityList

Create an instance: `const regional_intensity_list = client.regional_intensity_list`

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
const regional_intensity_list = await client.regional_intensity_list.load({ id: 'regional_intensity_list_id' })
```

#### Example: List

```ts
const regional_intensity_lists = await client.regional_intensity_list.list()
```


### Stat

Create an instance: `const stat = client.stat`

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
const stats = await client.stat.list()
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
error is returned to the caller as the second element in the return tuple.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
generation = client.generation
generation.load({"id": "example_id"})

# generation.data_get() now returns the loaded generation data
# generation.match_get() returns the last match criteria
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
