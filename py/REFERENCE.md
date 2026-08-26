# CarbonIntensity Python SDK Reference

Complete API reference for the CarbonIntensity Python SDK.


## CarbonIntensitySDK

### Constructor

```python
from carbonintensity_sdk import CarbonIntensitySDK

client = CarbonIntensitySDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CarbonIntensitySDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = CarbonIntensitySDK.test()
```


### Instance Methods

#### `Generation(data=None)`

Create a new `GenerationEntity` instance. Pass `None` for no initial data.

#### `GenerationList(data=None)`

Create a new `GenerationListEntity` instance. Pass `None` for no initial data.

#### `Intensity(data=None)`

Create a new `IntensityEntity` instance. Pass `None` for no initial data.

#### `IntensityFactor(data=None)`

Create a new `IntensityFactorEntity` instance. Pass `None` for no initial data.

#### `IntensityList(data=None)`

Create a new `IntensityListEntity` instance. Pass `None` for no initial data.

#### `Regional(data=None)`

Create a new `RegionalEntity` instance. Pass `None` for no initial data.

#### `RegionalIntensity(data=None)`

Create a new `RegionalIntensityEntity` instance. Pass `None` for no initial data.

#### `RegionalIntensityList(data=None)`

Create a new `RegionalIntensityListEntity` instance. Pass `None` for no initial data.

#### `Stat(data=None)`

Create a new `StatEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## GenerationEntity

```python
generation = client.Generation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | No |  |
| `from` | `str` | No |  |
| `generationmix` | `list` | No |  |
| `to` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Generation().list()
for generation in results:
    print(generation)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Generation().load({"from": "from", "to": "to"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GenerationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GenerationListEntity

```python
generation_list = client.GenerationList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `str` | No |  |
| `generationmix` | `list` | No |  |
| `to` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.GenerationList().list({"from": "example"})
for generation_list in results:
    print(generation_list)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GenerationListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IntensityEntity

```python
intensity = client.Intensity()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | No |  |
| `from` | `str` | No | Start datetime of the period |
| `id` | `str` | No |  |
| `intensity` | `dict` | No |  |
| `to` | `str` | No | End datetime of the period |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Intensity().list()
for intensity in results:
    print(intensity)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Intensity().load({"id": "intensity_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IntensityEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IntensityFactorEntity

```python
intensity_factor = client.IntensityFactor()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Biomass` | `int` | No | Carbon intensity factor for biomass (gCO2/kWh) |
| `Coal` | `int` | No | Carbon intensity factor for coal (gCO2/kWh) |
| `DutchImports` | `int` | No | Carbon intensity factor for Dutch imports (gCO2/kWh) |
| `FrenchImports` | `int` | No | Carbon intensity factor for French imports (gCO2/kWh) |
| `GasCombinedCycle` | `int` | No | Carbon intensity factor for gas combined cycle (gCO2/kWh) |
| `GasOpenCycle` | `int` | No | Carbon intensity factor for gas open cycle (gCO2/kWh) |
| `Hydro` | `int` | No | Carbon intensity factor for hydro (gCO2/kWh) |
| `IrishImports` | `int` | No | Carbon intensity factor for Irish imports (gCO2/kWh) |
| `Nuclear` | `int` | No | Carbon intensity factor for nuclear (gCO2/kWh) |
| `Oil` | `int` | No | Carbon intensity factor for oil (gCO2/kWh) |
| `Other` | `int` | No | Carbon intensity factor for other (gCO2/kWh) |
| `PumpedStorage` | `int` | No | Carbon intensity factor for pumped storage (gCO2/kWh) |
| `Solar` | `int` | No | Carbon intensity factor for solar (gCO2/kWh) |
| `Wind` | `int` | No | Carbon intensity factor for wind (gCO2/kWh) |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.IntensityFactor().list()
for intensity_factor in results:
    print(intensity_factor)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IntensityFactorEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IntensityListEntity

```python
intensity_list = client.IntensityList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | No |  |
| `from` | `str` | No | Start datetime of the period |
| `intensity` | `dict` | No |  |
| `to` | `str` | No | End datetime of the period |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.IntensityList().list()
for intensity_list in results:
    print(intensity_list)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.IntensityList().load({"date": "date"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IntensityListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RegionalEntity

```python
regional = client.Regional()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | No |  |
| `dnoregion` | `str` | No | Distribution Network Operator region |
| `postcode` | `str` | No | Outward postcode |
| `regionid` | `int` | No | Region ID (1-17) |
| `shortname` | `str` | No | Short region name |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Regional().list()
for regional in results:
    print(regional)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RegionalEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RegionalIntensityEntity

```python
regional_intensity = client.RegionalIntensity()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | No |  |
| `dnoregion` | `str` | No | Distribution Network Operator region |
| `postcode` | `str` | No | Outward postcode |
| `regionid` | `int` | No | Region ID (1-17) |
| `shortname` | `str` | No | Short region name |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.RegionalIntensity().list()
for regional_intensity in results:
    print(regional_intensity)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.RegionalIntensity().load({"postcode": "postcode"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RegionalIntensityEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RegionalIntensityListEntity

```python
regional_intensity_list = client.RegionalIntensityList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | No |  |
| `dnoregion` | `str` | No | Distribution Network Operator region |
| `postcode` | `str` | No | Outward postcode |
| `regionid` | `int` | No | Region ID (1-17) |
| `shortname` | `str` | No | Short region name |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.RegionalIntensityList().list({"from": "example"})
for regional_intensity_list in results:
    print(regional_intensity_list)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.RegionalIntensityList().load({"from": "from", "to": "to"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RegionalIntensityListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StatEntity

```python
stat = client.Stat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Stat().load({"from": "from", "to": "to"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StatEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = CarbonIntensitySDK({
    "feature": {
        "test": {"active": True},
    },
})
```

