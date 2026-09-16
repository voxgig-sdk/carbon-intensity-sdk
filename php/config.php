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
                "slug" => "carbon-intensity",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
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
              'format' => 'date-time',
              'name' => 'from',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'generationmix',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'to',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'from' => [
              'from' => 'from',
              'to' => 'to',
            ],
            'name' => 'id',
            'parts' => [
              'from',
              'to',
            ],
            'sep' => '/',
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
                  'segments' => [
                    [
                      'lit' => 'generation',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'parts' => [
                    'generation',
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
                  'segments' => [
                    [
                      'lit' => 'generation',
                    ],
                    [
                      'var' => 'from',
                    ],
                    [
                      'var' => 'to',
                    ],
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
                  'parts' => [
                    'generation',
                    '{from}',
                    '{to}',
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
              'format' => 'date-time',
              'name' => 'from',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'generationmix',
              'type' => '`$ARRAY`',
            ],
            [
              'format' => 'date-time',
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
                  'segments' => [
                    [
                      'lit' => 'generation',
                    ],
                    [
                      'var' => 'from',
                    ],
                    [
                      'lit' => 'pt24h',
                    ],
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
                  'parts' => [
                    'generation',
                    '{from}',
                    'pt24h',
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
              'format' => 'date-time',
              'name' => 'from',
              'short' => 'Start datetime of the period',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'intensity',
              'type' => '`$OBJECT`',
            ],
            [
              'format' => 'date-time',
              'name' => 'to',
              'short' => 'End datetime of the period',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
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
                  'segments' => [
                    [
                      'lit' => 'intensity',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'parts' => [
                    'intensity',
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
                  'segments' => [
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'lit' => 'date',
                    ],
                    [
                      'var' => 'date',
                    ],
                    [
                      'var' => 'period',
                    ],
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
                  'parts' => [
                    'intensity',
                    'date',
                    '{date}',
                    '{period}',
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
                  'segments' => [
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'var' => 'from',
                    ],
                    [
                      'var' => 'to',
                    ],
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
                  'parts' => [
                    'intensity',
                    '{from}',
                    '{to}',
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
                  'rename' => [
                    'param' => [
                      'from' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'var' => 'id',
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
                  'parts' => [
                    'intensity',
                    '{id}',
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
              'short' => 'Carbon intensity factor for biomass (gCO2/kWh)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'Coal',
              'short' => 'Carbon intensity factor for coal (gCO2/kWh)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'DutchImports',
              'short' => 'Carbon intensity factor for Dutch imports (gCO2/kWh)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'FrenchImports',
              'short' => 'Carbon intensity factor for French imports (gCO2/kWh)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'GasCombinedCycle',
              'short' => 'Carbon intensity factor for gas combined cycle (gCO2/kWh)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'GasOpenCycle',
              'short' => 'Carbon intensity factor for gas open cycle (gCO2/kWh)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'Hydro',
              'short' => 'Carbon intensity factor for hydro (gCO2/kWh)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'IrishImports',
              'short' => 'Carbon intensity factor for Irish imports (gCO2/kWh)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'Nuclear',
              'short' => 'Carbon intensity factor for nuclear (gCO2/kWh)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'Oil',
              'short' => 'Carbon intensity factor for oil (gCO2/kWh)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'Other',
              'short' => 'Carbon intensity factor for other (gCO2/kWh)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'PumpedStorage',
              'short' => 'Carbon intensity factor for pumped storage (gCO2/kWh)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'Solar',
              'short' => 'Carbon intensity factor for solar (gCO2/kWh)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'Wind',
              'short' => 'Carbon intensity factor for wind (gCO2/kWh)',
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
                  'segments' => [
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'lit' => 'factors',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'parts' => [
                    'intensity',
                    'factors',
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
              'format' => 'date-time',
              'name' => 'from',
              'short' => 'Start datetime of the period',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'intensity',
              'type' => '`$OBJECT`',
            ],
            [
              'format' => 'date-time',
              'name' => 'to',
              'short' => 'End datetime of the period',
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
                  'segments' => [
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'var' => 'from',
                    ],
                    [
                      'lit' => 'fw24h',
                    ],
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
                  'parts' => [
                    'intensity',
                    '{from}',
                    'fw24h',
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
                  'segments' => [
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'var' => 'from',
                    ],
                    [
                      'lit' => 'fw48h',
                    ],
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
                  'parts' => [
                    'intensity',
                    '{from}',
                    'fw48h',
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
                  'segments' => [
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'var' => 'from',
                    ],
                    [
                      'lit' => 'pt24h',
                    ],
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
                  'parts' => [
                    'intensity',
                    '{from}',
                    'pt24h',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/intensity/date',
                  'segments' => [
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'lit' => 'date',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'parts' => [
                    'intensity',
                    'date',
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
                  'segments' => [
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'lit' => 'date',
                    ],
                    [
                      'var' => 'date',
                    ],
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
                  'parts' => [
                    'intensity',
                    'date',
                    '{date}',
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
              'short' => 'Distribution Network Operator region',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'postcode',
              'short' => 'Outward postcode',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'regionid',
              'short' => 'Region ID (1-17)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'shortname',
              'short' => 'Short region name',
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
                  'segments' => [
                    [
                      'lit' => 'regional',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'parts' => [
                    'regional',
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
              'short' => 'Distribution Network Operator region',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'postcode',
              'short' => 'Outward postcode',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'regionid',
              'short' => 'Region ID (1-17)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'shortname',
              'short' => 'Short region name',
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
                  'segments' => [
                    [
                      'lit' => 'regional',
                    ],
                    [
                      'lit' => 'england',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'parts' => [
                    'regional',
                    'england',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional/scotland',
                  'segments' => [
                    [
                      'lit' => 'regional',
                    ],
                    [
                      'lit' => 'scotland',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'parts' => [
                    'regional',
                    'scotland',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/regional/wales',
                  'segments' => [
                    [
                      'lit' => 'regional',
                    ],
                    [
                      'lit' => 'wales',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'parts' => [
                    'regional',
                    'wales',
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
                  'segments' => [
                    [
                      'lit' => 'regional',
                    ],
                    [
                      'lit' => 'postcode',
                    ],
                    [
                      'var' => 'postcode',
                    ],
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
                  'parts' => [
                    'regional',
                    'postcode',
                    '{postcode}',
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
                  'segments' => [
                    [
                      'lit' => 'regional',
                    ],
                    [
                      'lit' => 'regionid',
                    ],
                    [
                      'var' => 'regionid',
                    ],
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
                  'parts' => [
                    'regional',
                    'regionid',
                    '{regionid}',
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
              'short' => 'Distribution Network Operator region',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'postcode',
              'short' => 'Outward postcode',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'regionid',
              'short' => 'Region ID (1-17)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'shortname',
              'short' => 'Short region name',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
            'parts' => [
              'from',
              'to',
            ],
            'sep' => '/',
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
                  'segments' => [
                    [
                      'lit' => 'regional',
                    ],
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'var' => 'from',
                    ],
                    [
                      'lit' => 'fw24h',
                    ],
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
                  'parts' => [
                    'regional',
                    'intensity',
                    '{from}',
                    'fw24h',
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
                  'segments' => [
                    [
                      'lit' => 'regional',
                    ],
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'var' => 'from',
                    ],
                    [
                      'lit' => 'fw48h',
                    ],
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
                  'parts' => [
                    'regional',
                    'intensity',
                    '{from}',
                    'fw48h',
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
                  'segments' => [
                    [
                      'lit' => 'regional',
                    ],
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'var' => 'from',
                    ],
                    [
                      'lit' => 'pt24h',
                    ],
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
                  'parts' => [
                    'regional',
                    'intensity',
                    '{from}',
                    'pt24h',
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
                  'rename' => [
                    'param' => [
                      'from' => 'intensity_id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'regional',
                    ],
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'var' => 'intensity_id',
                    ],
                    [
                      'var' => 'to',
                    ],
                    [
                      'lit' => 'postcode',
                    ],
                    [
                      'var' => 'postcode',
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
                  'parts' => [
                    'regional',
                    'intensity',
                    '{intensity_id}',
                    '{to}',
                    'postcode',
                    '{postcode}',
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
                  'rename' => [
                    'param' => [
                      'from' => 'intensity_id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'regional',
                    ],
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'var' => 'intensity_id',
                    ],
                    [
                      'var' => 'to',
                    ],
                    [
                      'lit' => 'regionid',
                    ],
                    [
                      'var' => 'regionid',
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
                  'parts' => [
                    'regional',
                    'intensity',
                    '{intensity_id}',
                    '{to}',
                    'regionid',
                    '{regionid}',
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
                  'segments' => [
                    [
                      'lit' => 'regional',
                    ],
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'var' => 'from',
                    ],
                    [
                      'var' => 'to',
                    ],
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
                  'parts' => [
                    'regional',
                    'intensity',
                    '{from}',
                    '{to}',
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
                  'rename' => [
                    'param' => [
                      'from' => 'intensity_id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'regional',
                    ],
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'var' => 'intensity_id',
                    ],
                    [
                      'lit' => 'fw24h',
                    ],
                    [
                      'lit' => 'postcode',
                    ],
                    [
                      'var' => 'postcode',
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
                  'parts' => [
                    'regional',
                    'intensity',
                    '{intensity_id}',
                    'fw24h',
                    'postcode',
                    '{postcode}',
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
                  'rename' => [
                    'param' => [
                      'from' => 'intensity_id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'regional',
                    ],
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'var' => 'intensity_id',
                    ],
                    [
                      'lit' => 'fw48h',
                    ],
                    [
                      'lit' => 'postcode',
                    ],
                    [
                      'var' => 'postcode',
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
                  'parts' => [
                    'regional',
                    'intensity',
                    '{intensity_id}',
                    'fw48h',
                    'postcode',
                    '{postcode}',
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
                  'rename' => [
                    'param' => [
                      'from' => 'intensity_id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'regional',
                    ],
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'var' => 'intensity_id',
                    ],
                    [
                      'lit' => 'pt24h',
                    ],
                    [
                      'lit' => 'postcode',
                    ],
                    [
                      'var' => 'postcode',
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
                  'parts' => [
                    'regional',
                    'intensity',
                    '{intensity_id}',
                    'pt24h',
                    'postcode',
                    '{postcode}',
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
                  'rename' => [
                    'param' => [
                      'from' => 'intensity_id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'regional',
                    ],
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'var' => 'intensity_id',
                    ],
                    [
                      'lit' => 'fw24h',
                    ],
                    [
                      'lit' => 'regionid',
                    ],
                    [
                      'var' => 'regionid',
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
                  'parts' => [
                    'regional',
                    'intensity',
                    '{intensity_id}',
                    'fw24h',
                    'regionid',
                    '{regionid}',
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
                  'rename' => [
                    'param' => [
                      'from' => 'intensity_id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'regional',
                    ],
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'var' => 'intensity_id',
                    ],
                    [
                      'lit' => 'fw48h',
                    ],
                    [
                      'lit' => 'regionid',
                    ],
                    [
                      'var' => 'regionid',
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
                  'parts' => [
                    'regional',
                    'intensity',
                    '{intensity_id}',
                    'fw48h',
                    'regionid',
                    '{regionid}',
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
                  'rename' => [
                    'param' => [
                      'from' => 'intensity_id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'regional',
                    ],
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'var' => 'intensity_id',
                    ],
                    [
                      'lit' => 'pt24h',
                    ],
                    [
                      'lit' => 'regionid',
                    ],
                    [
                      'var' => 'regionid',
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
                  'parts' => [
                    'regional',
                    'intensity',
                    '{intensity_id}',
                    'pt24h',
                    'regionid',
                    '{regionid}',
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
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
            'parts' => [
              'from',
              'to',
              'block',
            ],
            'sep' => '/',
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
                  'segments' => [
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'lit' => 'stats',
                    ],
                    [
                      'var' => 'from',
                    ],
                    [
                      'var' => 'to',
                    ],
                    [
                      'var' => 'block',
                    ],
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
                  'parts' => [
                    'intensity',
                    'stats',
                    '{from}',
                    '{to}',
                    '{block}',
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
                  'segments' => [
                    [
                      'lit' => 'intensity',
                    ],
                    [
                      'lit' => 'stats',
                    ],
                    [
                      'var' => 'from',
                    ],
                    [
                      'var' => 'to',
                    ],
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
                  'parts' => [
                    'intensity',
                    'stats',
                    '{from}',
                    '{to}',
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
