# CarbonIntensity Golang SDK



The Golang SDK for the CarbonIntensity API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Generation(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/carbon-intensity-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/carbon-intensity-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/carbon-intensity-sdk/go=../carbon-intensity-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/carbon-intensity-sdk/go"
)

func main() {
    client := sdk.New()

    // List generation records — the value is the array of records itself.
    generations, err := client.Generation(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range generations.([]any) {
        fmt.Println(item)
    }

    // Load a single generation — the value is the loaded record.
    generation, err := client.Generation(nil).Load(map[string]any{"from": "example_from", "to": "example_to"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(generation)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
intensitylists, err := client.IntensityList(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = intensitylists
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
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
client := sdk.Test()

intensityList, err := client.IntensityList(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(intensityList) // the returned mock data
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
CARBON_INTENSITY_TEST_LIVE=TRUE
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
| `Intensity` | `(data map[string]any) CarbonIntensityEntity` | Create an Intensity entity instance. |
| `IntensityFactor` | `(data map[string]any) CarbonIntensityEntity` | Create an IntensityFactor entity instance. |
| `IntensityList` | `(data map[string]any) CarbonIntensityEntity` | Create an IntensityList entity instance. |
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
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    generation, err := client.Generation(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // generation is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Generation

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"from"` |  |
| `"generationmix"` |  |
| `"id"` |  |
| `"to"` |  |

Operations: List, Load.

API path: `/generation`

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
| `"from"` | Start datetime of the period |
| `"id"` |  |
| `"intensity"` |  |
| `"to"` | End datetime of the period |

Operations: List, Load.

API path: `/intensity`

#### IntensityFactor

| Field | Description |
| --- | --- |
| `"Biomass"` | Carbon intensity factor for biomass (gCO2/kWh) |
| `"Coal"` | Carbon intensity factor for coal (gCO2/kWh) |
| `"DutchImports"` | Carbon intensity factor for Dutch imports (gCO2/kWh) |
| `"FrenchImports"` | Carbon intensity factor for French imports (gCO2/kWh) |
| `"GasCombinedCycle"` | Carbon intensity factor for gas combined cycle (gCO2/kWh) |
| `"GasOpenCycle"` | Carbon intensity factor for gas open cycle (gCO2/kWh) |
| `"Hydro"` | Carbon intensity factor for hydro (gCO2/kWh) |
| `"IrishImports"` | Carbon intensity factor for Irish imports (gCO2/kWh) |
| `"Nuclear"` | Carbon intensity factor for nuclear (gCO2/kWh) |
| `"Oil"` | Carbon intensity factor for oil (gCO2/kWh) |
| `"Other"` | Carbon intensity factor for other (gCO2/kWh) |
| `"PumpedStorage"` | Carbon intensity factor for pumped storage (gCO2/kWh) |
| `"Solar"` | Carbon intensity factor for solar (gCO2/kWh) |
| `"Wind"` | Carbon intensity factor for wind (gCO2/kWh) |

Operations: List.

API path: `/intensity/factors`

#### IntensityList

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"from"` | Start datetime of the period |
| `"intensity"` |  |
| `"to"` | End datetime of the period |

Operations: List, Load.

API path: `/intensity/{from}/fw24h`

#### Regional

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"dnoregion"` | Distribution Network Operator region |
| `"postcode"` | Outward postcode |
| `"regionid"` | Region ID (1-17) |
| `"shortname"` | Short region name |

Operations: List.

API path: `/regional`

#### RegionalIntensity

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"dnoregion"` | Distribution Network Operator region |
| `"postcode"` | Outward postcode |
| `"regionid"` | Region ID (1-17) |
| `"shortname"` | Short region name |

Operations: List, Load.

API path: `/regional/england`

#### RegionalIntensityList

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"dnoregion"` | Distribution Network Operator region |
| `"id"` |  |
| `"postcode"` | Outward postcode |
| `"regionid"` | Region ID (1-17) |
| `"shortname"` | Short region name |

Operations: List, Load.

API path: `/regional/intensity/{from}/fw24h`

#### Stat

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"id"` |  |

Operations: Load.

API path: `/intensity/stats/{from}/{to}/{block}`



## Entities


### Generation

Create an instance: `generation := client.Generation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `[]any` |  |
| `from` | `string` |  |
| `generationmix` | `[]any` |  |
| `id` | `string` |  |
| `to` | `string` |  |

#### Example: Load

```go
generation, err := client.Generation(nil).Load(map[string]any{"from": "from", "to": "to"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(generation) // the loaded record
```

#### Example: List

```go
generations, err := client.Generation(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(generations) // the array of records
```


### GenerationList

Create an instance: `generationList := client.GenerationList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | `string` |  |
| `generationmix` | `[]any` |  |
| `to` | `string` |  |

#### Example: List

```go
generationLists, err := client.GenerationList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(generationLists) // the array of records
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
| `data` | `[]any` |  |
| `from` | `string` | Start datetime of the period |
| `id` | `string` |  |
| `intensity` | `map[string]any` |  |
| `to` | `string` | End datetime of the period |

#### Example: Load

```go
intensity, err := client.Intensity(nil).Load(map[string]any{"id": "intensity_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(intensity) // the loaded record
```

#### Example: List

```go
intensitys, err := client.Intensity(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(intensitys) // the array of records
```


### IntensityFactor

Create an instance: `intensityFactor := client.IntensityFactor(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
intensityFactors, err := client.IntensityFactor(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(intensityFactors) // the array of records
```


### IntensityList

Create an instance: `intensityList := client.IntensityList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `[]any` |  |
| `from` | `string` | Start datetime of the period |
| `intensity` | `map[string]any` |  |
| `to` | `string` | End datetime of the period |

#### Example: Load

```go
intensityList, err := client.IntensityList(nil).Load(map[string]any{"date": "date"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(intensityList) // the loaded record
```

#### Example: List

```go
intensityLists, err := client.IntensityList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(intensityLists) // the array of records
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
| `data` | `[]any` |  |
| `dnoregion` | `string` | Distribution Network Operator region |
| `postcode` | `string` | Outward postcode |
| `regionid` | `int` | Region ID (1-17) |
| `shortname` | `string` | Short region name |

#### Example: List

```go
regionals, err := client.Regional(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(regionals) // the array of records
```


### RegionalIntensity

Create an instance: `regionalIntensity := client.RegionalIntensity(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `[]any` |  |
| `dnoregion` | `string` | Distribution Network Operator region |
| `postcode` | `string` | Outward postcode |
| `regionid` | `int` | Region ID (1-17) |
| `shortname` | `string` | Short region name |

#### Example: Load

```go
regionalIntensity, err := client.RegionalIntensity(nil).Load(map[string]any{"postcode": "postcode"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(regionalIntensity) // the loaded record
```

#### Example: List

```go
regionalIntensitys, err := client.RegionalIntensity(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(regionalIntensitys) // the array of records
```


### RegionalIntensityList

Create an instance: `regionalIntensityList := client.RegionalIntensityList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `[]any` |  |
| `dnoregion` | `string` | Distribution Network Operator region |
| `id` | `string` |  |
| `postcode` | `string` | Outward postcode |
| `regionid` | `int` | Region ID (1-17) |
| `shortname` | `string` | Short region name |

#### Example: Load

```go
regionalIntensityList, err := client.RegionalIntensityList(nil).Load(map[string]any{"from": "from", "to": "to"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(regionalIntensityList) // the loaded record
```

#### Example: List

```go
regionalIntensityLists, err := client.RegionalIntensityList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(regionalIntensityLists) // the array of records
```


### Stat

Create an instance: `stat := client.Stat(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `[]any` |  |
| `id` | `string` |  |

#### Example: Load

```go
stat, err := client.Stat(nil).Load(map[string]any{"from": "from", "to": "to"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(stat) // the loaded record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

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

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
intensitylist := client.IntensityList(nil)
intensitylist.List(nil, nil)

// intensitylist.Data() now returns the intensitylist data from the last list
// intensitylist.Match() returns the last match criteria
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
