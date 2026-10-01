import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "generation",
    "accessor": "Generation",
    "op": "list",
    "method": "GET",
    "path": "/generation",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "from": "2026-01-01T00:00:00Z",
          "generationmix": [
            {
              "fuel": "x",
              "perc": 1
            }
          ],
          "to": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "generation",
    "accessor": "Generation",
    "op": "load",
    "method": "GET",
    "path": "/generation/{from}/{to}",
    "args": [
      {
        "name": "from",
        "wire": "from",
        "value": "p1"
      },
      {
        "name": "to",
        "wire": "to",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "from": "2026-01-01T00:00:00Z",
          "generationmix": [
            {
              "fuel": "x",
              "perc": 1
            }
          ],
          "to": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "generation_list",
    "accessor": "GenerationList",
    "op": "list",
    "method": "GET",
    "path": "/generation/{from}/pt24h",
    "args": [
      {
        "name": "from",
        "wire": "from",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "from": "2026-01-01T00:00:00Z",
          "generationmix": [
            {
              "fuel": "x",
              "perc": 1
            }
          ],
          "to": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "intensity",
    "accessor": "Intensity",
    "op": "list",
    "method": "GET",
    "path": "/intensity",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "from": "2026-01-01T00:00:00Z",
          "intensity": {
            "actual": 1,
            "forecast": 1,
            "index": "very low"
          },
          "to": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "intensity",
    "accessor": "Intensity",
    "op": "load",
    "method": "GET",
    "path": "/intensity/date/{date}/{period}",
    "args": [
      {
        "name": "date",
        "wire": "date",
        "value": "p1"
      },
      {
        "name": "period",
        "wire": "period",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "from": "2026-01-01T00:00:00Z",
          "intensity": {
            "actual": 1,
            "forecast": 1,
            "index": "very low"
          },
          "to": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "intensity",
    "accessor": "Intensity",
    "op": "load",
    "method": "GET",
    "path": "/intensity/{from}/{to}",
    "args": [
      {
        "name": "from",
        "wire": "from",
        "value": "p1"
      },
      {
        "name": "to",
        "wire": "to",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "from": "2026-01-01T00:00:00Z",
          "intensity": {
            "actual": 1,
            "forecast": 1,
            "index": "very low"
          },
          "to": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "intensity",
    "accessor": "Intensity",
    "op": "load",
    "method": "GET",
    "path": "/intensity/{from}",
    "args": [
      {
        "name": "id",
        "wire": "from",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "from": "2026-01-01T00:00:00Z",
          "intensity": {
            "actual": 1,
            "forecast": 1,
            "index": "very low"
          },
          "to": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "intensity_factor",
    "accessor": "IntensityFactor",
    "op": "list",
    "method": "GET",
    "path": "/intensity/factors",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "Biomass": 1,
          "Coal": 1,
          "Dutch Imports": 1,
          "French Imports": 1,
          "Gas (Combined Cycle)": 1,
          "Gas (Open Cycle)": 1,
          "Hydro": 1,
          "Irish Imports": 1,
          "Nuclear": 1,
          "Oil": 1,
          "Other": 1,
          "Pumped Storage": 1,
          "Solar": 1,
          "Wind": 1
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "intensity_list",
    "accessor": "IntensityList",
    "op": "list",
    "method": "GET",
    "path": "/intensity/date",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "from": "2026-01-01T00:00:00Z",
          "intensity": {
            "actual": 1,
            "forecast": 1,
            "index": "very low"
          },
          "to": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "intensity_list",
    "accessor": "IntensityList",
    "op": "load",
    "method": "GET",
    "path": "/intensity/date/{date}",
    "args": [
      {
        "name": "date",
        "wire": "date",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "from": "2026-01-01T00:00:00Z",
          "intensity": {
            "actual": 1,
            "forecast": 1,
            "index": "very low"
          },
          "to": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "regional",
    "accessor": "Regional",
    "op": "list",
    "method": "GET",
    "path": "/regional",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "data": [
            {
              "from": "2026-01-01T00:00:00Z",
              "generationmix": [
                {}
              ],
              "intensity": {
                "forecast": 1,
                "index": "x"
              },
              "to": "2026-01-01T00:00:00Z"
            }
          ],
          "dnoregion": "x",
          "postcode": "x",
          "regionid": 1,
          "shortname": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "regional_intensity",
    "accessor": "RegionalIntensity",
    "op": "load",
    "method": "GET",
    "path": "/regional/postcode/{postcode}",
    "args": [
      {
        "name": "postcode",
        "wire": "postcode",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "data": [
            {
              "from": "2026-01-01T00:00:00Z",
              "generationmix": [
                {}
              ],
              "intensity": {
                "forecast": 1,
                "index": "x"
              },
              "to": "2026-01-01T00:00:00Z"
            }
          ],
          "dnoregion": "x",
          "postcode": "x",
          "regionid": 1,
          "shortname": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "regional_intensity",
    "accessor": "RegionalIntensity",
    "op": "load",
    "method": "GET",
    "path": "/regional/regionid/{regionid}",
    "args": [
      {
        "name": "regionid",
        "wire": "regionid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "data": [
            {
              "from": "2026-01-01T00:00:00Z",
              "generationmix": [
                {}
              ],
              "intensity": {
                "forecast": 1,
                "index": "x"
              },
              "to": "2026-01-01T00:00:00Z"
            }
          ],
          "dnoregion": "x",
          "postcode": "x",
          "regionid": 1,
          "shortname": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "regional_intensity_list",
    "accessor": "RegionalIntensityList",
    "op": "load",
    "method": "GET",
    "path": "/regional/intensity/{from}/{to}/postcode/{postcode}",
    "args": [
      {
        "name": "intensity_id",
        "wire": "from",
        "value": "p1"
      },
      {
        "name": "postcode",
        "wire": "postcode",
        "value": "p2"
      },
      {
        "name": "to",
        "wire": "to",
        "value": "p3"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "data": [
            {
              "from": "2026-01-01T00:00:00Z",
              "generationmix": [
                {}
              ],
              "intensity": {
                "forecast": 1,
                "index": "x"
              },
              "to": "2026-01-01T00:00:00Z"
            }
          ],
          "dnoregion": "x",
          "postcode": "x",
          "regionid": 1,
          "shortname": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "regional_intensity_list",
    "accessor": "RegionalIntensityList",
    "op": "load",
    "method": "GET",
    "path": "/regional/intensity/{from}/{to}/regionid/{regionid}",
    "args": [
      {
        "name": "intensity_id",
        "wire": "from",
        "value": "p1"
      },
      {
        "name": "regionid",
        "wire": "regionid",
        "value": "p2"
      },
      {
        "name": "to",
        "wire": "to",
        "value": "p3"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "data": [
            {
              "from": "2026-01-01T00:00:00Z",
              "generationmix": [
                {}
              ],
              "intensity": {
                "forecast": 1,
                "index": "x"
              },
              "to": "2026-01-01T00:00:00Z"
            }
          ],
          "dnoregion": "x",
          "postcode": "x",
          "regionid": 1,
          "shortname": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "regional_intensity_list",
    "accessor": "RegionalIntensityList",
    "op": "load",
    "method": "GET",
    "path": "/regional/intensity/{from}/{to}",
    "args": [
      {
        "name": "from",
        "wire": "from",
        "value": "p1"
      },
      {
        "name": "to",
        "wire": "to",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "data": [
            {
              "from": "2026-01-01T00:00:00Z",
              "generationmix": [
                {}
              ],
              "intensity": {
                "forecast": 1,
                "index": "x"
              },
              "to": "2026-01-01T00:00:00Z"
            }
          ],
          "dnoregion": "x",
          "postcode": "x",
          "regionid": 1,
          "shortname": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "stat",
    "accessor": "Stat",
    "op": "load",
    "method": "GET",
    "path": "/intensity/stats/{from}/{to}/{block}",
    "args": [
      {
        "name": "block",
        "wire": "block",
        "value": "p1"
      },
      {
        "name": "from",
        "wire": "from",
        "value": "p2"
      },
      {
        "name": "to",
        "wire": "to",
        "value": "p3"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "from": "2026-01-01T00:00:00Z",
          "to": "2026-01-01T00:00:00Z",
          "intensity": {
            "max": 1,
            "average": 1,
            "min": 1,
            "index": "x"
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "stat",
    "accessor": "Stat",
    "op": "load",
    "method": "GET",
    "path": "/intensity/stats/{from}/{to}",
    "args": [
      {
        "name": "from",
        "wire": "from",
        "value": "p1"
      },
      {
        "name": "to",
        "wire": "to",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "from": "2026-01-01T00:00:00Z",
          "to": "2026-01-01T00:00:00Z",
          "intensity": {
            "max": 1,
            "average": 1,
            "min": 1,
            "index": "x"
          }
        }
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
