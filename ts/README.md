# CarbonIntensity TypeScript SDK



The TypeScript SDK for the CarbonIntensity API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Generation()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/carbon-intensity-sdk/releases](https://github.com/voxgig-sdk/carbon-intensity-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { CarbonIntensitySDK } from '@voxgig-sdk/carbon-intensity-sdk'

const client = new CarbonIntensitySDK()
```

### 2. List generation records

`list()` resolves to an array of Generation ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const generations = await client.Generation().list()

for (const generation of generations) {
  console.log(generation)
}
```

### 3. Load a generation

Generation is nested under from, so provide the `from`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const generation = await client.Generation().load({
    from: 'example_from',
    to: 'example_to',
  })
  console.log(generation)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const intensitylists = await client.IntensityList().list()
  console.log(intensitylists)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = CarbonIntensitySDK.test()

const intensitylist = await client.IntensityList().list()
// intensitylist is the entity, populated with mock response data
// — call intensitylist.data() for the record itself
console.log(intensitylist)
```

You can also use the instance method:

```ts
const client = new CarbonIntensitySDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.IntensityList()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new CarbonIntensitySDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CARBON_INTENSITY_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### CarbonIntensitySDK

#### Constructor

```ts
new CarbonIntensitySDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Generation(data?)` | `GenerationEntity` | Create a Generation entity instance. |
| `GenerationList(data?)` | `GenerationListEntity` | Create a GenerationList entity instance. |
| `Intensity(data?)` | `IntensityEntity` | Create an Intensity entity instance. |
| `IntensityFactor(data?)` | `IntensityFactorEntity` | Create an IntensityFactor entity instance. |
| `IntensityList(data?)` | `IntensityListEntity` | Create an IntensityList entity instance. |
| `Regional(data?)` | `RegionalEntity` | Create a Regional entity instance. |
| `RegionalIntensity(data?)` | `RegionalIntensityEntity` | Create a RegionalIntensity entity instance. |
| `RegionalIntensityList(data?)` | `RegionalIntensityListEntity` | Create a RegionalIntensityList entity instance. |
| `Stat(data?)` | `StatEntity` | Create a Stat entity instance. |
| `tester(testopts?, sdkopts?)` | `CarbonIntensitySDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `CarbonIntensitySDK.test(testopts?, sdkopts?)` | `CarbonIntensitySDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): CarbonIntensitySDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Generation

| Field | Description |
| --- | --- |
| `data` |  |
| `from` |  |
| `generationmix` |  |
| `id` |  |
| `to` |  |

Operations: list, load.

API path: `/generation`

#### GenerationList

| Field | Description |
| --- | --- |
| `from` |  |
| `generationmix` |  |
| `to` |  |

Operations: list.

API path: `/generation/{from}/pt24h`

#### Intensity

| Field | Description |
| --- | --- |
| `data` |  |
| `from` | Start datetime of the period |
| `id` |  |
| `intensity` |  |
| `to` | End datetime of the period |

Operations: list, load.

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

Operations: list.

API path: `/intensity/factors`

#### IntensityList

| Field | Description |
| --- | --- |
| `data` |  |
| `from` | Start datetime of the period |
| `intensity` |  |
| `to` | End datetime of the period |

Operations: list, load.

API path: `/intensity/{from}/fw24h`

#### Regional

| Field | Description |
| --- | --- |
| `data` |  |
| `dnoregion` | Distribution Network Operator region |
| `postcode` | Outward postcode |
| `regionid` | Region ID (1-17) |
| `shortname` | Short region name |

Operations: list.

API path: `/regional`

#### RegionalIntensity

| Field | Description |
| --- | --- |
| `data` |  |
| `dnoregion` | Distribution Network Operator region |
| `postcode` | Outward postcode |
| `regionid` | Region ID (1-17) |
| `shortname` | Short region name |

Operations: list, load.

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

Operations: list, load.

API path: `/regional/intensity/{from}/fw24h`

#### Stat

| Field | Description |
| --- | --- |
| `data` |  |
| `id` |  |

Operations: load.

API path: `/intensity/stats/{from}/{to}/{block}`



## Entities


### Generation

Create an instance: `const generation = client.Generation()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any[]` |  |
| `from` | `string` |  |
| `generationmix` | `any[]` |  |
| `id` | `string` |  |
| `to` | `string` |  |

#### Example: Load

```ts
const generation = await client.Generation().load({ from: 'from', to: 'to' })
```

#### Example: List

```ts
const generations = await client.Generation().list()
```


### GenerationList

Create an instance: `const generation_list = client.GenerationList()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | `string` |  |
| `generationmix` | `any[]` |  |
| `to` | `string` |  |

#### Example: List

```ts
const generation_lists = await client.GenerationList().list({ from: "example" })
```


### Intensity

Create an instance: `const intensity = client.Intensity()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any[]` |  |
| `from` | `string` | Start datetime of the period |
| `id` | `string` |  |
| `intensity` | `Record<string, any>` |  |
| `to` | `string` | End datetime of the period |

#### Example: Load

```ts
const intensity = await client.Intensity().load({ id: 'intensity_id' })
```

#### Example: List

```ts
const intensitys = await client.Intensity().list()
```


### IntensityFactor

Create an instance: `const intensity_factor = client.IntensityFactor()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Biomass` | `number` | Carbon intensity factor for biomass (gCO2/kWh) |
| `Coal` | `number` | Carbon intensity factor for coal (gCO2/kWh) |
| `DutchImports` | `number` | Carbon intensity factor for Dutch imports (gCO2/kWh) |
| `FrenchImports` | `number` | Carbon intensity factor for French imports (gCO2/kWh) |
| `GasCombinedCycle` | `number` | Carbon intensity factor for gas combined cycle (gCO2/kWh) |
| `GasOpenCycle` | `number` | Carbon intensity factor for gas open cycle (gCO2/kWh) |
| `Hydro` | `number` | Carbon intensity factor for hydro (gCO2/kWh) |
| `IrishImports` | `number` | Carbon intensity factor for Irish imports (gCO2/kWh) |
| `Nuclear` | `number` | Carbon intensity factor for nuclear (gCO2/kWh) |
| `Oil` | `number` | Carbon intensity factor for oil (gCO2/kWh) |
| `Other` | `number` | Carbon intensity factor for other (gCO2/kWh) |
| `PumpedStorage` | `number` | Carbon intensity factor for pumped storage (gCO2/kWh) |
| `Solar` | `number` | Carbon intensity factor for solar (gCO2/kWh) |
| `Wind` | `number` | Carbon intensity factor for wind (gCO2/kWh) |

#### Example: List

```ts
const intensity_factors = await client.IntensityFactor().list()
```


### IntensityList

Create an instance: `const intensity_list = client.IntensityList()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any[]` |  |
| `from` | `string` | Start datetime of the period |
| `intensity` | `Record<string, any>` |  |
| `to` | `string` | End datetime of the period |

#### Example: Load

```ts
const intensity_list = await client.IntensityList().load({ date: 'date' })
```

#### Example: List

```ts
const intensity_lists = await client.IntensityList().list()
```


### Regional

Create an instance: `const regional = client.Regional()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any[]` |  |
| `dnoregion` | `string` | Distribution Network Operator region |
| `postcode` | `string` | Outward postcode |
| `regionid` | `number` | Region ID (1-17) |
| `shortname` | `string` | Short region name |

#### Example: List

```ts
const regionals = await client.Regional().list()
```


### RegionalIntensity

Create an instance: `const regional_intensity = client.RegionalIntensity()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any[]` |  |
| `dnoregion` | `string` | Distribution Network Operator region |
| `postcode` | `string` | Outward postcode |
| `regionid` | `number` | Region ID (1-17) |
| `shortname` | `string` | Short region name |

#### Example: Load

```ts
const regional_intensity = await client.RegionalIntensity().load({ postcode: 'postcode' })
```

#### Example: List

```ts
const regional_intensitys = await client.RegionalIntensity().list()
```


### RegionalIntensityList

Create an instance: `const regional_intensity_list = client.RegionalIntensityList()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any[]` |  |
| `dnoregion` | `string` | Distribution Network Operator region |
| `id` | `string` |  |
| `postcode` | `string` | Outward postcode |
| `regionid` | `number` | Region ID (1-17) |
| `shortname` | `string` | Short region name |

#### Example: Load

```ts
const regional_intensity_list = await client.RegionalIntensityList().load({ from: 'from', to: 'to' })
```

#### Example: List

```ts
const regional_intensity_lists = await client.RegionalIntensityList().list({ from: "example" })
```


### Stat

Create an instance: `const stat = client.Stat()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any[]` |  |
| `id` | `string` |  |

#### Example: Load

```ts
const stat = await client.Stat().load({ from: 'from', to: 'to' })
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
carbon-intensity/
├── src/
│   ├── CarbonIntensitySDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { CarbonIntensitySDK } from '@voxgig-sdk/carbon-intensity-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const intensitylist = client.IntensityList()
await intensitylist.list()

// intensitylist.data() now returns the intensitylist data from the last `list`
// intensitylist.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
