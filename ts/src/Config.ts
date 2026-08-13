
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'CarbonIntensity',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://api.carbonintensity.org.uk',

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      generation: {
      },

      generation_list: {
      },

      intensity: {
      },

      intensity_factor: {
      },

      intensity_list: {
      },

      regional: {
      },

      regional_intensity: {
      },

      regional_intensity_list: {
      },

      stat: {
      },

    }
  }


  entity = {
    "generation": {
      "fields": [
        {
          "active": true,
          "name": "from",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "generationmix",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 1
        },
        {
          "active": true,
          "name": "to",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        }
      ],
      "name": "generation",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "from",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "to",
                    "orig": "to",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/generation/{from}/{to}",
              "parts": [
                "generation",
                "{from}",
                "{to}"
              ],
              "select": {
                "exist": [
                  "from",
                  "to"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/generation",
              "parts": [
                "generation"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 1
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": [
          [
            "generation"
          ]
        ]
      }
    },
    "generation_list": {
      "fields": [
        {
          "active": true,
          "name": "from",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "generationmix",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 1
        },
        {
          "active": true,
          "name": "to",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        }
      ],
      "name": "generation_list",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "from",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/generation/{from}/pt24h",
              "parts": [
                "generation",
                "{from}",
                "pt24h"
              ],
              "select": {
                "exist": [
                  "from"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": [
          [
            "generation"
          ]
        ]
      }
    },
    "intensity": {
      "fields": [
        {
          "active": true,
          "name": "data",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "from",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "intensity",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 2
        },
        {
          "active": true,
          "name": "to",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        }
      ],
      "name": "intensity",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "date",
                    "orig": "date",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "period",
                    "orig": "period",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 1
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/intensity/date/{date}/{period}",
              "parts": [
                "intensity",
                "date",
                "{date}",
                "{period}"
              ],
              "select": {
                "exist": [
                  "date",
                  "period"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "from",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "to",
                    "orig": "to",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/intensity/{from}/{to}",
              "parts": [
                "intensity",
                "{from}",
                "{to}"
              ],
              "select": {
                "exist": [
                  "from",
                  "to"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 1
            },
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/intensity",
              "parts": [
                "intensity"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 2
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/intensity/{from}",
              "parts": [
                "intensity",
                "{id}"
              ],
              "rename": {
                "param": {
                  "from": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "date"
          ],
          [
            "intensity"
          ]
        ]
      }
    },
    "intensity_factor": {
      "fields": [
        {
          "active": true,
          "name": "Biomass",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "Coal",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "DutchImports",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "FrenchImports",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "GasCombinedCycle",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 4
        },
        {
          "active": true,
          "name": "GasOpenCycle",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 5
        },
        {
          "active": true,
          "name": "Hydro",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 6
        },
        {
          "active": true,
          "name": "IrishImports",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 7
        },
        {
          "active": true,
          "name": "Nuclear",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 8
        },
        {
          "active": true,
          "name": "Oil",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 9
        },
        {
          "active": true,
          "name": "Other",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 10
        },
        {
          "active": true,
          "name": "PumpedStorage",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 11
        },
        {
          "active": true,
          "name": "Solar",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 12
        },
        {
          "active": true,
          "name": "Wind",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 13
        }
      ],
      "name": "intensity_factor",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/intensity/factors",
              "parts": [
                "intensity",
                "factors"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "intensity_list": {
      "fields": [
        {
          "active": true,
          "name": "data",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "from",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "intensity",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 2
        },
        {
          "active": true,
          "name": "to",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        }
      ],
      "name": "intensity_list",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "from",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/intensity/{from}/fw24h",
              "parts": [
                "intensity",
                "{from}",
                "fw24h"
              ],
              "select": {
                "exist": [
                  "from"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "from",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/intensity/{from}/fw48h",
              "parts": [
                "intensity",
                "{from}",
                "fw48h"
              ],
              "select": {
                "exist": [
                  "from"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 1
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "from",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/intensity/{from}/pt24h",
              "parts": [
                "intensity",
                "{from}",
                "pt24h"
              ],
              "select": {
                "exist": [
                  "from"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 2
            },
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/intensity/date",
              "parts": [
                "intensity",
                "date"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 3
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "date",
                    "orig": "date",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/intensity/date/{date}",
              "parts": [
                "intensity",
                "date",
                "{date}"
              ],
              "select": {
                "exist": [
                  "date"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "date"
          ],
          [
            "intensity"
          ]
        ]
      }
    },
    "regional": {
      "fields": [
        {
          "active": true,
          "name": "data",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "dnoregion",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "postcode",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "regionid",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "shortname",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        }
      ],
      "name": "regional",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/regional",
              "parts": [
                "regional"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "regional_intensity": {
      "fields": [
        {
          "active": true,
          "name": "data",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "dnoregion",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "postcode",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "regionid",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "shortname",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        }
      ],
      "name": "regional_intensity",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/regional/england",
              "parts": [
                "regional",
                "england"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/regional/scotland",
              "parts": [
                "regional",
                "scotland"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 1
            },
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/regional/wales",
              "parts": [
                "regional",
                "wales"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 2
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "postcode",
                    "orig": "postcode",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/regional/postcode/{postcode}",
              "parts": [
                "regional",
                "postcode",
                "{postcode}"
              ],
              "select": {
                "exist": [
                  "postcode"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "regionid",
                    "orig": "regionid",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/regional/regionid/{regionid}",
              "parts": [
                "regional",
                "regionid",
                "{regionid}"
              ],
              "select": {
                "exist": [
                  "regionid"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 1
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "postcode"
          ],
          [
            "regionid"
          ]
        ]
      }
    },
    "regional_intensity_list": {
      "fields": [
        {
          "active": true,
          "name": "data",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "dnoregion",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "postcode",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "regionid",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "shortname",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        }
      ],
      "name": "regional_intensity_list",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "from",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "to",
                    "orig": "to",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/regional/intensity/{from}/{to}",
              "parts": [
                "regional",
                "intensity",
                "{from}",
                "{to}"
              ],
              "select": {
                "exist": [
                  "from",
                  "to"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "from",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/regional/intensity/{from}/fw24h",
              "parts": [
                "regional",
                "intensity",
                "{from}",
                "fw24h"
              ],
              "select": {
                "exist": [
                  "from"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 1
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "from",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/regional/intensity/{from}/fw48h",
              "parts": [
                "regional",
                "intensity",
                "{from}",
                "fw48h"
              ],
              "select": {
                "exist": [
                  "from"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 2
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "from",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/regional/intensity/{from}/pt24h",
              "parts": [
                "regional",
                "intensity",
                "{from}",
                "pt24h"
              ],
              "select": {
                "exist": [
                  "from"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 3
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "intensity_id",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "postcode",
                    "orig": "postcode",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "to",
                    "orig": "to",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 2
                  }
                ]
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
                "{postcode}"
              ],
              "rename": {
                "param": {
                  "from": "intensity_id"
                }
              },
              "select": {
                "exist": [
                  "intensity_id",
                  "postcode",
                  "to"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "intensity_id",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "regionid",
                    "orig": "regionid",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 1
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "to",
                    "orig": "to",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 2
                  }
                ]
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
                "{regionid}"
              ],
              "rename": {
                "param": {
                  "from": "intensity_id"
                }
              },
              "select": {
                "exist": [
                  "intensity_id",
                  "regionid",
                  "to"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 1
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "intensity_id",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "postcode",
                    "orig": "postcode",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ]
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
                "{postcode}"
              ],
              "rename": {
                "param": {
                  "from": "intensity_id"
                }
              },
              "select": {
                "exist": [
                  "intensity_id",
                  "postcode"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 2
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "intensity_id",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "postcode",
                    "orig": "postcode",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ]
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
                "{postcode}"
              ],
              "rename": {
                "param": {
                  "from": "intensity_id"
                }
              },
              "select": {
                "exist": [
                  "intensity_id",
                  "postcode"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 3
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "intensity_id",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "postcode",
                    "orig": "postcode",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ]
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
                "{postcode}"
              ],
              "rename": {
                "param": {
                  "from": "intensity_id"
                }
              },
              "select": {
                "exist": [
                  "intensity_id",
                  "postcode"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 4
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "intensity_id",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "regionid",
                    "orig": "regionid",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 1
                  }
                ]
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
                "{regionid}"
              ],
              "rename": {
                "param": {
                  "from": "intensity_id"
                }
              },
              "select": {
                "exist": [
                  "intensity_id",
                  "regionid"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 5
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "intensity_id",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "regionid",
                    "orig": "regionid",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 1
                  }
                ]
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
                "{regionid}"
              ],
              "rename": {
                "param": {
                  "from": "intensity_id"
                }
              },
              "select": {
                "exist": [
                  "intensity_id",
                  "regionid"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 6
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "intensity_id",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "regionid",
                    "orig": "regionid",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 1
                  }
                ]
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
                "{regionid}"
              ],
              "rename": {
                "param": {
                  "from": "intensity_id"
                }
              },
              "select": {
                "exist": [
                  "intensity_id",
                  "regionid"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 7
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "intensity"
          ],
          [
            "intensity",
            "postcode"
          ],
          [
            "intensity",
            "regionid"
          ]
        ]
      }
    },
    "stat": {
      "fields": [
        {
          "active": true,
          "name": "from",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "intensity",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 1
        },
        {
          "active": true,
          "name": "to",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        }
      ],
      "name": "stat",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "block",
                    "orig": "block",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "from",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "to",
                    "orig": "to",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 2
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/intensity/stats/{from}/{to}/{block}",
              "parts": [
                "intensity",
                "stats",
                "{from}",
                "{to}",
                "{block}"
              ],
              "select": {
                "exist": [
                  "block",
                  "from",
                  "to"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "from",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "to",
                    "orig": "to",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/intensity/stats/{from}/{to}",
              "parts": [
                "intensity",
                "stats",
                "{from}",
                "{to}"
              ],
              "select": {
                "exist": [
                  "from",
                  "to"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 1
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": [
          [
            "stat"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config
}

