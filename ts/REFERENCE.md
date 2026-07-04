# CarbonIntensity TypeScript SDK Reference

Complete API reference for the CarbonIntensity TypeScript SDK.


## CarbonIntensitySDK

### Constructor

```ts
new CarbonIntensitySDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CarbonIntensitySDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = CarbonIntensitySDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `CarbonIntensitySDK` instance in test mode.


### Instance Methods

#### `Generation(data?: object)`

Create a new `Generation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GenerationEntity` instance.

#### `GenerationList(data?: object)`

Create a new `GenerationList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GenerationListEntity` instance.

#### `Intensity(data?: object)`

Create a new `Intensity` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IntensityEntity` instance.

#### `IntensityFactor(data?: object)`

Create a new `IntensityFactor` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IntensityFactorEntity` instance.

#### `IntensityList(data?: object)`

Create a new `IntensityList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IntensityListEntity` instance.

#### `Regional(data?: object)`

Create a new `Regional` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RegionalEntity` instance.

#### `RegionalIntensity(data?: object)`

Create a new `RegionalIntensity` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RegionalIntensityEntity` instance.

#### `RegionalIntensityList(data?: object)`

Create a new `RegionalIntensityList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RegionalIntensityListEntity` instance.

#### `Stat(data?: object)`

Create a new `Stat` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StatEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `CarbonIntensitySDK.test()`.

**Returns:** `CarbonIntensitySDK` instance in test mode.


---

## GenerationEntity

```ts
const generation = client.generation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | ``$STRING`` | No |  |
| `generationmix` | ``$ARRAY`` | No |  |
| `to` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.generation.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GenerationEntity` instance with the same client and
options.

#### `client()`

Return the parent `CarbonIntensitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GenerationListEntity

```ts
const generation_list = client.generation_list
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | ``$STRING`` | No |  |
| `generationmix` | ``$ARRAY`` | No |  |
| `to` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.generation_list.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GenerationListEntity` instance with the same client and
options.

#### `client()`

Return the parent `CarbonIntensitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IntensityEntity

```ts
const intensity = client.intensity
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ARRAY`` | No |  |
| `from` | ``$STRING`` | No |  |
| `intensity` | ``$OBJECT`` | No |  |
| `to` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.intensity.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.intensity.load({ id: 'intensity_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IntensityEntity` instance with the same client and
options.

#### `client()`

Return the parent `CarbonIntensitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IntensityFactorEntity

```ts
const intensity_factor = client.intensity_factor
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.intensity_factor.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IntensityFactorEntity` instance with the same client and
options.

#### `client()`

Return the parent `CarbonIntensitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IntensityListEntity

```ts
const intensity_list = client.intensity_list
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ARRAY`` | No |  |
| `from` | ``$STRING`` | No |  |
| `intensity` | ``$OBJECT`` | No |  |
| `to` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.intensity_list.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.intensity_list.load({ id: 'intensity_list_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IntensityListEntity` instance with the same client and
options.

#### `client()`

Return the parent `CarbonIntensitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RegionalEntity

```ts
const regional = client.regional
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.regional.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RegionalEntity` instance with the same client and
options.

#### `client()`

Return the parent `CarbonIntensitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RegionalIntensityEntity

```ts
const regional_intensity = client.regional_intensity
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.regional_intensity.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.regional_intensity.load({ id: 'regional_intensity_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RegionalIntensityEntity` instance with the same client and
options.

#### `client()`

Return the parent `CarbonIntensitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RegionalIntensityListEntity

```ts
const regional_intensity_list = client.regional_intensity_list
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.regional_intensity_list.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.regional_intensity_list.load({ id: 'regional_intensity_list_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RegionalIntensityListEntity` instance with the same client and
options.

#### `client()`

Return the parent `CarbonIntensitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StatEntity

```ts
const stat = client.stat
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | ``$STRING`` | No |  |
| `intensity` | ``$OBJECT`` | No |  |
| `to` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.stat.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StatEntity` instance with the same client and
options.

#### `client()`

Return the parent `CarbonIntensitySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new CarbonIntensitySDK({
  feature: {
    test: { active: true },
  }
})
```

