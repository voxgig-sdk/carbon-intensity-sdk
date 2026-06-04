# CarbonIntensity SDK configuration

module CarbonIntensityConfig
  def self.make_config
    {
      "main" => {
        "name" => "CarbonIntensity",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.carbonintensity.org.uk",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "generation" => {},
          "generation_list" => {},
          "intensity" => {},
          "intensity_factor" => {},
          "intensity_list" => {},
          "regional" => {},
          "regional_intensity" => {},
          "regional_intensity_list" => {},
          "stat" => {},
        },
      },
      "entity" => {
        "generation" => {
          "fields" => [
            {
              "name" => "from",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "generationmix",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "to",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
          ],
          "name" => "generation",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "from",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "to",
                        "orig" => "to",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/generation/{from}/{to}",
                  "parts" => [
                    "generation",
                    "{from}",
                    "{to}",
                  ],
                  "select" => {
                    "exist" => [
                      "from",
                      "to",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "method" => "GET",
                  "orig" => "/generation",
                  "parts" => [
                    "generation",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 1,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "generation",
              ],
            ],
          },
        },
        "generation_list" => {
          "fields" => [
            {
              "name" => "from",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "generationmix",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "to",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
          ],
          "name" => "generation_list",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "from",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/generation/{from}/pt24h",
                  "parts" => [
                    "generation",
                    "{from}",
                    "pt24h",
                  ],
                  "select" => {
                    "exist" => [
                      "from",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "generation",
              ],
            ],
          },
        },
        "intensity" => {
          "fields" => [
            {
              "name" => "data",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "from",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "intensity",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "to",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
          ],
          "name" => "intensity",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "date",
                        "orig" => "date",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "period",
                        "orig" => "period",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/intensity/date/{date}/{period}",
                  "parts" => [
                    "intensity",
                    "date",
                    "{date}",
                    "{period}",
                  ],
                  "select" => {
                    "exist" => [
                      "date",
                      "period",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "from",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "to",
                        "orig" => "to",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/intensity/{from}/{to}",
                  "parts" => [
                    "intensity",
                    "{from}",
                    "{to}",
                  ],
                  "select" => {
                    "exist" => [
                      "from",
                      "to",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
                {
                  "method" => "GET",
                  "orig" => "/intensity",
                  "parts" => [
                    "intensity",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 2,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/intensity/{from}",
                  "parts" => [
                    "intensity",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "from" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "date",
              ],
              [
                "intensity",
              ],
            ],
          },
        },
        "intensity_factor" => {
          "fields" => [
            {
              "name" => "biomass",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "coal",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "dutch_import",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "french_import",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "gas__combined_cycle",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "gas__open_cycle",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "hydro",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 6,
            },
            {
              "name" => "irish_import",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 7,
            },
            {
              "name" => "nuclear",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 8,
            },
            {
              "name" => "oil",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 9,
            },
            {
              "name" => "other",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 10,
            },
            {
              "name" => "pumped_storage",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 11,
            },
            {
              "name" => "solar",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 12,
            },
            {
              "name" => "wind",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 13,
            },
          ],
          "name" => "intensity_factor",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/intensity/factors",
                  "parts" => [
                    "intensity",
                    "factors",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "intensity_list" => {
          "fields" => [
            {
              "name" => "data",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "from",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "intensity",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "to",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
          ],
          "name" => "intensity_list",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "from",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/intensity/{from}/fw24h",
                  "parts" => [
                    "intensity",
                    "{from}",
                    "fw24h",
                  ],
                  "select" => {
                    "exist" => [
                      "from",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "from",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/intensity/{from}/fw48h",
                  "parts" => [
                    "intensity",
                    "{from}",
                    "fw48h",
                  ],
                  "select" => {
                    "exist" => [
                      "from",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "from",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/intensity/{from}/pt24h",
                  "parts" => [
                    "intensity",
                    "{from}",
                    "pt24h",
                  ],
                  "select" => {
                    "exist" => [
                      "from",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 2,
                },
                {
                  "method" => "GET",
                  "orig" => "/intensity/date",
                  "parts" => [
                    "intensity",
                    "date",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 3,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "date",
                        "orig" => "date",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/intensity/date/{date}",
                  "parts" => [
                    "intensity",
                    "date",
                    "{date}",
                  ],
                  "select" => {
                    "exist" => [
                      "date",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "date",
              ],
              [
                "intensity",
              ],
            ],
          },
        },
        "regional" => {
          "fields" => [
            {
              "name" => "data",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "dnoregion",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "postcode",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "regionid",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "shortname",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
          ],
          "name" => "regional",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/regional",
                  "parts" => [
                    "regional",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "regional_intensity" => {
          "fields" => [
            {
              "name" => "data",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "dnoregion",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "postcode",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "regionid",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "shortname",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
          ],
          "name" => "regional_intensity",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/regional/england",
                  "parts" => [
                    "regional",
                    "england",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
                {
                  "method" => "GET",
                  "orig" => "/regional/scotland",
                  "parts" => [
                    "regional",
                    "scotland",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 1,
                },
                {
                  "method" => "GET",
                  "orig" => "/regional/wales",
                  "parts" => [
                    "regional",
                    "wales",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 2,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "postcode",
                        "orig" => "postcode",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/regional/postcode/{postcode}",
                  "parts" => [
                    "regional",
                    "postcode",
                    "{postcode}",
                  ],
                  "select" => {
                    "exist" => [
                      "postcode",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "regionid",
                        "orig" => "regionid",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/regional/regionid/{regionid}",
                  "parts" => [
                    "regional",
                    "regionid",
                    "{regionid}",
                  ],
                  "select" => {
                    "exist" => [
                      "regionid",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "postcode",
              ],
              [
                "regionid",
              ],
            ],
          },
        },
        "regional_intensity_list" => {
          "fields" => [
            {
              "name" => "data",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "dnoregion",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "postcode",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "regionid",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "shortname",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
          ],
          "name" => "regional_intensity_list",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "from",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "to",
                        "orig" => "to",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/regional/intensity/{from}/{to}",
                  "parts" => [
                    "regional",
                    "intensity",
                    "{from}",
                    "{to}",
                  ],
                  "select" => {
                    "exist" => [
                      "from",
                      "to",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "from",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/regional/intensity/{from}/fw24h",
                  "parts" => [
                    "regional",
                    "intensity",
                    "{from}",
                    "fw24h",
                  ],
                  "select" => {
                    "exist" => [
                      "from",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "from",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/regional/intensity/{from}/fw48h",
                  "parts" => [
                    "regional",
                    "intensity",
                    "{from}",
                    "fw48h",
                  ],
                  "select" => {
                    "exist" => [
                      "from",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 2,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "from",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/regional/intensity/{from}/pt24h",
                  "parts" => [
                    "regional",
                    "intensity",
                    "{from}",
                    "pt24h",
                  ],
                  "select" => {
                    "exist" => [
                      "from",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 3,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "intensity_id",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "postcode",
                        "orig" => "postcode",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "to",
                        "orig" => "to",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/regional/intensity/{from}/{to}/postcode/{postcode}",
                  "parts" => [
                    "regional",
                    "intensity",
                    "{intensity_id}",
                    "{to}",
                    "postcode",
                    "{postcode}",
                  ],
                  "rename" => {
                    "param" => {
                      "from" => "intensity_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "intensity_id",
                      "postcode",
                      "to",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "intensity_id",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "regionid",
                        "orig" => "regionid",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "to",
                        "orig" => "to",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/regional/intensity/{from}/{to}/regionid/{regionid}",
                  "parts" => [
                    "regional",
                    "intensity",
                    "{intensity_id}",
                    "{to}",
                    "regionid",
                    "{regionid}",
                  ],
                  "rename" => {
                    "param" => {
                      "from" => "intensity_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "intensity_id",
                      "regionid",
                      "to",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "intensity_id",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "postcode",
                        "orig" => "postcode",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/regional/intensity/{from}/fw24h/postcode/{postcode}",
                  "parts" => [
                    "regional",
                    "intensity",
                    "{intensity_id}",
                    "fw24h",
                    "postcode",
                    "{postcode}",
                  ],
                  "rename" => {
                    "param" => {
                      "from" => "intensity_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "intensity_id",
                      "postcode",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 2,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "intensity_id",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "postcode",
                        "orig" => "postcode",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/regional/intensity/{from}/fw48h/postcode/{postcode}",
                  "parts" => [
                    "regional",
                    "intensity",
                    "{intensity_id}",
                    "fw48h",
                    "postcode",
                    "{postcode}",
                  ],
                  "rename" => {
                    "param" => {
                      "from" => "intensity_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "intensity_id",
                      "postcode",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 3,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "intensity_id",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "postcode",
                        "orig" => "postcode",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/regional/intensity/{from}/pt24h/postcode/{postcode}",
                  "parts" => [
                    "regional",
                    "intensity",
                    "{intensity_id}",
                    "pt24h",
                    "postcode",
                    "{postcode}",
                  ],
                  "rename" => {
                    "param" => {
                      "from" => "intensity_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "intensity_id",
                      "postcode",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 4,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "intensity_id",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "regionid",
                        "orig" => "regionid",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/regional/intensity/{from}/fw24h/regionid/{regionid}",
                  "parts" => [
                    "regional",
                    "intensity",
                    "{intensity_id}",
                    "fw24h",
                    "regionid",
                    "{regionid}",
                  ],
                  "rename" => {
                    "param" => {
                      "from" => "intensity_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "intensity_id",
                      "regionid",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 5,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "intensity_id",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "regionid",
                        "orig" => "regionid",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/regional/intensity/{from}/fw48h/regionid/{regionid}",
                  "parts" => [
                    "regional",
                    "intensity",
                    "{intensity_id}",
                    "fw48h",
                    "regionid",
                    "{regionid}",
                  ],
                  "rename" => {
                    "param" => {
                      "from" => "intensity_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "intensity_id",
                      "regionid",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 6,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "intensity_id",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "regionid",
                        "orig" => "regionid",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/regional/intensity/{from}/pt24h/regionid/{regionid}",
                  "parts" => [
                    "regional",
                    "intensity",
                    "{intensity_id}",
                    "pt24h",
                    "regionid",
                    "{regionid}",
                  ],
                  "rename" => {
                    "param" => {
                      "from" => "intensity_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "intensity_id",
                      "regionid",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 7,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
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
        "stat" => {
          "fields" => [
            {
              "name" => "from",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "intensity",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "to",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
          ],
          "name" => "stat",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "block",
                        "orig" => "block",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "from",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "to",
                        "orig" => "to",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/intensity/stats/{from}/{to}/{block}",
                  "parts" => [
                    "intensity",
                    "stats",
                    "{from}",
                    "{to}",
                    "{block}",
                  ],
                  "select" => {
                    "exist" => [
                      "block",
                      "from",
                      "to",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "from",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "to",
                        "orig" => "to",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/intensity/stats/{from}/{to}",
                  "parts" => [
                    "intensity",
                    "stats",
                    "{from}",
                    "{to}",
                  ],
                  "select" => {
                    "exist" => [
                      "from",
                      "to",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "stat",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    CarbonIntensityFeatures.make_feature(name)
  end
end
