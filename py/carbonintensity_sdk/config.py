# CarbonIntensity SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "CarbonIntensity",
            "slug": "carbon-intensity",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://api.carbonintensity.org.uk",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "generation": {},
                "generation_list": {},
                "intensity": {},
                "intensity_factor": {},
                "intensity_list": {},
                "regional": {},
                "regional_intensity": {},
                "regional_intensity_list": {},
                "stat": {},
            },
        },
        "entity": {
      "generation": {
        "fields": [
          {
            "name": "data",
            "type": "`$ARRAY`",
          },
          {
            "name": "from",
            "type": "`$STRING`",
          },
          {
            "name": "generationmix",
            "type": "`$ARRAY`",
          },
          {
            "name": "to",
            "type": "`$STRING`",
          },
        ],
        "name": "generation",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/generation",
                "parts": [
                  "generation",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "to",
                      "orig": "to",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/generation/{from}/{to}",
                "parts": [
                  "generation",
                  "{from}",
                  "{to}",
                ],
                "select": {
                  "exist": [
                    "from",
                    "to",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "generation",
            ],
          ],
        },
      },
      "generation_list": {
        "fields": [
          {
            "name": "from",
            "type": "`$STRING`",
          },
          {
            "name": "generationmix",
            "type": "`$ARRAY`",
          },
          {
            "name": "to",
            "type": "`$STRING`",
          },
        ],
        "name": "generation_list",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/generation/{from}/pt24h",
                "parts": [
                  "generation",
                  "{from}",
                  "pt24h",
                ],
                "select": {
                  "exist": [
                    "from",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "generation",
            ],
          ],
        },
      },
      "intensity": {
        "fields": [
          {
            "name": "data",
            "type": "`$ARRAY`",
          },
          {
            "name": "from",
            "short": "Start datetime of the period",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "intensity",
            "type": "`$OBJECT`",
          },
          {
            "name": "to",
            "short": "End datetime of the period",
            "type": "`$STRING`",
          },
        ],
        "name": "intensity",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/intensity",
                "parts": [
                  "intensity",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "date",
                      "orig": "date",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "period",
                      "orig": "period",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/intensity/date/{date}/{period}",
                "parts": [
                  "intensity",
                  "date",
                  "{date}",
                  "{period}",
                ],
                "select": {
                  "exist": [
                    "date",
                    "period",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "to",
                      "orig": "to",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/intensity/{from}/{to}",
                "parts": [
                  "intensity",
                  "{from}",
                  "{to}",
                ],
                "select": {
                  "exist": [
                    "from",
                    "to",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/intensity/{from}",
                "parts": [
                  "intensity",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "from": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "date",
            ],
            [
              "intensity",
            ],
          ],
        },
      },
      "intensity_factor": {
        "fields": [
          {
            "name": "Biomass",
            "short": "Carbon intensity factor for biomass (gCO2/kWh)",
            "type": "`$INTEGER`",
          },
          {
            "name": "Coal",
            "short": "Carbon intensity factor for coal (gCO2/kWh)",
            "type": "`$INTEGER`",
          },
          {
            "name": "DutchImports",
            "short": "Carbon intensity factor for Dutch imports (gCO2/kWh)",
            "type": "`$INTEGER`",
          },
          {
            "name": "FrenchImports",
            "short": "Carbon intensity factor for French imports (gCO2/kWh)",
            "type": "`$INTEGER`",
          },
          {
            "name": "GasCombinedCycle",
            "short": "Carbon intensity factor for gas combined cycle (gCO2/kWh)",
            "type": "`$INTEGER`",
          },
          {
            "name": "GasOpenCycle",
            "short": "Carbon intensity factor for gas open cycle (gCO2/kWh)",
            "type": "`$INTEGER`",
          },
          {
            "name": "Hydro",
            "short": "Carbon intensity factor for hydro (gCO2/kWh)",
            "type": "`$INTEGER`",
          },
          {
            "name": "IrishImports",
            "short": "Carbon intensity factor for Irish imports (gCO2/kWh)",
            "type": "`$INTEGER`",
          },
          {
            "name": "Nuclear",
            "short": "Carbon intensity factor for nuclear (gCO2/kWh)",
            "type": "`$INTEGER`",
          },
          {
            "name": "Oil",
            "short": "Carbon intensity factor for oil (gCO2/kWh)",
            "type": "`$INTEGER`",
          },
          {
            "name": "Other",
            "short": "Carbon intensity factor for other (gCO2/kWh)",
            "type": "`$INTEGER`",
          },
          {
            "name": "PumpedStorage",
            "short": "Carbon intensity factor for pumped storage (gCO2/kWh)",
            "type": "`$INTEGER`",
          },
          {
            "name": "Solar",
            "short": "Carbon intensity factor for solar (gCO2/kWh)",
            "type": "`$INTEGER`",
          },
          {
            "name": "Wind",
            "short": "Carbon intensity factor for wind (gCO2/kWh)",
            "type": "`$INTEGER`",
          },
        ],
        "name": "intensity_factor",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/intensity/factors",
                "parts": [
                  "intensity",
                  "factors",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "intensity_list": {
        "fields": [
          {
            "name": "data",
            "type": "`$ARRAY`",
          },
          {
            "name": "from",
            "short": "Start datetime of the period",
            "type": "`$STRING`",
          },
          {
            "name": "intensity",
            "type": "`$OBJECT`",
          },
          {
            "name": "to",
            "short": "End datetime of the period",
            "type": "`$STRING`",
          },
        ],
        "name": "intensity_list",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/intensity/{from}/fw24h",
                "parts": [
                  "intensity",
                  "{from}",
                  "fw24h",
                ],
                "select": {
                  "exist": [
                    "from",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/intensity/{from}/fw48h",
                "parts": [
                  "intensity",
                  "{from}",
                  "fw48h",
                ],
                "select": {
                  "exist": [
                    "from",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/intensity/{from}/pt24h",
                "parts": [
                  "intensity",
                  "{from}",
                  "pt24h",
                ],
                "select": {
                  "exist": [
                    "from",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/intensity/date",
                "parts": [
                  "intensity",
                  "date",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "date",
                      "orig": "date",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/intensity/date/{date}",
                "parts": [
                  "intensity",
                  "date",
                  "{date}",
                ],
                "select": {
                  "exist": [
                    "date",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "date",
            ],
            [
              "intensity",
            ],
          ],
        },
      },
      "regional": {
        "fields": [
          {
            "name": "data",
            "type": "`$ARRAY`",
          },
          {
            "name": "dnoregion",
            "short": "Distribution Network Operator region",
            "type": "`$STRING`",
          },
          {
            "name": "postcode",
            "short": "Outward postcode",
            "type": "`$STRING`",
          },
          {
            "name": "regionid",
            "short": "Region ID (1-17)",
            "type": "`$INTEGER`",
          },
          {
            "name": "shortname",
            "short": "Short region name",
            "type": "`$STRING`",
          },
        ],
        "name": "regional",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/regional",
                "parts": [
                  "regional",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "regional_intensity": {
        "fields": [
          {
            "name": "data",
            "type": "`$ARRAY`",
          },
          {
            "name": "dnoregion",
            "short": "Distribution Network Operator region",
            "type": "`$STRING`",
          },
          {
            "name": "postcode",
            "short": "Outward postcode",
            "type": "`$STRING`",
          },
          {
            "name": "regionid",
            "short": "Region ID (1-17)",
            "type": "`$INTEGER`",
          },
          {
            "name": "shortname",
            "short": "Short region name",
            "type": "`$STRING`",
          },
        ],
        "name": "regional_intensity",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/regional/england",
                "parts": [
                  "regional",
                  "england",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/regional/scotland",
                "parts": [
                  "regional",
                  "scotland",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/regional/wales",
                "parts": [
                  "regional",
                  "wales",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "postcode",
                      "orig": "postcode",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/regional/postcode/{postcode}",
                "parts": [
                  "regional",
                  "postcode",
                  "{postcode}",
                ],
                "select": {
                  "exist": [
                    "postcode",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "regionid",
                      "orig": "regionid",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/regional/regionid/{regionid}",
                "parts": [
                  "regional",
                  "regionid",
                  "{regionid}",
                ],
                "select": {
                  "exist": [
                    "regionid",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "postcode",
            ],
            [
              "regionid",
            ],
          ],
        },
      },
      "regional_intensity_list": {
        "fields": [
          {
            "name": "data",
            "type": "`$ARRAY`",
          },
          {
            "name": "dnoregion",
            "short": "Distribution Network Operator region",
            "type": "`$STRING`",
          },
          {
            "name": "postcode",
            "short": "Outward postcode",
            "type": "`$STRING`",
          },
          {
            "name": "regionid",
            "short": "Region ID (1-17)",
            "type": "`$INTEGER`",
          },
          {
            "name": "shortname",
            "short": "Short region name",
            "type": "`$STRING`",
          },
        ],
        "name": "regional_intensity_list",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/regional/intensity/{from}/fw24h",
                "parts": [
                  "regional",
                  "intensity",
                  "{from}",
                  "fw24h",
                ],
                "select": {
                  "exist": [
                    "from",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/regional/intensity/{from}/fw48h",
                "parts": [
                  "regional",
                  "intensity",
                  "{from}",
                  "fw48h",
                ],
                "select": {
                  "exist": [
                    "from",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/regional/intensity/{from}/pt24h",
                "parts": [
                  "regional",
                  "intensity",
                  "{from}",
                  "pt24h",
                ],
                "select": {
                  "exist": [
                    "from",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "intensity_id",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "postcode",
                      "orig": "postcode",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "to",
                      "orig": "to",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/regional/intensity/{from}/{to}/postcode/{postcode}",
                "parts": [
                  "regional",
                  "intensity",
                  "{intensity_id}",
                  "{to}",
                  "postcode",
                  "{postcode}",
                ],
                "rename": {
                  "param": {
                    "from": "intensity_id",
                  },
                },
                "select": {
                  "exist": [
                    "intensity_id",
                    "postcode",
                    "to",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "intensity_id",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "regionid",
                      "orig": "regionid",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "param",
                      "name": "to",
                      "orig": "to",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/regional/intensity/{from}/{to}/regionid/{regionid}",
                "parts": [
                  "regional",
                  "intensity",
                  "{intensity_id}",
                  "{to}",
                  "regionid",
                  "{regionid}",
                ],
                "rename": {
                  "param": {
                    "from": "intensity_id",
                  },
                },
                "select": {
                  "exist": [
                    "intensity_id",
                    "regionid",
                    "to",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "to",
                      "orig": "to",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/regional/intensity/{from}/{to}",
                "parts": [
                  "regional",
                  "intensity",
                  "{from}",
                  "{to}",
                ],
                "select": {
                  "exist": [
                    "from",
                    "to",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "intensity_id",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "postcode",
                      "orig": "postcode",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/regional/intensity/{from}/fw24h/postcode/{postcode}",
                "parts": [
                  "regional",
                  "intensity",
                  "{intensity_id}",
                  "fw24h",
                  "postcode",
                  "{postcode}",
                ],
                "rename": {
                  "param": {
                    "from": "intensity_id",
                  },
                },
                "select": {
                  "exist": [
                    "intensity_id",
                    "postcode",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "intensity_id",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "postcode",
                      "orig": "postcode",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/regional/intensity/{from}/fw48h/postcode/{postcode}",
                "parts": [
                  "regional",
                  "intensity",
                  "{intensity_id}",
                  "fw48h",
                  "postcode",
                  "{postcode}",
                ],
                "rename": {
                  "param": {
                    "from": "intensity_id",
                  },
                },
                "select": {
                  "exist": [
                    "intensity_id",
                    "postcode",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "intensity_id",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "postcode",
                      "orig": "postcode",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/regional/intensity/{from}/pt24h/postcode/{postcode}",
                "parts": [
                  "regional",
                  "intensity",
                  "{intensity_id}",
                  "pt24h",
                  "postcode",
                  "{postcode}",
                ],
                "rename": {
                  "param": {
                    "from": "intensity_id",
                  },
                },
                "select": {
                  "exist": [
                    "intensity_id",
                    "postcode",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "intensity_id",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "regionid",
                      "orig": "regionid",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/regional/intensity/{from}/fw24h/regionid/{regionid}",
                "parts": [
                  "regional",
                  "intensity",
                  "{intensity_id}",
                  "fw24h",
                  "regionid",
                  "{regionid}",
                ],
                "rename": {
                  "param": {
                    "from": "intensity_id",
                  },
                },
                "select": {
                  "exist": [
                    "intensity_id",
                    "regionid",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "intensity_id",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "regionid",
                      "orig": "regionid",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/regional/intensity/{from}/fw48h/regionid/{regionid}",
                "parts": [
                  "regional",
                  "intensity",
                  "{intensity_id}",
                  "fw48h",
                  "regionid",
                  "{regionid}",
                ],
                "rename": {
                  "param": {
                    "from": "intensity_id",
                  },
                },
                "select": {
                  "exist": [
                    "intensity_id",
                    "regionid",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "intensity_id",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "regionid",
                      "orig": "regionid",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/regional/intensity/{from}/pt24h/regionid/{regionid}",
                "parts": [
                  "regional",
                  "intensity",
                  "{intensity_id}",
                  "pt24h",
                  "regionid",
                  "{regionid}",
                ],
                "rename": {
                  "param": {
                    "from": "intensity_id",
                  },
                },
                "select": {
                  "exist": [
                    "intensity_id",
                    "regionid",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "intensity",
            ],
            [
              "intensity",
              "postcode",
            ],
            [
              "intensity",
              "regionid",
            ],
          ],
        },
      },
      "stat": {
        "fields": [
          {
            "name": "data",
            "type": "`$ARRAY`",
          },
        ],
        "name": "stat",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "block",
                      "orig": "block",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "param",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "to",
                      "orig": "to",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/intensity/stats/{from}/{to}/{block}",
                "parts": [
                  "intensity",
                  "stats",
                  "{from}",
                  "{to}",
                  "{block}",
                ],
                "select": {
                  "exist": [
                    "block",
                    "from",
                    "to",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "to",
                      "orig": "to",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/intensity/stats/{from}/{to}",
                "parts": [
                  "intensity",
                  "stats",
                  "{from}",
                  "{to}",
                ],
                "select": {
                  "exist": [
                    "from",
                    "to",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "stat",
            ],
          ],
        },
      },
    },
    }
