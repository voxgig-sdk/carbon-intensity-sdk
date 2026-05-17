# CarbonIntensity SDK



Available for [Golang](go/) and [Go CLI](go-cli/) and [Lua](lua/) and [PHP](php/) and [Python](py/) and [Ruby](rb/) and [TypeScript](ts/).


## Entities

The API exposes 9 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Generation** |  | `/generation/{from}/{to}` |
| **GenerationList** |  | `/generation/{from}/pt24h` |
| **Intensity** |  | `/intensity/date/{date}/{period}` |
| **IntensityFactor** |  | `/intensity/factors` |
| **IntensityList** |  | `/intensity/{from}/fw24h` |
| **Regional** |  | `/regional` |
| **RegionalIntensity** |  | `/regional/england` |
| **RegionalIntensityList** |  | `/regional/intensity/{from}/{to}` |
| **Stat** |  | `/intensity/stats/{from}/{to}/{block}` |

Each entity supports the following operations where available: **load**, **list**, **create**,
**update**, and **remove**.


## Architecture

### Entity-operation model

Every SDK call follows the same pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

At each stage a feature hook fires (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), allowing features to inspect or modify the pipeline.

### Features

Features are hook-based middleware that extend SDK behaviour.

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

You can add custom features by passing them in the `extend` option at
construction time.

### Direct and Prepare

For endpoints not covered by the entity model, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`, `headers`,
and `body`.


## Quick start

### Golang

```go
import sdk "github.com/voxgig-sdk/carbon-intensity-sdk/go"

client := sdk.NewCarbonIntensitySDK(map[string]any{
    "apikey": os.Getenv("CARBON-INTENSITY_APIKEY"),
})

// List all generations
generations, err := client.Generation(nil).List(nil, nil)
```

### Lua

```lua
local sdk = require("carbon-intensity_sdk")

local client = sdk.new({
  apikey = os.getenv("CARBON-INTENSITY_APIKEY"),
})

-- List all generations
local generations, err = client:Generation(nil):list(nil, nil)
```

### PHP

```php
<?php
require_once 'carbonintensity_sdk.php';

$client = new CarbonIntensitySDK([
    "apikey" => getenv("CARBON-INTENSITY_APIKEY"),
]);

// List all generations
[$generations, $err] = $client->Generation(null)->list(null, null);
```

### Python

```python
import os
from carbonintensity_sdk import CarbonIntensitySDK

client = CarbonIntensitySDK({
    "apikey": os.environ.get("CARBON-INTENSITY_APIKEY"),
})

# List all generations
generations, err = client.Generation(None).list(None, None)
```

### Ruby

```ruby
require_relative "CarbonIntensity_sdk"

client = CarbonIntensitySDK.new({
  "apikey" => ENV["CARBON-INTENSITY_APIKEY"],
})

# List all generations
generations, err = client.Generation(nil).list(nil, nil)
```

### TypeScript

```ts
import { CarbonIntensitySDK } from 'carbon-intensity'

const client = new CarbonIntensitySDK({
  apikey: process.env.CARBON-INTENSITY_APIKEY,
})

// List all generations
const generations = await client.Generation().list()
```


## Testing

Both SDKs provide a test mode that replaces the HTTP transport with an
in-memory mock, so tests run without a network connection.

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Generation(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Generation(nil):load(
  { id = "test01" }, nil
)
```

### PHP

```php
$client = CarbonIntensitySDK::test(null, null);
[$result, $err] = $client->Generation(null)->load(
    ["id" => "test01"], null
);
```

### Python

```python
client = CarbonIntensitySDK.test(None, None)
result, err = client.Generation(None).load(
    {"id": "test01"}, None
)
```

### Ruby

```ruby
client = CarbonIntensitySDK.test(nil, nil)
result, err = client.Generation(nil).load(
  { "id" => "test01" }, nil
)
```

### TypeScript

```ts
const client = CarbonIntensitySDK.test()
const result = await client.Generation().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```


## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```


## Language-specific documentation

- [Golang SDK](go/README.md)
- [Go CLI SDK](go-cli/README.md)
- [Lua SDK](lua/README.md)
- [PHP SDK](php/README.md)
- [Python SDK](py/README.md)
- [Ruby SDK](rb/README.md)
- [TypeScript SDK](ts/README.md)

