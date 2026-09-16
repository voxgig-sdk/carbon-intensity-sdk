package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "CarbonIntensity",
			"slug": "carbon-intensity",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.carbonintensity.org.uk",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"generation": map[string]any{},
				"generation_list": map[string]any{},
				"intensity": map[string]any{},
				"intensity_factor": map[string]any{},
				"intensity_list": map[string]any{},
				"regional": map[string]any{},
				"regional_intensity": map[string]any{},
				"regional_intensity_list": map[string]any{},
				"stat": map[string]any{},
			},
		},
		"entity": map[string]any{
			"generation": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "date-time",
						"name": "from",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "generationmix",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "to",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"from": "from",
						"to": "to",
					},
					"name": "id",
					"parts": []any{
						"from",
						"to",
					},
					"sep": "/",
				},
				"name": "generation",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/generation",
								"segments": []any{
									map[string]any{
										"lit": "generation",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"generation",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "from",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/generation/{from}/{to}",
								"segments": []any{
									map[string]any{
										"lit": "generation",
									},
									map[string]any{
										"var": "from",
									},
									map[string]any{
										"var": "to",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
										"to",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"generation",
									"{from}",
									"{to}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"generation",
						},
					},
				},
			},
			"generation_list": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "from",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "generationmix",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "date-time",
						"name": "to",
						"type": "`$STRING`",
					},
				},
				"name": "generation_list",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "from",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/generation/{from}/pt24h",
								"segments": []any{
									map[string]any{
										"lit": "generation",
									},
									map[string]any{
										"var": "from",
									},
									map[string]any{
										"lit": "pt24h",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"generation",
									"{from}",
									"pt24h",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"generation",
						},
					},
				},
			},
			"intensity": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "date-time",
						"name": "from",
						"short": "Start datetime of the period",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "intensity",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "date-time",
						"name": "to",
						"short": "End datetime of the period",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "intensity",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/intensity",
								"segments": []any{
									map[string]any{
										"lit": "intensity",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"intensity",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "date",
											"orig": "date",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "period",
											"orig": "period",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/intensity/date/{date}/{period}",
								"segments": []any{
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"lit": "date",
									},
									map[string]any{
										"var": "date",
									},
									map[string]any{
										"var": "period",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
										"period",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"intensity",
									"date",
									"{date}",
									"{period}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "from",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/intensity/{from}/{to}",
								"segments": []any{
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"var": "from",
									},
									map[string]any{
										"var": "to",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
										"to",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"intensity",
									"{from}",
									"{to}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/intensity/{from}",
								"rename": map[string]any{
									"param": map[string]any{
										"from": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"intensity",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"date",
						},
						[]any{
							"intensity",
						},
					},
				},
			},
			"intensity_factor": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "Biomass",
						"short": "Carbon intensity factor for biomass (gCO2/kWh)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "Coal",
						"short": "Carbon intensity factor for coal (gCO2/kWh)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "DutchImports",
						"short": "Carbon intensity factor for Dutch imports (gCO2/kWh)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "FrenchImports",
						"short": "Carbon intensity factor for French imports (gCO2/kWh)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "GasCombinedCycle",
						"short": "Carbon intensity factor for gas combined cycle (gCO2/kWh)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "GasOpenCycle",
						"short": "Carbon intensity factor for gas open cycle (gCO2/kWh)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "Hydro",
						"short": "Carbon intensity factor for hydro (gCO2/kWh)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "IrishImports",
						"short": "Carbon intensity factor for Irish imports (gCO2/kWh)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "Nuclear",
						"short": "Carbon intensity factor for nuclear (gCO2/kWh)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "Oil",
						"short": "Carbon intensity factor for oil (gCO2/kWh)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "Other",
						"short": "Carbon intensity factor for other (gCO2/kWh)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "PumpedStorage",
						"short": "Carbon intensity factor for pumped storage (gCO2/kWh)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "Solar",
						"short": "Carbon intensity factor for solar (gCO2/kWh)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "Wind",
						"short": "Carbon intensity factor for wind (gCO2/kWh)",
						"type": "`$INTEGER`",
					},
				},
				"name": "intensity_factor",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/intensity/factors",
								"segments": []any{
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"lit": "factors",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"intensity",
									"factors",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"intensity_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "date-time",
						"name": "from",
						"short": "Start datetime of the period",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "intensity",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "date-time",
						"name": "to",
						"short": "End datetime of the period",
						"type": "`$STRING`",
					},
				},
				"name": "intensity_list",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "from",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/intensity/{from}/fw24h",
								"segments": []any{
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"var": "from",
									},
									map[string]any{
										"lit": "fw24h",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"intensity",
									"{from}",
									"fw24h",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "from",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/intensity/{from}/fw48h",
								"segments": []any{
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"var": "from",
									},
									map[string]any{
										"lit": "fw48h",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"intensity",
									"{from}",
									"fw48h",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "from",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/intensity/{from}/pt24h",
								"segments": []any{
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"var": "from",
									},
									map[string]any{
										"lit": "pt24h",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"intensity",
									"{from}",
									"pt24h",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/intensity/date",
								"segments": []any{
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"lit": "date",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"intensity",
									"date",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "date",
											"orig": "date",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/intensity/date/{date}",
								"segments": []any{
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"lit": "date",
									},
									map[string]any{
										"var": "date",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"intensity",
									"date",
									"{date}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"date",
						},
						[]any{
							"intensity",
						},
					},
				},
			},
			"regional": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "dnoregion",
						"short": "Distribution Network Operator region",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "postcode",
						"short": "Outward postcode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "regionid",
						"short": "Region ID (1-17)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "shortname",
						"short": "Short region name",
						"type": "`$STRING`",
					},
				},
				"name": "regional",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/regional",
								"segments": []any{
									map[string]any{
										"lit": "regional",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"regional",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"regional_intensity": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "dnoregion",
						"short": "Distribution Network Operator region",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "postcode",
						"short": "Outward postcode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "regionid",
						"short": "Region ID (1-17)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "shortname",
						"short": "Short region name",
						"type": "`$STRING`",
					},
				},
				"name": "regional_intensity",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/regional/england",
								"segments": []any{
									map[string]any{
										"lit": "regional",
									},
									map[string]any{
										"lit": "england",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"regional",
									"england",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/regional/scotland",
								"segments": []any{
									map[string]any{
										"lit": "regional",
									},
									map[string]any{
										"lit": "scotland",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"regional",
									"scotland",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/regional/wales",
								"segments": []any{
									map[string]any{
										"lit": "regional",
									},
									map[string]any{
										"lit": "wales",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"regional",
									"wales",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "postcode",
											"orig": "postcode",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/regional/postcode/{postcode}",
								"segments": []any{
									map[string]any{
										"lit": "regional",
									},
									map[string]any{
										"lit": "postcode",
									},
									map[string]any{
										"var": "postcode",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"postcode",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"regional",
									"postcode",
									"{postcode}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "regionid",
											"orig": "regionid",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/regional/regionid/{regionid}",
								"segments": []any{
									map[string]any{
										"lit": "regional",
									},
									map[string]any{
										"lit": "regionid",
									},
									map[string]any{
										"var": "regionid",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"regionid",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"regional",
									"regionid",
									"{regionid}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"postcode",
						},
						[]any{
							"regionid",
						},
					},
				},
			},
			"regional_intensity_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "dnoregion",
						"short": "Distribution Network Operator region",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "postcode",
						"short": "Outward postcode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "regionid",
						"short": "Region ID (1-17)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "shortname",
						"short": "Short region name",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
					"parts": []any{
						"from",
						"to",
					},
					"sep": "/",
				},
				"name": "regional_intensity_list",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "from",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/fw24h",
								"segments": []any{
									map[string]any{
										"lit": "regional",
									},
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"var": "from",
									},
									map[string]any{
										"lit": "fw24h",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"regional",
									"intensity",
									"{from}",
									"fw24h",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "from",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/fw48h",
								"segments": []any{
									map[string]any{
										"lit": "regional",
									},
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"var": "from",
									},
									map[string]any{
										"lit": "fw48h",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"regional",
									"intensity",
									"{from}",
									"fw48h",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "from",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/pt24h",
								"segments": []any{
									map[string]any{
										"lit": "regional",
									},
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"var": "from",
									},
									map[string]any{
										"lit": "pt24h",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"regional",
									"intensity",
									"{from}",
									"pt24h",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "intensity_id",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "postcode",
											"orig": "postcode",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/{to}/postcode/{postcode}",
								"rename": map[string]any{
									"param": map[string]any{
										"from": "intensity_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "regional",
									},
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"var": "intensity_id",
									},
									map[string]any{
										"var": "to",
									},
									map[string]any{
										"lit": "postcode",
									},
									map[string]any{
										"var": "postcode",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"intensity_id",
										"postcode",
										"to",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"regional",
									"intensity",
									"{intensity_id}",
									"{to}",
									"postcode",
									"{postcode}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "intensity_id",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "regionid",
											"orig": "regionid",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "param",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/{to}/regionid/{regionid}",
								"rename": map[string]any{
									"param": map[string]any{
										"from": "intensity_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "regional",
									},
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"var": "intensity_id",
									},
									map[string]any{
										"var": "to",
									},
									map[string]any{
										"lit": "regionid",
									},
									map[string]any{
										"var": "regionid",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"intensity_id",
										"regionid",
										"to",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"regional",
									"intensity",
									"{intensity_id}",
									"{to}",
									"regionid",
									"{regionid}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "from",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/{to}",
								"segments": []any{
									map[string]any{
										"lit": "regional",
									},
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"var": "from",
									},
									map[string]any{
										"var": "to",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
										"to",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"regional",
									"intensity",
									"{from}",
									"{to}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "intensity_id",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "postcode",
											"orig": "postcode",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/fw24h/postcode/{postcode}",
								"rename": map[string]any{
									"param": map[string]any{
										"from": "intensity_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "regional",
									},
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"var": "intensity_id",
									},
									map[string]any{
										"lit": "fw24h",
									},
									map[string]any{
										"lit": "postcode",
									},
									map[string]any{
										"var": "postcode",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"intensity_id",
										"postcode",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"regional",
									"intensity",
									"{intensity_id}",
									"fw24h",
									"postcode",
									"{postcode}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "intensity_id",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "postcode",
											"orig": "postcode",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/fw48h/postcode/{postcode}",
								"rename": map[string]any{
									"param": map[string]any{
										"from": "intensity_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "regional",
									},
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"var": "intensity_id",
									},
									map[string]any{
										"lit": "fw48h",
									},
									map[string]any{
										"lit": "postcode",
									},
									map[string]any{
										"var": "postcode",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"intensity_id",
										"postcode",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"regional",
									"intensity",
									"{intensity_id}",
									"fw48h",
									"postcode",
									"{postcode}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "intensity_id",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "postcode",
											"orig": "postcode",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/pt24h/postcode/{postcode}",
								"rename": map[string]any{
									"param": map[string]any{
										"from": "intensity_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "regional",
									},
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"var": "intensity_id",
									},
									map[string]any{
										"lit": "pt24h",
									},
									map[string]any{
										"lit": "postcode",
									},
									map[string]any{
										"var": "postcode",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"intensity_id",
										"postcode",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"regional",
									"intensity",
									"{intensity_id}",
									"pt24h",
									"postcode",
									"{postcode}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "intensity_id",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "regionid",
											"orig": "regionid",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/fw24h/regionid/{regionid}",
								"rename": map[string]any{
									"param": map[string]any{
										"from": "intensity_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "regional",
									},
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"var": "intensity_id",
									},
									map[string]any{
										"lit": "fw24h",
									},
									map[string]any{
										"lit": "regionid",
									},
									map[string]any{
										"var": "regionid",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"intensity_id",
										"regionid",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"regional",
									"intensity",
									"{intensity_id}",
									"fw24h",
									"regionid",
									"{regionid}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "intensity_id",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "regionid",
											"orig": "regionid",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/fw48h/regionid/{regionid}",
								"rename": map[string]any{
									"param": map[string]any{
										"from": "intensity_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "regional",
									},
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"var": "intensity_id",
									},
									map[string]any{
										"lit": "fw48h",
									},
									map[string]any{
										"lit": "regionid",
									},
									map[string]any{
										"var": "regionid",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"intensity_id",
										"regionid",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"regional",
									"intensity",
									"{intensity_id}",
									"fw48h",
									"regionid",
									"{regionid}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "intensity_id",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "regionid",
											"orig": "regionid",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/pt24h/regionid/{regionid}",
								"rename": map[string]any{
									"param": map[string]any{
										"from": "intensity_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "regional",
									},
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"var": "intensity_id",
									},
									map[string]any{
										"lit": "pt24h",
									},
									map[string]any{
										"lit": "regionid",
									},
									map[string]any{
										"var": "regionid",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"intensity_id",
										"regionid",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"regional",
									"intensity",
									"{intensity_id}",
									"pt24h",
									"regionid",
									"{regionid}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"intensity",
						},
						[]any{
							"intensity",
							"postcode",
						},
						[]any{
							"intensity",
							"regionid",
						},
					},
				},
			},
			"stat": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
					"parts": []any{
						"from",
						"to",
						"block",
					},
					"sep": "/",
				},
				"name": "stat",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "block",
											"orig": "block",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "param",
											"name": "from",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/intensity/stats/{from}/{to}/{block}",
								"segments": []any{
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"lit": "stats",
									},
									map[string]any{
										"var": "from",
									},
									map[string]any{
										"var": "to",
									},
									map[string]any{
										"var": "block",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"block",
										"from",
										"to",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"intensity",
									"stats",
									"{from}",
									"{to}",
									"{block}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "from",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/intensity/stats/{from}/{to}",
								"segments": []any{
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"lit": "stats",
									},
									map[string]any{
										"var": "from",
									},
									map[string]any{
										"var": "to",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
										"to",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"intensity",
									"stats",
									"{from}",
									"{to}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"stat",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
