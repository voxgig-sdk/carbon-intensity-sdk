"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'CarbonIntensity',
        slug: "carbon-intensity",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.carbonintensity.org.uk",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            generation: {},
            generation_list: {},
            intensity: {},
            intensity_factor: {},
            intensity_list: {},
            regional: {},
            regional_intensity: {},
            regional_intensity_list: {},
            stat: {},
        }
    };
    entity = {
        "generation": {
            "fields": [
                {
                    "name": "data",
                    "title": "Data",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "from",
                    "title": "From",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "generationmix",
                    "title": "Generationmix",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "to",
                    "title": "To",
                    "type": "`$STRING`",
                    "format": "date-time"
                }
            ],
            "id": {
                "field": "id",
                "from": {
                    "from": "from",
                    "to": "to"
                },
                "name": "id",
                "parts": [
                    "from",
                    "to"
                ],
                "sep": "/"
            },
            "name": "generation",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/generation",
                            "segments": [
                                {
                                    "lit": "generation"
                                }
                            ],
                            "parts": [
                                "generation"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/generation/{from}/{to}",
                            "segments": [
                                {
                                    "lit": "generation"
                                },
                                {
                                    "var": "from"
                                },
                                {
                                    "var": "to"
                                }
                            ],
                            "parts": [
                                "generation",
                                "{from}",
                                "{to}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "from",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "to",
                                        "orig": "to",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "from",
                                    "to"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "generation_list": {
            "fields": [
                {
                    "name": "from",
                    "title": "From",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "generationmix",
                    "title": "Generationmix",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "to",
                    "title": "To",
                    "type": "`$STRING`",
                    "format": "date-time"
                }
            ],
            "name": "generation_list",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/generation/{from}/pt24h",
                            "segments": [
                                {
                                    "lit": "generation"
                                },
                                {
                                    "var": "from"
                                },
                                {
                                    "lit": "pt24h"
                                }
                            ],
                            "parts": [
                                "generation",
                                "{from}",
                                "pt24h"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "from",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "from"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.generation"
                    ]
                ]
            }
        },
        "intensity": {
            "fields": [
                {
                    "name": "data",
                    "title": "Data",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "from",
                    "title": "From",
                    "type": "`$STRING`",
                    "short": "Start datetime of the period",
                    "format": "date-time"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "intensity",
                    "title": "Intensity",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "to",
                    "title": "To",
                    "type": "`$STRING`",
                    "short": "End datetime of the period",
                    "format": "date-time"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "intensity",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/intensity",
                            "segments": [
                                {
                                    "lit": "intensity"
                                }
                            ],
                            "parts": [
                                "intensity"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/intensity/date/{date}/{period}",
                            "segments": [
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "lit": "date"
                                },
                                {
                                    "var": "date"
                                },
                                {
                                    "var": "period"
                                }
                            ],
                            "parts": [
                                "intensity",
                                "date",
                                "{date}",
                                "{period}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "date",
                                        "orig": "date",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "period",
                                        "orig": "period",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "date",
                                    "period"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/intensity/{from}/{to}",
                            "segments": [
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "var": "from"
                                },
                                {
                                    "var": "to"
                                }
                            ],
                            "parts": [
                                "intensity",
                                "{from}",
                                "{to}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "from",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "to",
                                        "orig": "to",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "from",
                                    "to"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/intensity/{from}",
                            "segments": [
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "intensity",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "from": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "intensity_factor": {
            "fields": [
                {
                    "name": "Biomass",
                    "title": "Biomass",
                    "type": "`$INTEGER`",
                    "short": "Carbon intensity factor for biomass (gCO2/kWh)"
                },
                {
                    "name": "Coal",
                    "title": "Coal",
                    "type": "`$INTEGER`",
                    "short": "Carbon intensity factor for coal (gCO2/kWh)"
                },
                {
                    "name": "DutchImports",
                    "title": "Dutch Imports",
                    "type": "`$INTEGER`",
                    "short": "Carbon intensity factor for Dutch imports (gCO2/kWh)"
                },
                {
                    "name": "FrenchImports",
                    "title": "French Imports",
                    "type": "`$INTEGER`",
                    "short": "Carbon intensity factor for French imports (gCO2/kWh)"
                },
                {
                    "name": "GasCombinedCycle",
                    "title": "Gas Combined Cycle",
                    "type": "`$INTEGER`",
                    "short": "Carbon intensity factor for gas combined cycle (gCO2/kWh)"
                },
                {
                    "name": "GasOpenCycle",
                    "title": "Gas Open Cycle",
                    "type": "`$INTEGER`",
                    "short": "Carbon intensity factor for gas open cycle (gCO2/kWh)"
                },
                {
                    "name": "Hydro",
                    "title": "Hydro",
                    "type": "`$INTEGER`",
                    "short": "Carbon intensity factor for hydro (gCO2/kWh)"
                },
                {
                    "name": "IrishImports",
                    "title": "Irish Imports",
                    "type": "`$INTEGER`",
                    "short": "Carbon intensity factor for Irish imports (gCO2/kWh)"
                },
                {
                    "name": "Nuclear",
                    "title": "Nuclear",
                    "type": "`$INTEGER`",
                    "short": "Carbon intensity factor for nuclear (gCO2/kWh)"
                },
                {
                    "name": "Oil",
                    "title": "Oil",
                    "type": "`$INTEGER`",
                    "short": "Carbon intensity factor for oil (gCO2/kWh)"
                },
                {
                    "name": "Other",
                    "title": "Other",
                    "type": "`$INTEGER`",
                    "short": "Carbon intensity factor for other (gCO2/kWh)"
                },
                {
                    "name": "PumpedStorage",
                    "title": "Pumped Storage",
                    "type": "`$INTEGER`",
                    "short": "Carbon intensity factor for pumped storage (gCO2/kWh)"
                },
                {
                    "name": "Solar",
                    "title": "Solar",
                    "type": "`$INTEGER`",
                    "short": "Carbon intensity factor for solar (gCO2/kWh)"
                },
                {
                    "name": "Wind",
                    "title": "Wind",
                    "type": "`$INTEGER`",
                    "short": "Carbon intensity factor for wind (gCO2/kWh)"
                }
            ],
            "name": "intensity_factor",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/intensity/factors",
                            "segments": [
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "lit": "factors"
                                }
                            ],
                            "parts": [
                                "intensity",
                                "factors"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "intensity_list": {
            "fields": [
                {
                    "name": "data",
                    "title": "Data",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "from",
                    "title": "From",
                    "type": "`$STRING`",
                    "short": "Start datetime of the period",
                    "format": "date-time"
                },
                {
                    "name": "intensity",
                    "title": "Intensity",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "to",
                    "title": "To",
                    "type": "`$STRING`",
                    "short": "End datetime of the period",
                    "format": "date-time"
                }
            ],
            "name": "intensity_list",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/intensity/{from}/fw24h",
                            "segments": [
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "var": "from"
                                },
                                {
                                    "lit": "fw24h"
                                }
                            ],
                            "parts": [
                                "intensity",
                                "{from}",
                                "fw24h"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "from",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "from"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/intensity/{from}/fw48h",
                            "segments": [
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "var": "from"
                                },
                                {
                                    "lit": "fw48h"
                                }
                            ],
                            "parts": [
                                "intensity",
                                "{from}",
                                "fw48h"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "from",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "from"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/intensity/{from}/pt24h",
                            "segments": [
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "var": "from"
                                },
                                {
                                    "lit": "pt24h"
                                }
                            ],
                            "parts": [
                                "intensity",
                                "{from}",
                                "pt24h"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "from",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "from"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/intensity/date",
                            "segments": [
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "lit": "date"
                                }
                            ],
                            "parts": [
                                "intensity",
                                "date"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/intensity/date/{date}",
                            "segments": [
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "lit": "date"
                                },
                                {
                                    "var": "date"
                                }
                            ],
                            "parts": [
                                "intensity",
                                "date",
                                "{date}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "date",
                                        "orig": "date",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "date"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.intensity"
                    ]
                ]
            }
        },
        "regional": {
            "fields": [
                {
                    "name": "data",
                    "title": "Data",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "dnoregion",
                    "title": "Dnoregion",
                    "type": "`$STRING`",
                    "short": "Distribution Network Operator region"
                },
                {
                    "name": "postcode",
                    "title": "Postcode",
                    "type": "`$STRING`",
                    "short": "Outward postcode"
                },
                {
                    "name": "regionid",
                    "title": "Regionid",
                    "type": "`$INTEGER`",
                    "short": "Region ID (1-17)"
                },
                {
                    "name": "shortname",
                    "title": "Shortname",
                    "type": "`$STRING`",
                    "short": "Short region name"
                }
            ],
            "name": "regional",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/regional",
                            "segments": [
                                {
                                    "lit": "regional"
                                }
                            ],
                            "parts": [
                                "regional"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "regional_intensity": {
            "fields": [
                {
                    "name": "data",
                    "title": "Data",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "dnoregion",
                    "title": "Dnoregion",
                    "type": "`$STRING`",
                    "short": "Distribution Network Operator region"
                },
                {
                    "name": "postcode",
                    "title": "Postcode",
                    "type": "`$STRING`",
                    "short": "Outward postcode"
                },
                {
                    "name": "regionid",
                    "title": "Regionid",
                    "type": "`$INTEGER`",
                    "short": "Region ID (1-17)"
                },
                {
                    "name": "shortname",
                    "title": "Shortname",
                    "type": "`$STRING`",
                    "short": "Short region name"
                }
            ],
            "name": "regional_intensity",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/regional/england",
                            "segments": [
                                {
                                    "lit": "regional"
                                },
                                {
                                    "lit": "england"
                                }
                            ],
                            "parts": [
                                "regional",
                                "england"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {},
                            "select": {}
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/regional/scotland",
                            "segments": [
                                {
                                    "lit": "regional"
                                },
                                {
                                    "lit": "scotland"
                                }
                            ],
                            "parts": [
                                "regional",
                                "scotland"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {},
                            "select": {}
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/regional/wales",
                            "segments": [
                                {
                                    "lit": "regional"
                                },
                                {
                                    "lit": "wales"
                                }
                            ],
                            "parts": [
                                "regional",
                                "wales"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/regional/postcode/{postcode}",
                            "segments": [
                                {
                                    "lit": "regional"
                                },
                                {
                                    "lit": "postcode"
                                },
                                {
                                    "var": "postcode"
                                }
                            ],
                            "parts": [
                                "regional",
                                "postcode",
                                "{postcode}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "postcode",
                                        "orig": "postcode",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "postcode"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/regional/regionid/{regionid}",
                            "segments": [
                                {
                                    "lit": "regional"
                                },
                                {
                                    "lit": "regionid"
                                },
                                {
                                    "var": "regionid"
                                }
                            ],
                            "parts": [
                                "regional",
                                "regionid",
                                "{regionid}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "regionid",
                                        "orig": "regionid",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "regionid"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "regional_intensity_list": {
            "fields": [
                {
                    "name": "data",
                    "title": "Data",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "dnoregion",
                    "title": "Dnoregion",
                    "type": "`$STRING`",
                    "short": "Distribution Network Operator region"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "postcode",
                    "title": "Postcode",
                    "type": "`$STRING`",
                    "short": "Outward postcode"
                },
                {
                    "name": "regionid",
                    "title": "Regionid",
                    "type": "`$INTEGER`",
                    "short": "Region ID (1-17)"
                },
                {
                    "name": "shortname",
                    "title": "Shortname",
                    "type": "`$STRING`",
                    "short": "Short region name"
                }
            ],
            "id": {
                "field": "id",
                "name": "id",
                "parts": [
                    "from",
                    "to"
                ],
                "sep": "/"
            },
            "name": "regional_intensity_list",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/regional/intensity/{from}/fw24h",
                            "segments": [
                                {
                                    "lit": "regional"
                                },
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "var": "from"
                                },
                                {
                                    "lit": "fw24h"
                                }
                            ],
                            "parts": [
                                "regional",
                                "intensity",
                                "{from}",
                                "fw24h"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "from",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "from"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/regional/intensity/{from}/fw48h",
                            "segments": [
                                {
                                    "lit": "regional"
                                },
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "var": "from"
                                },
                                {
                                    "lit": "fw48h"
                                }
                            ],
                            "parts": [
                                "regional",
                                "intensity",
                                "{from}",
                                "fw48h"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "from",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "from"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/regional/intensity/{from}/pt24h",
                            "segments": [
                                {
                                    "lit": "regional"
                                },
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "var": "from"
                                },
                                {
                                    "lit": "pt24h"
                                }
                            ],
                            "parts": [
                                "regional",
                                "intensity",
                                "{from}",
                                "pt24h"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "from",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "from"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/regional/intensity/{from}/{to}/postcode/{postcode}",
                            "segments": [
                                {
                                    "lit": "regional"
                                },
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "var": "intensity_id"
                                },
                                {
                                    "var": "to"
                                },
                                {
                                    "lit": "postcode"
                                },
                                {
                                    "var": "postcode"
                                }
                            ],
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
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "intensity_id",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "postcode",
                                        "orig": "postcode",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "to",
                                        "orig": "to",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "intensity_id",
                                    "postcode",
                                    "to"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/regional/intensity/{from}/{to}/regionid/{regionid}",
                            "segments": [
                                {
                                    "lit": "regional"
                                },
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "var": "intensity_id"
                                },
                                {
                                    "var": "to"
                                },
                                {
                                    "lit": "regionid"
                                },
                                {
                                    "var": "regionid"
                                }
                            ],
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
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "intensity_id",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "regionid",
                                        "orig": "regionid",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "to",
                                        "orig": "to",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "intensity_id",
                                    "regionid",
                                    "to"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/regional/intensity/{from}/{to}",
                            "segments": [
                                {
                                    "lit": "regional"
                                },
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "var": "from"
                                },
                                {
                                    "var": "to"
                                }
                            ],
                            "parts": [
                                "regional",
                                "intensity",
                                "{from}",
                                "{to}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "from",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "to",
                                        "orig": "to",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "from",
                                    "to"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/regional/intensity/{from}/fw24h/postcode/{postcode}",
                            "segments": [
                                {
                                    "lit": "regional"
                                },
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "var": "intensity_id"
                                },
                                {
                                    "lit": "fw24h"
                                },
                                {
                                    "lit": "postcode"
                                },
                                {
                                    "var": "postcode"
                                }
                            ],
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
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "intensity_id",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "postcode",
                                        "orig": "postcode",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "intensity_id",
                                    "postcode"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/regional/intensity/{from}/fw48h/postcode/{postcode}",
                            "segments": [
                                {
                                    "lit": "regional"
                                },
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "var": "intensity_id"
                                },
                                {
                                    "lit": "fw48h"
                                },
                                {
                                    "lit": "postcode"
                                },
                                {
                                    "var": "postcode"
                                }
                            ],
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
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "intensity_id",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "postcode",
                                        "orig": "postcode",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "intensity_id",
                                    "postcode"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/regional/intensity/{from}/pt24h/postcode/{postcode}",
                            "segments": [
                                {
                                    "lit": "regional"
                                },
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "var": "intensity_id"
                                },
                                {
                                    "lit": "pt24h"
                                },
                                {
                                    "lit": "postcode"
                                },
                                {
                                    "var": "postcode"
                                }
                            ],
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
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "intensity_id",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "postcode",
                                        "orig": "postcode",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "intensity_id",
                                    "postcode"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/regional/intensity/{from}/fw24h/regionid/{regionid}",
                            "segments": [
                                {
                                    "lit": "regional"
                                },
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "var": "intensity_id"
                                },
                                {
                                    "lit": "fw24h"
                                },
                                {
                                    "lit": "regionid"
                                },
                                {
                                    "var": "regionid"
                                }
                            ],
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
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "intensity_id",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "regionid",
                                        "orig": "regionid",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "intensity_id",
                                    "regionid"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/regional/intensity/{from}/fw48h/regionid/{regionid}",
                            "segments": [
                                {
                                    "lit": "regional"
                                },
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "var": "intensity_id"
                                },
                                {
                                    "lit": "fw48h"
                                },
                                {
                                    "lit": "regionid"
                                },
                                {
                                    "var": "regionid"
                                }
                            ],
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
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "intensity_id",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "regionid",
                                        "orig": "regionid",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "intensity_id",
                                    "regionid"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/regional/intensity/{from}/pt24h/regionid/{regionid}",
                            "segments": [
                                {
                                    "lit": "regional"
                                },
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "var": "intensity_id"
                                },
                                {
                                    "lit": "pt24h"
                                },
                                {
                                    "lit": "regionid"
                                },
                                {
                                    "var": "regionid"
                                }
                            ],
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
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "intensity_id",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "regionid",
                                        "orig": "regionid",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "intensity_id",
                                    "regionid"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.intensity"
                    ],
                    [
                        "$.main.kit.entity.intensity"
                    ],
                    [
                        "$.main.kit.entity.intensity"
                    ]
                ]
            }
        },
        "stat": {
            "fields": [
                {
                    "name": "data",
                    "title": "Data",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id",
                "parts": [
                    "from",
                    "to",
                    "block"
                ],
                "sep": "/"
            },
            "name": "stat",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/intensity/stats/{from}/{to}/{block}",
                            "segments": [
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "lit": "stats"
                                },
                                {
                                    "var": "from"
                                },
                                {
                                    "var": "to"
                                },
                                {
                                    "var": "block"
                                }
                            ],
                            "parts": [
                                "intensity",
                                "stats",
                                "{from}",
                                "{to}",
                                "{block}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "block",
                                        "orig": "block",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "from",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "to",
                                        "orig": "to",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "block",
                                    "from",
                                    "to"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/intensity/stats/{from}/{to}",
                            "segments": [
                                {
                                    "lit": "intensity"
                                },
                                {
                                    "lit": "stats"
                                },
                                {
                                    "var": "from"
                                },
                                {
                                    "var": "to"
                                }
                            ],
                            "parts": [
                                "intensity",
                                "stats",
                                "{from}",
                                "{to}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "from",
                                        "orig": "from",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "to",
                                        "orig": "to",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "from",
                                    "to"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map