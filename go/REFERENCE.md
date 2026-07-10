# CarbonIntensity Golang SDK Reference

Complete API reference for the CarbonIntensity Golang SDK.


## CarbonIntensitySDK

### Constructor

```go
func NewCarbonIntensitySDK(options map[string]any) *CarbonIntensitySDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *CarbonIntensitySDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *CarbonIntensitySDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Generation(data map[string]any) CarbonIntensityEntity`

Create a new `Generation` entity instance. Pass `nil` for no initial data.

#### `GenerationList(data map[string]any) CarbonIntensityEntity`

Create a new `GenerationList` entity instance. Pass `nil` for no initial data.

#### `Intensity(data map[string]any) CarbonIntensityEntity`

Create a new `Intensity` entity instance. Pass `nil` for no initial data.

#### `IntensityFactor(data map[string]any) CarbonIntensityEntity`

Create a new `IntensityFactor` entity instance. Pass `nil` for no initial data.

#### `IntensityList(data map[string]any) CarbonIntensityEntity`

Create a new `IntensityList` entity instance. Pass `nil` for no initial data.

#### `Regional(data map[string]any) CarbonIntensityEntity`

Create a new `Regional` entity instance. Pass `nil` for no initial data.

#### `RegionalIntensity(data map[string]any) CarbonIntensityEntity`

Create a new `RegionalIntensity` entity instance. Pass `nil` for no initial data.

#### `RegionalIntensityList(data map[string]any) CarbonIntensityEntity`

Create a new `RegionalIntensityList` entity instance. Pass `nil` for no initial data.

#### `Stat(data map[string]any) CarbonIntensityEntity`

Create a new `Stat` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## GenerationEntity

```go
generation := client.Generation(nil)
fmt.Println(generation.GetName()) // "generation"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `string` | No |  |
| `generationmix` | `[]any` | No |  |
| `to` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Generation(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GenerationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GenerationListEntity

```go
generationList := client.GenerationList(nil)
fmt.Println(generationList.GetName()) // "generation_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `string` | No |  |
| `generationmix` | `[]any` | No |  |
| `to` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.GenerationList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GenerationListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## IntensityEntity

```go
intensity := client.Intensity(nil)
fmt.Println(intensity.GetName()) // "intensity"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `[]any` | No |  |
| `from` | `string` | No |  |
| `intensity` | `map[string]any` | No |  |
| `to` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Intensity(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Intensity(nil).Load(map[string]any{"id": "intensity_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IntensityEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## IntensityFactorEntity

```go
intensityFactor := client.IntensityFactor(nil)
fmt.Println(intensityFactor.GetName()) // "intensity_factor"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `biomass` | `int` | No |  |
| `coal` | `int` | No |  |
| `dutch_import` | `int` | No |  |
| `french_import` | `int` | No |  |
| `gas__combined_cycle` | `int` | No |  |
| `gas__open_cycle` | `int` | No |  |
| `hydro` | `int` | No |  |
| `irish_import` | `int` | No |  |
| `nuclear` | `int` | No |  |
| `oil` | `int` | No |  |
| `other` | `int` | No |  |
| `pumped_storage` | `int` | No |  |
| `solar` | `int` | No |  |
| `wind` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.IntensityFactor(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IntensityFactorEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## IntensityListEntity

```go
intensityList := client.IntensityList(nil)
fmt.Println(intensityList.GetName()) // "intensity_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `[]any` | No |  |
| `from` | `string` | No |  |
| `intensity` | `map[string]any` | No |  |
| `to` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.IntensityList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.IntensityList(nil).Load(map[string]any{"date": "date"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IntensityListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RegionalEntity

```go
regional := client.Regional(nil)
fmt.Println(regional.GetName()) // "regional"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `[]any` | No |  |
| `dnoregion` | `string` | No |  |
| `postcode` | `string` | No |  |
| `regionid` | `int` | No |  |
| `shortname` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Regional(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RegionalEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RegionalIntensityEntity

```go
regionalIntensity := client.RegionalIntensity(nil)
fmt.Println(regionalIntensity.GetName()) // "regional_intensity"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `[]any` | No |  |
| `dnoregion` | `string` | No |  |
| `postcode` | `string` | No |  |
| `regionid` | `int` | No |  |
| `shortname` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.RegionalIntensity(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.RegionalIntensity(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RegionalIntensityEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RegionalIntensityListEntity

```go
regionalIntensityList := client.RegionalIntensityList(nil)
fmt.Println(regionalIntensityList.GetName()) // "regional_intensity_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `[]any` | No |  |
| `dnoregion` | `string` | No |  |
| `postcode` | `string` | No |  |
| `regionid` | `int` | No |  |
| `shortname` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.RegionalIntensityList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.RegionalIntensityList(nil).Load(map[string]any{"intensity_id": "intensity_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RegionalIntensityListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## StatEntity

```go
stat := client.Stat(nil)
fmt.Println(stat.GetName()) // "stat"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `string` | No |  |
| `intensity` | `map[string]any` | No |  |
| `to` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Stat(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StatEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewCarbonIntensitySDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

