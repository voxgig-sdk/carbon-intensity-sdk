# CarbonIntensity TypeScript SDK



The TypeScript SDK for the CarbonIntensity API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
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
import { CarbonIntensitySDK } from '@voxgig-sdk/carbon-intensity'

const client = new CarbonIntensitySDK()
```

### 2. List generation records

`list()` resolves to an array of Generation objects — iterate it directly:

```ts
const generations = await client.Generation().list()

for (const generation of generations) {
  console.log(generation)
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

const generation = await client.Generation().load({ id: 'test01' })
// generation is a bare entity populated with mock response data
console.log(generation)
```

You can also use the instance method:

```ts
const client = new CarbonIntensitySDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Generation()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
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
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): CarbonIntensitySDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

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
| `from` |  |
| `generationmix` |  |
| `to` |  |

Operations: list.

API path: `/generation/{from}/{to}`

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
| `from` |  |
| `intensity` |  |
| `to` |  |

Operations: list, load.

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

Operations: list.

API path: `/intensity/factors`

#### IntensityList

| Field | Description |
| --- | --- |
| `data` |  |
| `from` |  |
| `intensity` |  |
| `to` |  |

Operations: list, load.

API path: `/intensity/{from}/fw24h`

#### Regional

| Field | Description |
| --- | --- |
| `data` |  |
| `dnoregion` |  |
| `postcode` |  |
| `regionid` |  |
| `shortname` |  |

Operations: list.

API path: `/regional`

#### RegionalIntensity

| Field | Description |
| --- | --- |
| `data` |  |
| `dnoregion` |  |
| `postcode` |  |
| `regionid` |  |
| `shortname` |  |

Operations: list, load.

API path: `/regional/england`

#### RegionalIntensityList

| Field | Description |
| --- | --- |
| `data` |  |
| `dnoregion` |  |
| `postcode` |  |
| `regionid` |  |
| `shortname` |  |

Operations: list, load.

API path: `/regional/intensity/{from}/{to}`

#### Stat

| Field | Description |
| --- | --- |
| `from` |  |
| `intensity` |  |
| `to` |  |

Operations: list.

API path: `/intensity/stats/{from}/{to}/{block}`



## Entities


### Generation

Create an instance: `const generation = client.Generation()`

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
| `from` | ``$STRING`` |  |
| `generationmix` | ``$ARRAY`` |  |
| `to` | ``$STRING`` |  |

#### Example: List

```ts
const generation_lists = await client.GenerationList().list()
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
| `data` | ``$ARRAY`` |  |
| `from` | ``$STRING`` |  |
| `intensity` | ``$OBJECT`` |  |
| `to` | ``$STRING`` |  |

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
| `data` | ``$ARRAY`` |  |
| `from` | ``$STRING`` |  |
| `intensity` | ``$OBJECT`` |  |
| `to` | ``$STRING`` |  |

#### Example: Load

```ts
const intensity_list = await client.IntensityList().load({ id: 'intensity_list_id' })
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
| `data` | ``$ARRAY`` |  |
| `dnoregion` | ``$STRING`` |  |
| `postcode` | ``$STRING`` |  |
| `regionid` | ``$INTEGER`` |  |
| `shortname` | ``$STRING`` |  |

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
| `data` | ``$ARRAY`` |  |
| `dnoregion` | ``$STRING`` |  |
| `postcode` | ``$STRING`` |  |
| `regionid` | ``$INTEGER`` |  |
| `shortname` | ``$STRING`` |  |

#### Example: Load

```ts
const regional_intensity = await client.RegionalIntensity().load({ id: 'regional_intensity_id' })
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
| `data` | ``$ARRAY`` |  |
| `dnoregion` | ``$STRING`` |  |
| `postcode` | ``$STRING`` |  |
| `regionid` | ``$INTEGER`` |  |
| `shortname` | ``$STRING`` |  |

#### Example: Load

```ts
const regional_intensity_list = await client.RegionalIntensityList().load({ id: 'regional_intensity_list_id' })
```

#### Example: List

```ts
const regional_intensity_lists = await client.RegionalIntensityList().list()
```


### Stat

Create an instance: `const stat = client.Stat()`

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
const stats = await client.Stat().list()
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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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
import { CarbonIntensitySDK } from '@voxgig-sdk/carbon-intensity'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const generation = client.Generation()
await generation.load({ id: "example_id" })

// generation.data() now returns the loaded generation data
// generation.match() returns { id: "example_id" }
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
