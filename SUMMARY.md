# Carbon Intensity API

Official API for Carbon Intensity in Great Britain provided by National Grid ESO. Allows access to current and historical carbon intensity data for different regions and time periods.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 9 entities and 33 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Generation

Results: Successful response.

SDK operations: `list`, `load`.

### GenerationList

Results: Successful response.

SDK operations: `list`.

### Intensity

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `from`: Start datetime of the period
- `to`: End datetime of the period

### IntensityFactor

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `Biomass`: Carbon intensity factor for biomass (gCO2/kWh)
- `Coal`: Carbon intensity factor for coal (gCO2/kWh)
- `DutchImports`: Carbon intensity factor for Dutch imports (gCO2/kWh)
- `FrenchImports`: Carbon intensity factor for French imports (gCO2/kWh)
- `GasCombinedCycle`: Carbon intensity factor for gas combined cycle (gCO2/kWh)

### IntensityList

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `from`: Start datetime of the period
- `to`: End datetime of the period

### Regional

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `dnoregion`: Distribution Network Operator region
- `postcode`: Outward postcode
- `regionid`: Region ID (1-17)
- `shortname`: Short region name

### RegionalIntensity

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `dnoregion`: Distribution Network Operator region
- `postcode`: Outward postcode
- `regionid`: Region ID (1-17)
- `shortname`: Short region name

### RegionalIntensityList

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `dnoregion`: Distribution Network Operator region
- `postcode`: Outward postcode
- `regionid`: Region ID (1-17)
- `shortname`: Short region name

### Stat

Results: Successful response.

SDK operations: `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Generation | `list` | `GET /generation` | See reference |
| Generation | `load` | `GET /generation/{from}/{to}` | See reference |
| GenerationList | `list` | `GET /generation/{from}/pt24h` | See reference |
| Intensity | `list` | `GET /intensity` | See reference |
| Intensity | `load` | `GET /intensity/date/{date}/{period}` | See reference |
| Intensity | `load` | `GET /intensity/{from}/{to}` | See reference |
| Intensity | `load` | `GET /intensity/{from}` | See reference |
| IntensityFactor | `list` | `GET /intensity/factors` | See reference |
| IntensityList | `list` | `GET /intensity/{from}/fw24h` | See reference |
| IntensityList | `list` | `GET /intensity/{from}/fw48h` | See reference |
| IntensityList | `list` | `GET /intensity/{from}/pt24h` | See reference |
| IntensityList | `list` | `GET /intensity/date` | See reference |
| IntensityList | `load` | `GET /intensity/date/{date}` | See reference |
| Regional | `list` | `GET /regional` | See reference |
| RegionalIntensity | `list` | `GET /regional/england` | See reference |
| RegionalIntensity | `list` | `GET /regional/scotland` | See reference |
| RegionalIntensity | `list` | `GET /regional/wales` | See reference |
| RegionalIntensity | `load` | `GET /regional/postcode/{postcode}` | See reference |
| RegionalIntensity | `load` | `GET /regional/regionid/{regionid}` | See reference |
| RegionalIntensityList | `list` | `GET /regional/intensity/{from}/fw24h` | See reference |
| RegionalIntensityList | `list` | `GET /regional/intensity/{from}/fw48h` | See reference |
| RegionalIntensityList | `list` | `GET /regional/intensity/{from}/pt24h` | See reference |
| RegionalIntensityList | `load` | `GET /regional/intensity/{from}/{to}/postcode/{postcode}` | See reference |
| RegionalIntensityList | `load` | `GET /regional/intensity/{from}/{to}/regionid/{regionid}` | See reference |
| RegionalIntensityList | `load` | `GET /regional/intensity/{from}/{to}` | See reference |
| RegionalIntensityList | `load` | `GET /regional/intensity/{from}/fw24h/postcode/{postcode}` | See reference |
| RegionalIntensityList | `load` | `GET /regional/intensity/{from}/fw48h/postcode/{postcode}` | See reference |
| RegionalIntensityList | `load` | `GET /regional/intensity/{from}/pt24h/postcode/{postcode}` | See reference |
| RegionalIntensityList | `load` | `GET /regional/intensity/{from}/fw24h/regionid/{regionid}` | See reference |
| RegionalIntensityList | `load` | `GET /regional/intensity/{from}/fw48h/regionid/{regionid}` | See reference |
| RegionalIntensityList | `load` | `GET /regional/intensity/{from}/pt24h/regionid/{regionid}` | See reference |
| Stat | `load` | `GET /intensity/stats/{from}/{to}/{block}` | See reference |
| Stat | `load` | `GET /intensity/stats/{from}/{to}` | See reference |

## Connect to the API

- Production server: `https://api.carbonintensity.org.uk`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `carbon-intensity_list`: List records for an entity. Supported entities: `generation`, `generation_list`, `intensity`, `intensity_factor`, `intensity_list`, `regional`, `regional_intensity`, `regional_intensity_list`.
- `carbon-intensity_load`: Load one record for an entity. Supported entities: `generation`, `intensity`, `intensity_list`, `regional_intensity`, `regional_intensity_list`, `stat`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

