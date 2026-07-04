# CarbonIntensity Ruby SDK Reference

Complete API reference for the CarbonIntensity Ruby SDK.


## CarbonIntensitySDK

### Constructor

```ruby
require_relative 'carbon-intensity_sdk'

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
generation = client.generation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | ``$STRING`` | No |  |
| `generationmix` | ``$ARRAY`` | No |  |
| `to` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.generation.list(nil)
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
generation_list = client.generation_list
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | ``$STRING`` | No |  |
| `generationmix` | ``$ARRAY`` | No |  |
| `to` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.generation_list.list(nil)
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
intensity = client.intensity
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ARRAY`` | No |  |
| `from` | ``$STRING`` | No |  |
| `intensity` | ``$OBJECT`` | No |  |
| `to` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.intensity.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.intensity.load({ "id" => "intensity_id" })
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
intensity_factor = client.intensity_factor
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.intensity_factor.list(nil)
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
intensity_list = client.intensity_list
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ARRAY`` | No |  |
| `from` | ``$STRING`` | No |  |
| `intensity` | ``$OBJECT`` | No |  |
| `to` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.intensity_list.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.intensity_list.load({ "id" => "intensity_list_id" })
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
regional = client.regional
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.regional.list(nil)
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
regional_intensity = client.regional_intensity
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.regional_intensity.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.regional_intensity.load({ "id" => "regional_intensity_id" })
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
regional_intensity_list = client.regional_intensity_list
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.regional_intensity_list.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.regional_intensity_list.load({ "id" => "regional_intensity_list_id" })
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
stat = client.stat
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | ``$STRING`` | No |  |
| `intensity` | ``$OBJECT`` | No |  |
| `to` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.stat.list(nil)
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

