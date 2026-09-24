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
						"title": "Data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "generationmix",
						"title": "Generationmix",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "to",
						"title": "To",
						"type": "`$STRING`",
						"format": "date-time",
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
								"kind": "http",
								"method": "GET",
								"orig": "/generation",
								"segments": []any{
									map[string]any{
										"lit": "generation",
									},
								},
								"parts": []any{
									"generation",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"generation",
									"{from}",
									"{to}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
										"to",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"generation_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "generationmix",
						"title": "Generationmix",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "to",
						"title": "To",
						"type": "`$STRING`",
						"format": "date-time",
					},
				},
				"name": "generation_list",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"generation",
									"{from}",
									"pt24h",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.generation",
						},
					},
				},
			},
			"intensity": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$STRING`",
						"short": "Start datetime of the period",
						"format": "date-time",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "intensity",
						"title": "Intensity",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "to",
						"title": "To",
						"type": "`$STRING`",
						"short": "End datetime of the period",
						"format": "date-time",
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
								"kind": "http",
								"method": "GET",
								"orig": "/intensity",
								"segments": []any{
									map[string]any{
										"lit": "intensity",
									},
								},
								"parts": []any{
									"intensity",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"intensity",
									"date",
									"{date}",
									"{period}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "period",
											"orig": "period",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
										"period",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"intensity",
									"{from}",
									"{to}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
										"to",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/intensity/{from}",
								"segments": []any{
									map[string]any{
										"lit": "intensity",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"intensity",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"from": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"intensity_factor": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "Biomass",
						"title": "Biomass",
						"type": "`$INTEGER`",
						"short": "Carbon intensity factor for biomass (gCO2/kWh)",
					},
					map[string]any{
						"name": "Coal",
						"title": "Coal",
						"type": "`$INTEGER`",
						"short": "Carbon intensity factor for coal (gCO2/kWh)",
					},
					map[string]any{
						"name": "DutchImports",
						"title": "Dutch Imports",
						"type": "`$INTEGER`",
						"short": "Carbon intensity factor for Dutch imports (gCO2/kWh)",
					},
					map[string]any{
						"name": "FrenchImports",
						"title": "French Imports",
						"type": "`$INTEGER`",
						"short": "Carbon intensity factor for French imports (gCO2/kWh)",
					},
					map[string]any{
						"name": "GasCombinedCycle",
						"title": "Gas Combined Cycle",
						"type": "`$INTEGER`",
						"short": "Carbon intensity factor for gas combined cycle (gCO2/kWh)",
					},
					map[string]any{
						"name": "GasOpenCycle",
						"title": "Gas Open Cycle",
						"type": "`$INTEGER`",
						"short": "Carbon intensity factor for gas open cycle (gCO2/kWh)",
					},
					map[string]any{
						"name": "Hydro",
						"title": "Hydro",
						"type": "`$INTEGER`",
						"short": "Carbon intensity factor for hydro (gCO2/kWh)",
					},
					map[string]any{
						"name": "IrishImports",
						"title": "Irish Imports",
						"type": "`$INTEGER`",
						"short": "Carbon intensity factor for Irish imports (gCO2/kWh)",
					},
					map[string]any{
						"name": "Nuclear",
						"title": "Nuclear",
						"type": "`$INTEGER`",
						"short": "Carbon intensity factor for nuclear (gCO2/kWh)",
					},
					map[string]any{
						"name": "Oil",
						"title": "Oil",
						"type": "`$INTEGER`",
						"short": "Carbon intensity factor for oil (gCO2/kWh)",
					},
					map[string]any{
						"name": "Other",
						"title": "Other",
						"type": "`$INTEGER`",
						"short": "Carbon intensity factor for other (gCO2/kWh)",
					},
					map[string]any{
						"name": "PumpedStorage",
						"title": "Pumped Storage",
						"type": "`$INTEGER`",
						"short": "Carbon intensity factor for pumped storage (gCO2/kWh)",
					},
					map[string]any{
						"name": "Solar",
						"title": "Solar",
						"type": "`$INTEGER`",
						"short": "Carbon intensity factor for solar (gCO2/kWh)",
					},
					map[string]any{
						"name": "Wind",
						"title": "Wind",
						"type": "`$INTEGER`",
						"short": "Carbon intensity factor for wind (gCO2/kWh)",
					},
				},
				"name": "intensity_factor",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"intensity",
									"factors",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$STRING`",
						"short": "Start datetime of the period",
						"format": "date-time",
					},
					map[string]any{
						"name": "intensity",
						"title": "Intensity",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "to",
						"title": "To",
						"type": "`$STRING`",
						"short": "End datetime of the period",
						"format": "date-time",
					},
				},
				"name": "intensity_list",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"intensity",
									"{from}",
									"fw24h",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"intensity",
									"{from}",
									"fw48h",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"intensity",
									"{from}",
									"pt24h",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"intensity",
									"date",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"intensity",
									"date",
									"{date}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.intensity",
						},
					},
				},
			},
			"regional": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "dnoregion",
						"title": "Dnoregion",
						"type": "`$STRING`",
						"short": "Distribution Network Operator region",
					},
					map[string]any{
						"name": "postcode",
						"title": "Postcode",
						"type": "`$STRING`",
						"short": "Outward postcode",
					},
					map[string]any{
						"name": "regionid",
						"title": "Regionid",
						"type": "`$INTEGER`",
						"short": "Region ID (1-17)",
					},
					map[string]any{
						"name": "shortname",
						"title": "Shortname",
						"type": "`$STRING`",
						"short": "Short region name",
					},
				},
				"name": "regional",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/regional",
								"segments": []any{
									map[string]any{
										"lit": "regional",
									},
								},
								"parts": []any{
									"regional",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "dnoregion",
						"title": "Dnoregion",
						"type": "`$STRING`",
						"short": "Distribution Network Operator region",
					},
					map[string]any{
						"name": "postcode",
						"title": "Postcode",
						"type": "`$STRING`",
						"short": "Outward postcode",
					},
					map[string]any{
						"name": "regionid",
						"title": "Regionid",
						"type": "`$INTEGER`",
						"short": "Region ID (1-17)",
					},
					map[string]any{
						"name": "shortname",
						"title": "Shortname",
						"type": "`$STRING`",
						"short": "Short region name",
					},
				},
				"name": "regional_intensity",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"regional",
									"england",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
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
								"parts": []any{
									"regional",
									"scotland",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
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
								"parts": []any{
									"regional",
									"wales",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"regional",
									"postcode",
									"{postcode}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "postcode",
											"orig": "postcode",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"postcode",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"regional",
									"regionid",
									"{regionid}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "regionid",
											"orig": "regionid",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"regionid",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"regional_intensity_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "dnoregion",
						"title": "Dnoregion",
						"type": "`$STRING`",
						"short": "Distribution Network Operator region",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "postcode",
						"title": "Postcode",
						"type": "`$STRING`",
						"short": "Outward postcode",
					},
					map[string]any{
						"name": "regionid",
						"title": "Regionid",
						"type": "`$INTEGER`",
						"short": "Region ID (1-17)",
					},
					map[string]any{
						"name": "shortname",
						"title": "Shortname",
						"type": "`$STRING`",
						"short": "Short region name",
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
								"parts": []any{
									"regional",
									"intensity",
									"{from}",
									"fw24h",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"regional",
									"intensity",
									"{from}",
									"fw48h",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"regional",
									"intensity",
									"{from}",
									"pt24h",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/{to}/postcode/{postcode}",
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
								"parts": []any{
									"regional",
									"intensity",
									"{intensity_id}",
									"{to}",
									"postcode",
									"{postcode}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"from": "intensity_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "intensity_id",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "postcode",
											"orig": "postcode",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"intensity_id",
										"postcode",
										"to",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/{to}/regionid/{regionid}",
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
								"parts": []any{
									"regional",
									"intensity",
									"{intensity_id}",
									"{to}",
									"regionid",
									"{regionid}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"from": "intensity_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "intensity_id",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "regionid",
											"orig": "regionid",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"intensity_id",
										"regionid",
										"to",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"regional",
									"intensity",
									"{from}",
									"{to}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
										"to",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/fw24h/postcode/{postcode}",
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
								"parts": []any{
									"regional",
									"intensity",
									"{intensity_id}",
									"fw24h",
									"postcode",
									"{postcode}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"from": "intensity_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "intensity_id",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "postcode",
											"orig": "postcode",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"intensity_id",
										"postcode",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/fw48h/postcode/{postcode}",
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
								"parts": []any{
									"regional",
									"intensity",
									"{intensity_id}",
									"fw48h",
									"postcode",
									"{postcode}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"from": "intensity_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "intensity_id",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "postcode",
											"orig": "postcode",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"intensity_id",
										"postcode",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/pt24h/postcode/{postcode}",
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
								"parts": []any{
									"regional",
									"intensity",
									"{intensity_id}",
									"pt24h",
									"postcode",
									"{postcode}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"from": "intensity_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "intensity_id",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "postcode",
											"orig": "postcode",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"intensity_id",
										"postcode",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/fw24h/regionid/{regionid}",
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
								"parts": []any{
									"regional",
									"intensity",
									"{intensity_id}",
									"fw24h",
									"regionid",
									"{regionid}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"from": "intensity_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "intensity_id",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "regionid",
											"orig": "regionid",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"intensity_id",
										"regionid",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/fw48h/regionid/{regionid}",
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
								"parts": []any{
									"regional",
									"intensity",
									"{intensity_id}",
									"fw48h",
									"regionid",
									"{regionid}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"from": "intensity_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "intensity_id",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "regionid",
											"orig": "regionid",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"intensity_id",
										"regionid",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/regional/intensity/{from}/pt24h/regionid/{regionid}",
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
								"parts": []any{
									"regional",
									"intensity",
									"{intensity_id}",
									"pt24h",
									"regionid",
									"{regionid}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"from": "intensity_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "intensity_id",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "regionid",
											"orig": "regionid",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"intensity_id",
										"regionid",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.intensity",
						},
						[]any{
							"$.main.kit.entity.intensity",
						},
						[]any{
							"$.main.kit.entity.intensity",
						},
					},
				},
			},
			"stat": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
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
								"parts": []any{
									"intensity",
									"stats",
									"{from}",
									"{to}",
									"{block}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "block",
											"orig": "block",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"block",
										"from",
										"to",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"intensity",
									"stats",
									"{from}",
									"{to}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
										"to",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
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
