<?php
declare(strict_types=1);

// CarbonIntensity SDK configuration

class CarbonIntensityConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "CarbonIntensity",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.carbonintensity.org.uk",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "generation" => [],
                    "generation_list" => [],
                    "intensity" => [],
                    "intensity_factor" => [],
                    "intensity_list" => [],
                    "regional" => [],
                    "regional_intensity" => [],
                    "regional_intensity_list" => [],
                    "stat" => [],
                ],
            ],
            "entity" => [
        'generation' => [
          'fields' => [
            [
              'name' => 'data',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'from',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'generationmix',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'to',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'generation',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/generation',
                  'parts' => [
                    'generation',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'to',
                        'orig' => 'to',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/generation/{from}/{to}',
                  'parts' => [
                    'generation',
                    '{from}',
                    '{to}',
                  ],
                  'select' => [
                    'exist' => [
                      'from',
                      'to',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'generation',
              ],
            ],
          ],
        ],
        'generation_list' => [
          'fields' => [
            [
              'name' => 'from',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'generationmix',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'to',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'generation_list',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/generation/{from}/pt24h',
                  'parts' => [
                    'generation',
                    '{from}',
                    'pt24h',
                  ],
                  'select' => [
                    'exist' => [
                      'from',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'generation',
              ],
            ],
          ],
        ],
        'intensity' => [
          'fields' => [
            [
              'name' => 'data',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'from',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'intensity',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'to',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'intensity',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/intensity',
                  'parts' => [
                    'intensity',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'date',
                        'orig' => 'date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'period',
                        'orig' => 'period',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/intensity/date/{date}/{period}',
                  'parts' => [
                    'intensity',
                    'date',
                    '{date}',
                    '{period}',
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                      'period',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'to',
                        'orig' => 'to',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/intensity/{from}/{to}',
                  'parts' => [
                    'intensity',
                    '{from}',
                    '{to}',
                  ],
                  'select' => [
                    'exist' => [
                      'from',
                      'to',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/intensity/{from}',
                  'parts' => [
                    'intensity',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'from' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'date',
              ],
              [
                'intensity',
              ],
            ],
          ],
        ],
        'intensity_factor' => [
          'fields' => [
            [
              'name' => 'Biomass',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'Coal',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'DutchImports',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'FrenchImports',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'GasCombinedCycle',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'GasOpenCycle',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'Hydro',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'IrishImports',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'Nuclear',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'Oil',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'Other',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'PumpedStorage',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'Solar',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'Wind',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'intensity_factor',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/intensity/factors',
                  'parts' => [
                    'intensity',
                    'factors',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'intensity_list' => [
          'fields' => [
            [
              'name' => 'data',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'from',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'intensity',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'to',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'intensity_list',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/intensity/{from}/fw24h',
                  'parts' => [
                    'intensity',
                    '{from}',
                    'fw24h',
                  ],
                  'select' => [
                    'exist' => [
                      'from',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/intensity/{from}/fw48h',
                  'parts' => [
                    'intensity',
                    '{from}',
                    'fw48h',
                  ],
                  'select' => [
                    'exist' => [
                      'from',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/intensity/{from}/pt24h',
                  'parts' => [
                    'intensity',
                    '{from}',
                    'pt24h',
                  ],
                  'select' => [
                    'exist' => [
                      'from',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/intensity/date',
                  'parts' => [
                    'intensity',
                    'date',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'date',
                        'orig' => 'date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/intensity/date/{date}',
                  'parts' => [
                    'intensity',
                    'date',
                    '{date}',
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'date',
              ],
              [
                'intensity',
              ],
            ],
          ],
        ],
        'regional' => [
          'fields' => [
            [
              'name' => 'data',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'dnoregion',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'postcode',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'regionid',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'shortname',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'regional',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional',
                  'parts' => [
                    'regional',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'regional_intensity' => [
          'fields' => [
            [
              'name' => 'data',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'dnoregion',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'postcode',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'regionid',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'shortname',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'regional_intensity',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional/england',
                  'parts' => [
                    'regional',
                    'england',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional/scotland',
                  'parts' => [
                    'regional',
                    'scotland',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional/wales',
                  'parts' => [
                    'regional',
                    'wales',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'postcode',
                        'orig' => 'postcode',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional/postcode/{postcode}',
                  'parts' => [
                    'regional',
                    'postcode',
                    '{postcode}',
                  ],
                  'select' => [
                    'exist' => [
                      'postcode',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'regionid',
                        'orig' => 'regionid',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional/regionid/{regionid}',
                  'parts' => [
                    'regional',
                    'regionid',
                    '{regionid}',
                  ],
                  'select' => [
                    'exist' => [
                      'regionid',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'postcode',
              ],
              [
                'regionid',
              ],
            ],
          ],
        ],
        'regional_intensity_list' => [
          'fields' => [
            [
              'name' => 'data',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'dnoregion',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'postcode',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'regionid',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'shortname',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'regional_intensity_list',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional/intensity/{from}/fw24h',
                  'parts' => [
                    'regional',
                    'intensity',
                    '{from}',
                    'fw24h',
                  ],
                  'select' => [
                    'exist' => [
                      'from',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional/intensity/{from}/fw48h',
                  'parts' => [
                    'regional',
                    'intensity',
                    '{from}',
                    'fw48h',
                  ],
                  'select' => [
                    'exist' => [
                      'from',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional/intensity/{from}/pt24h',
                  'parts' => [
                    'regional',
                    'intensity',
                    '{from}',
                    'pt24h',
                  ],
                  'select' => [
                    'exist' => [
                      'from',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'intensity_id',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'postcode',
                        'orig' => 'postcode',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'to',
                        'orig' => 'to',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional/intensity/{from}/{to}/postcode/{postcode}',
                  'parts' => [
                    'regional',
                    'intensity',
                    '{intensity_id}',
                    '{to}',
                    'postcode',
                    '{postcode}',
                  ],
                  'rename' => [
                    'param' => [
                      'from' => 'intensity_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'intensity_id',
                      'postcode',
                      'to',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'intensity_id',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'regionid',
                        'orig' => 'regionid',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'to',
                        'orig' => 'to',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional/intensity/{from}/{to}/regionid/{regionid}',
                  'parts' => [
                    'regional',
                    'intensity',
                    '{intensity_id}',
                    '{to}',
                    'regionid',
                    '{regionid}',
                  ],
                  'rename' => [
                    'param' => [
                      'from' => 'intensity_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'intensity_id',
                      'regionid',
                      'to',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'to',
                        'orig' => 'to',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional/intensity/{from}/{to}',
                  'parts' => [
                    'regional',
                    'intensity',
                    '{from}',
                    '{to}',
                  ],
                  'select' => [
                    'exist' => [
                      'from',
                      'to',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'intensity_id',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'postcode',
                        'orig' => 'postcode',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional/intensity/{from}/fw24h/postcode/{postcode}',
                  'parts' => [
                    'regional',
                    'intensity',
                    '{intensity_id}',
                    'fw24h',
                    'postcode',
                    '{postcode}',
                  ],
                  'rename' => [
                    'param' => [
                      'from' => 'intensity_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'intensity_id',
                      'postcode',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'intensity_id',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'postcode',
                        'orig' => 'postcode',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional/intensity/{from}/fw48h/postcode/{postcode}',
                  'parts' => [
                    'regional',
                    'intensity',
                    '{intensity_id}',
                    'fw48h',
                    'postcode',
                    '{postcode}',
                  ],
                  'rename' => [
                    'param' => [
                      'from' => 'intensity_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'intensity_id',
                      'postcode',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'intensity_id',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'postcode',
                        'orig' => 'postcode',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional/intensity/{from}/pt24h/postcode/{postcode}',
                  'parts' => [
                    'regional',
                    'intensity',
                    '{intensity_id}',
                    'pt24h',
                    'postcode',
                    '{postcode}',
                  ],
                  'rename' => [
                    'param' => [
                      'from' => 'intensity_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'intensity_id',
                      'postcode',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'intensity_id',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'regionid',
                        'orig' => 'regionid',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional/intensity/{from}/fw24h/regionid/{regionid}',
                  'parts' => [
                    'regional',
                    'intensity',
                    '{intensity_id}',
                    'fw24h',
                    'regionid',
                    '{regionid}',
                  ],
                  'rename' => [
                    'param' => [
                      'from' => 'intensity_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'intensity_id',
                      'regionid',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'intensity_id',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'regionid',
                        'orig' => 'regionid',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional/intensity/{from}/fw48h/regionid/{regionid}',
                  'parts' => [
                    'regional',
                    'intensity',
                    '{intensity_id}',
                    'fw48h',
                    'regionid',
                    '{regionid}',
                  ],
                  'rename' => [
                    'param' => [
                      'from' => 'intensity_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'intensity_id',
                      'regionid',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'intensity_id',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'regionid',
                        'orig' => 'regionid',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional/intensity/{from}/pt24h/regionid/{regionid}',
                  'parts' => [
                    'regional',
                    'intensity',
                    '{intensity_id}',
                    'pt24h',
                    'regionid',
                    '{regionid}',
                  ],
                  'rename' => [
                    'param' => [
                      'from' => 'intensity_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'intensity_id',
                      'regionid',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'intensity',
              ],
              [
                'intensity',
                'postcode',
              ],
              [
                'intensity',
                'regionid',
              ],
            ],
          ],
        ],
        'stat' => [
          'fields' => [
            [
              'name' => 'data',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'stat',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'block',
                        'orig' => 'block',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'to',
                        'orig' => 'to',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/intensity/stats/{from}/{to}/{block}',
                  'parts' => [
                    'intensity',
                    'stats',
                    '{from}',
                    '{to}',
                    '{block}',
                  ],
                  'select' => [
                    'exist' => [
                      'block',
                      'from',
                      'to',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'to',
                        'orig' => 'to',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/intensity/stats/{from}/{to}',
                  'parts' => [
                    'intensity',
                    'stats',
                    '{from}',
                    '{to}',
                  ],
                  'select' => [
                    'exist' => [
                      'from',
                      'to',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'stat',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return CarbonIntensityFeatures::make_feature($name);
    }
}
