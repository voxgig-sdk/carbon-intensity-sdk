# CarbonIntensity SDK

Live and forecast carbon intensity (gCO2/kWh), generation mix and regional breakdowns for Great Britain's electricity grid

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Carbon Intensity API

The [Carbon Intensity API](https://carbonintensity.org.uk/) is the official feed for the carbon intensity of electricity in Great Britain, developed by the [National Energy System Operator (NESO)](https://www.neso.energy/). It exposes half-hourly readings, two-day forecasts and historical values for the national grid and for each GB region, together with the generation mix that drives those values.

What you get from the API:

- National carbon intensity (`forecast`, `actual`, `index`) in gCO2/kWh at half-hour resolution.
- Forecasts up to 48 hours ahead and look-backs up to 24 hours via `fw24h`, `fw48h`, `pt24h` suffixes.
- Statistics (`max`, `min`, `average`) over arbitrary ranges, optionally block-averaged.
- Generation mix percentages for gas, coal, biomass, nuclear, hydro, imports, solar, wind and other.
- Carbon factors per fuel type (Biomass, Coal, Gas combined/open cycle, Hydro, Nuclear, Oil, Solar, Wind, imports).
- Regional intensity and mix for England, Scotland, Wales, by outward postcode, or by region ID (1–17, covering the 14 DNO regions plus England, Scotland, Wales).

No authentication is required and CORS is enabled. Responses are available in JSON or XML. Custom date ranges are capped at 14 days for intensity queries and 30 days for stats queries.

## Try it

**TypeScript**
```bash
npm install carbon-intensity
```

**Python**
```bash
pip install carbon-intensity-sdk
```

**PHP**
```bash
composer require voxgig/carbon-intensity-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/carbon-intensity-sdk/go
```

**Ruby**
```bash
gem install carbon-intensity-sdk
```

**Lua**
```bash
luarocks install carbon-intensity-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { CarbonIntensitySDK } from 'carbon-intensity'

const client = new CarbonIntensitySDK({})

// List all generations
const generations = await client.Generation().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o carbon-intensity-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "carbon-intensity": {
      "command": "/abs/path/to/carbon-intensity-mcp"
    }
  }
}
```

## Entities

The API exposes 9 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Generation** | Current GB generation mix as a single snapshot — percentage share of gas, coal, biomass, nuclear, hydro, imports, solar, wind and other (`GET /generation`). | `/generation/{from}/{to}` |
| **GenerationList** | Historical generation mix over a range or past 24 hours (`GET /generation/{from}/pt24h`, `GET /generation/{from}/{to}`). | `/generation/{from}/pt24h` |
| **Intensity** | National carbon intensity for the current half-hour, including `forecast`, `actual` (gCO2/kWh) and an `index` band (`GET /intensity`). | `/intensity/date/{date}/{period}` |
| **IntensityFactor** | Carbon emission factors per fuel type used by the model — Biomass, Coal, Gas (combined/open cycle), Hydro, Nuclear, Oil, Solar, Wind and imports (`GET /intensity/factors`). | `/intensity/factors` |
| **IntensityList** | National intensity series for a date, period, custom range (max 14 days), or 24/48-hour forward and backward windows (`GET /intensity/date`, `GET /intensity/date/{date}`, `GET /intensity/{from}/{to}`, `GET /intensity/{from}/fw48h`, `GET /intensity/{from}/pt24h`). | `/intensity/{from}/fw24h` |
| **Regional** | Snapshot of carbon intensity and generation mix across all GB regions (`GET /regional`). | `/regional` |
| **RegionalIntensity** | Intensity and mix for a single area — England, Scotland, Wales, an outward postcode, or a numeric region ID (`GET /regional/england`, `GET /regional/postcode/{postcode}`, `GET /regional/regionid/{regionid}`). | `/regional/england` |
| **RegionalIntensityList** | Regional intensity time series including forward (`fw24h`, `fw48h`) and backward (`pt24h`) windows for a given area. | `/regional/intensity/{from}/{to}` |
| **Stat** | Aggregate statistics (`max`, `min`, `average` gCO2/kWh) over a range up to 30 days, optionally averaged into 1–24 hour blocks (`GET /intensity/stats/{from}/{to}`, `GET /intensity/stats/{from}/{to}/{block}`). | `/intensity/stats/{from}/{to}/{block}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from carbonintensity_sdk import CarbonIntensitySDK

client = CarbonIntensitySDK({})

# List all generations
generations, err = client.Generation(None).list(None, None)
```

### PHP

```php
<?php
require_once 'carbonintensity_sdk.php';

$client = new CarbonIntensitySDK([]);

// List all generations
[$generations, $err] = $client->Generation(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/carbon-intensity-sdk/go"

client := sdk.NewCarbonIntensitySDK(map[string]any{})

// List all generations
generations, err := client.Generation(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "CarbonIntensity_sdk"

client = CarbonIntensitySDK.new({})

# List all generations
generations, err = client.Generation(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("carbon-intensity_sdk")

local client = sdk.new({})

-- List all generations
local generations, err = client:Generation(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = CarbonIntensitySDK.test()
const result = await client.Generation().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = CarbonIntensitySDK.test(None, None)
result, err = client.Generation(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = CarbonIntensitySDK::test(null, null);
[$result, $err] = $client->Generation(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Generation(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = CarbonIntensitySDK.test(nil, nil)
result, err = client.Generation(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Generation(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
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

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
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

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Carbon Intensity API

- Upstream: [https://carbonintensity.org.uk/](https://carbonintensity.org.uk/)
- API docs: [https://carbon-intensity.github.io/api-definitions/](https://carbon-intensity.github.io/api-definitions/)

- Data published under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
- Attribute to **National Energy System Operator (NESO)** (formerly National Grid ESO) when reusing data.
- Full terms: <https://github.com/carbon-intensity/terms>.
- Methodology for national and regional forecasts is published separately by NESO.

---

Generated from the Carbon Intensity API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
