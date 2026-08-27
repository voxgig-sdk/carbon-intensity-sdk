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
const generation = client.Generation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any[]` | No |  |
| `from` | `string` | No |  |
| `generationmix` | `any[]` | No |  |
| `to` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Generation().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Generation().load({ from: 'from', to: 'to' })
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
const generation_list = client.GenerationList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `string` | No |  |
| `generationmix` | `any[]` | No |  |
| `to` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.GenerationList().list({ from: "example" })
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
const intensity = client.Intensity()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any[]` | No |  |
| `from` | `string` | No | Start datetime of the period |
| `id` | `string` | No |  |
| `intensity` | `Record<string, any>` | No |  |
| `to` | `string` | No | End datetime of the period |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Intensity().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Intensity().load({ id: 'intensity_id' })
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
const intensity_factor = client.IntensityFactor()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Biomass` | `number` | No | Carbon intensity factor for biomass (gCO2/kWh) |
| `Coal` | `number` | No | Carbon intensity factor for coal (gCO2/kWh) |
| `DutchImports` | `number` | No | Carbon intensity factor for Dutch imports (gCO2/kWh) |
| `FrenchImports` | `number` | No | Carbon intensity factor for French imports (gCO2/kWh) |
| `GasCombinedCycle` | `number` | No | Carbon intensity factor for gas combined cycle (gCO2/kWh) |
| `GasOpenCycle` | `number` | No | Carbon intensity factor for gas open cycle (gCO2/kWh) |
| `Hydro` | `number` | No | Carbon intensity factor for hydro (gCO2/kWh) |
| `IrishImports` | `number` | No | Carbon intensity factor for Irish imports (gCO2/kWh) |
| `Nuclear` | `number` | No | Carbon intensity factor for nuclear (gCO2/kWh) |
| `Oil` | `number` | No | Carbon intensity factor for oil (gCO2/kWh) |
| `Other` | `number` | No | Carbon intensity factor for other (gCO2/kWh) |
| `PumpedStorage` | `number` | No | Carbon intensity factor for pumped storage (gCO2/kWh) |
| `Solar` | `number` | No | Carbon intensity factor for solar (gCO2/kWh) |
| `Wind` | `number` | No | Carbon intensity factor for wind (gCO2/kWh) |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.IntensityFactor().list()
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
const intensity_list = client.IntensityList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any[]` | No |  |
| `from` | `string` | No | Start datetime of the period |
| `intensity` | `Record<string, any>` | No |  |
| `to` | `string` | No | End datetime of the period |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.IntensityList().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.IntensityList().load({ date: 'date' })
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
const regional = client.Regional()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any[]` | No |  |
| `dnoregion` | `string` | No | Distribution Network Operator region |
| `postcode` | `string` | No | Outward postcode |
| `regionid` | `number` | No | Region ID (1-17) |
| `shortname` | `string` | No | Short region name |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Regional().list()
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
const regional_intensity = client.RegionalIntensity()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any[]` | No |  |
| `dnoregion` | `string` | No | Distribution Network Operator region |
| `postcode` | `string` | No | Outward postcode |
| `regionid` | `number` | No | Region ID (1-17) |
| `shortname` | `string` | No | Short region name |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.RegionalIntensity().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.RegionalIntensity().load({ postcode: 'postcode' })
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
const regional_intensity_list = client.RegionalIntensityList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any[]` | No |  |
| `dnoregion` | `string` | No | Distribution Network Operator region |
| `postcode` | `string` | No | Outward postcode |
| `regionid` | `number` | No | Region ID (1-17) |
| `shortname` | `string` | No | Short region name |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.RegionalIntensityList().list({ from: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.RegionalIntensityList().load({ from: 'from', to: 'to' })
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
const stat = client.Stat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any[]` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Stat().load({ from: 'from', to: 'to' })
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


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

