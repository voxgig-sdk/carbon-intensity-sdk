# CarbonIntensity Golang SDK

The Golang SDK for the CarbonIntensity API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/carbon-intensity-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/carbon-intensity-sdk/go=../path/to/github.com/voxgig-sdk/carbon-intensity-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"

    sdk "github.com/voxgig-sdk/carbon-intensity-sdk/go"
    "github.com/voxgig-sdk/carbon-intensity-sdk/go/core"
)

func main() {
    client := sdk.NewCarbonIntensitySDK(map[string]any{})
```

### 2. List generations

```go
    result, err := client.Generation(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewCarbonIntensitySDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CARBON-INTENSITY_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewCarbonIntensitySDK

```go
func NewCarbonIntensitySDK(options map[string]any) *CarbonIntensitySDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *CarbonIntensitySDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CarbonIntensitySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Generation` | `(data map[string]any) CarbonIntensityEntity` | Create a Generation entity instance. |
| `GenerationList` | `(data map[string]any) CarbonIntensityEntity` | Create a GenerationList entity instance. |
| `Intensity` | `(data map[string]any) CarbonIntensityEntity` | Create a Intensity entity instance. |
| `IntensityFactor` | `(data map[string]any) CarbonIntensityEntity` | Create a IntensityFactor entity instance. |
| `IntensityList` | `(data map[string]any) CarbonIntensityEntity` | Create a IntensityList entity instance. |
| `Regional` | `(data map[string]any) CarbonIntensityEntity` | Create a Regional entity instance. |
| `RegionalIntensity` | `(data map[string]any) CarbonIntensityEntity` | Create a RegionalIntensity entity instance. |
| `RegionalIntensityList` | `(data map[string]any) CarbonIntensityEntity` | Create a RegionalIntensityList entity instance. |
| `Stat` | `(data map[string]any) CarbonIntensityEntity` | Create a Stat entity instance. |

### Entity interface (CarbonIntensityEntity)

All entities implement the `CarbonIntensityEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### Generation

| Field | Description |
| --- | --- |
| `"from"` |  |
| `"generationmix"` |  |
| `"to"` |  |

Operations: List.

API path: `/generation/{from}/{to}`

#### GenerationList

| Field | Description |
| --- | --- |
| `"from"` |  |
| `"generationmix"` |  |
| `"to"` |  |

Operations: List.

API path: `/generation/{from}/pt24h`

#### Intensity

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"from"` |  |
| `"intensity"` |  |
| `"to"` |  |

Operations: List, Load.

API path: `/intensity/date/{date}/{period}`

#### IntensityFactor

| Field | Description |
| --- | --- |
| `"biomass"` |  |
| `"coal"` |  |
| `"dutch_import"` |  |
| `"french_import"` |  |
| `"gas__combined_cycle"` |  |
| `"gas__open_cycle"` |  |
| `"hydro"` |  |
| `"irish_import"` |  |
| `"nuclear"` |  |
| `"oil"` |  |
| `"other"` |  |
| `"pumped_storage"` |  |
| `"solar"` |  |
| `"wind"` |  |

Operations: List.

API path: `/intensity/factors`

#### IntensityList

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"from"` |  |
| `"intensity"` |  |
| `"to"` |  |

Operations: List, Load.

API path: `/intensity/{from}/fw24h`

#### Regional

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"dnoregion"` |  |
| `"postcode"` |  |
| `"regionid"` |  |
| `"shortname"` |  |

Operations: List.

API path: `/regional`

#### RegionalIntensity

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"dnoregion"` |  |
| `"postcode"` |  |
| `"regionid"` |  |
| `"shortname"` |  |

Operations: List, Load.

API path: `/regional/england`

#### RegionalIntensityList

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"dnoregion"` |  |
| `"postcode"` |  |
| `"regionid"` |  |
| `"shortname"` |  |

Operations: List, Load.

API path: `/regional/intensity/{from}/{to}`

#### Stat

| Field | Description |
| --- | --- |
| `"from"` |  |
| `"intensity"` |  |
| `"to"` |  |

Operations: List.

API path: `/intensity/stats/{from}/{to}/{block}`



## Entities


### Generation

Create an instance: `generation := client.Generation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | ``$STRING`` |  |
| `generationmix` | ``$ARRAY`` |  |
| `to` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.Generation(nil).List(nil, nil)
```


### GenerationList

Create an instance: `generation_list := client.GenerationList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | ``$STRING`` |  |
| `generationmix` | ``$ARRAY`` |  |
| `to` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.GenerationList(nil).List(nil, nil)
```


### Intensity

Create an instance: `intensity := client.Intensity(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$ARRAY`` |  |
| `from` | ``$STRING`` |  |
| `intensity` | ``$OBJECT`` |  |
| `to` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Intensity(nil).Load(map[string]any{"id": "intensity_id"}, nil)
```

#### Example: List

```go
results, err := client.Intensity(nil).List(nil, nil)
```


### IntensityFactor

Create an instance: `intensity_factor := client.IntensityFactor(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
results, err := client.IntensityFactor(nil).List(nil, nil)
```


### IntensityList

Create an instance: `intensity_list := client.IntensityList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$ARRAY`` |  |
| `from` | ``$STRING`` |  |
| `intensity` | ``$OBJECT`` |  |
| `to` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.IntensityList(nil).Load(map[string]any{"id": "intensity_list_id"}, nil)
```

#### Example: List

```go
results, err := client.IntensityList(nil).List(nil, nil)
```


### Regional

Create an instance: `regional := client.Regional(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$ARRAY`` |  |
| `dnoregion` | ``$STRING`` |  |
| `postcode` | ``$STRING`` |  |
| `regionid` | ``$INTEGER`` |  |
| `shortname` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.Regional(nil).List(nil, nil)
```


### RegionalIntensity

Create an instance: `regional_intensity := client.RegionalIntensity(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$ARRAY`` |  |
| `dnoregion` | ``$STRING`` |  |
| `postcode` | ``$STRING`` |  |
| `regionid` | ``$INTEGER`` |  |
| `shortname` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.RegionalIntensity(nil).Load(map[string]any{"id": "regional_intensity_id"}, nil)
```

#### Example: List

```go
results, err := client.RegionalIntensity(nil).List(nil, nil)
```


### RegionalIntensityList

Create an instance: `regional_intensity_list := client.RegionalIntensityList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$ARRAY`` |  |
| `dnoregion` | ``$STRING`` |  |
| `postcode` | ``$STRING`` |  |
| `regionid` | ``$INTEGER`` |  |
| `shortname` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.RegionalIntensityList(nil).Load(map[string]any{"id": "regional_intensity_list_id"}, nil)
```

#### Example: List

```go
results, err := client.RegionalIntensityList(nil).List(nil, nil)
```


### Stat

Create an instance: `stat := client.Stat(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | ``$STRING`` |  |
| `intensity` | ``$OBJECT`` |  |
| `to` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.Stat(nil).List(nil, nil)
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/carbon-intensity-sdk/go/
├── carbon-intensity.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/carbon-intensity-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
