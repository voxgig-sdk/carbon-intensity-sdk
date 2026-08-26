# CarbonIntensity Ruby SDK Reference

Complete API reference for the CarbonIntensity Ruby SDK.


## CarbonIntensitySDK

### Constructor

```ruby
require_relative 'CarbonIntensity_sdk'

client = CarbonIntensitySDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CarbonIntensitySDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = CarbonIntensitySDK.test
```


### Instance Methods

#### `Generation(data = nil)`

Create a new `Generation` entity instance. Pass `nil` for no initial data.

#### `GenerationList(data = nil)`

Create a new `GenerationList` entity instance. Pass `nil` for no initial data.

#### `Intensity(data = nil)`

Create a new `Intensity` entity instance. Pass `nil` for no initial data.

#### `IntensityFactor(data = nil)`

Create a new `IntensityFactor` entity instance. Pass `nil` for no initial data.

#### `IntensityList(data = nil)`

Create a new `IntensityList` entity instance. Pass `nil` for no initial data.

#### `Regional(data = nil)`

Create a new `Regional` entity instance. Pass `nil` for no initial data.

#### `RegionalIntensity(data = nil)`

Create a new `RegionalIntensity` entity instance. Pass `nil` for no initial data.

#### `RegionalIntensityList(data = nil)`

Create a new `RegionalIntensityList` entity instance. Pass `nil` for no initial data.

#### `Stat(data = nil)`

Create a new `Stat` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## GenerationEntity

```ruby
generation = client.Generation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Array` | No |  |
| `from` | `String` | No |  |
| `generationmix` | `Array` | No |  |
| `to` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Generation.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Generation.load({ "from" => "from", "to" => "to" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GenerationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GenerationListEntity

```ruby
generation_list = client.GenerationList
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `String` | No |  |
| `generationmix` | `Array` | No |  |
| `to` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.GenerationList.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GenerationListEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IntensityEntity

```ruby
intensity = client.Intensity
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Array` | No |  |
| `from` | `String` | No | Start datetime of the period |
| `id` | `String` | No |  |
| `intensity` | `Hash` | No |  |
| `to` | `String` | No | End datetime of the period |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Intensity.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Intensity.load({ "id" => "intensity_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IntensityEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IntensityFactorEntity

```ruby
intensity_factor = client.IntensityFactor
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Biomass` | `Integer` | No | Carbon intensity factor for biomass (gCO2/kWh) |
| `Coal` | `Integer` | No | Carbon intensity factor for coal (gCO2/kWh) |
| `DutchImports` | `Integer` | No | Carbon intensity factor for Dutch imports (gCO2/kWh) |
| `FrenchImports` | `Integer` | No | Carbon intensity factor for French imports (gCO2/kWh) |
| `GasCombinedCycle` | `Integer` | No | Carbon intensity factor for gas combined cycle (gCO2/kWh) |
| `GasOpenCycle` | `Integer` | No | Carbon intensity factor for gas open cycle (gCO2/kWh) |
| `Hydro` | `Integer` | No | Carbon intensity factor for hydro (gCO2/kWh) |
| `IrishImports` | `Integer` | No | Carbon intensity factor for Irish imports (gCO2/kWh) |
| `Nuclear` | `Integer` | No | Carbon intensity factor for nuclear (gCO2/kWh) |
| `Oil` | `Integer` | No | Carbon intensity factor for oil (gCO2/kWh) |
| `Other` | `Integer` | No | Carbon intensity factor for other (gCO2/kWh) |
| `PumpedStorage` | `Integer` | No | Carbon intensity factor for pumped storage (gCO2/kWh) |
| `Solar` | `Integer` | No | Carbon intensity factor for solar (gCO2/kWh) |
| `Wind` | `Integer` | No | Carbon intensity factor for wind (gCO2/kWh) |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.IntensityFactor.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IntensityFactorEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IntensityListEntity

```ruby
intensity_list = client.IntensityList
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Array` | No |  |
| `from` | `String` | No | Start datetime of the period |
| `intensity` | `Hash` | No |  |
| `to` | `String` | No | End datetime of the period |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.IntensityList.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.IntensityList.load({ "date" => "date" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IntensityListEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RegionalEntity

```ruby
regional = client.Regional
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Array` | No |  |
| `dnoregion` | `String` | No | Distribution Network Operator region |
| `postcode` | `String` | No | Outward postcode |
| `regionid` | `Integer` | No | Region ID (1-17) |
| `shortname` | `String` | No | Short region name |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Regional.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RegionalEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RegionalIntensityEntity

```ruby
regional_intensity = client.RegionalIntensity
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Array` | No |  |
| `dnoregion` | `String` | No | Distribution Network Operator region |
| `postcode` | `String` | No | Outward postcode |
| `regionid` | `Integer` | No | Region ID (1-17) |
| `shortname` | `String` | No | Short region name |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.RegionalIntensity.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.RegionalIntensity.load({ "postcode" => "postcode" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RegionalIntensityEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RegionalIntensityListEntity

```ruby
regional_intensity_list = client.RegionalIntensityList
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Array` | No |  |
| `dnoregion` | `String` | No | Distribution Network Operator region |
| `postcode` | `String` | No | Outward postcode |
| `regionid` | `Integer` | No | Region ID (1-17) |
| `shortname` | `String` | No | Short region name |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.RegionalIntensityList.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.RegionalIntensityList.load({ "from" => "from", "to" => "to" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RegionalIntensityListEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StatEntity

```ruby
stat = client.Stat
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Array` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Stat.load({ "from" => "from", "to" => "to" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StatEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = CarbonIntensitySDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

