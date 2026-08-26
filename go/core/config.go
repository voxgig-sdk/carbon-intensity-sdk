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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
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
						"name": "from",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "generationmix",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "to",
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"generation",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
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
								"parts": []any{
									"generation",
									"{from}",
									"{to}",
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
						"name": "from",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "generationmix",
						"type": "`$ARRAY`",
					},
					map[string]any{
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
								"parts": []any{
									"generation",
									"{from}",
									"pt24h",
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
						"name": "to",
						"short": "End datetime of the period",
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"intensity",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
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
								"parts": []any{
									"intensity",
									"date",
									"{date}",
									"{period}",
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
								"parts": []any{
									"intensity",
									"{from}",
									"{to}",
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
								"parts": []any{
									"intensity",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"from": "id",
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
								"parts": []any{
									"intensity",
									"factors",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
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
						"name": "from",
						"short": "Start datetime of the period",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "intensity",
						"type": "`$OBJECT`",
					},
					map[string]any{
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
								"parts": []any{
									"intensity",
									"{from}",
									"fw24h",
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
								"parts": []any{
									"intensity",
									"{from}",
									"fw48h",
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
								"parts": []any{
									"intensity",
									"{from}",
									"pt24h",
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
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/intensity/date",
								"parts": []any{
									"intensity",
									"date",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
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
								"parts": []any{
									"intensity",
									"date",
									"{date}",
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
								"parts": []any{
									"regional",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
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
								"parts": []any{
									"regional",
									"england",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/regional/scotland",
								"parts": []any{
									"regional",
									"scotland",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/regional/wales",
								"parts": []any{
									"regional",
									"wales",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
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
								"parts": []any{
									"regional",
									"postcode",
									"{postcode}",
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
								"parts": []any{
									"regional",
									"regionid",
									"{regionid}",
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
								"parts": []any{
									"regional",
									"intensity",
									"{from}",
									"fw24h",
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
								"parts": []any{
									"regional",
									"intensity",
									"{from}",
									"fw48h",
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
								"parts": []any{
									"regional",
									"intensity",
									"{from}",
									"pt24h",
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
								"parts": []any{
									"regional",
									"intensity",
									"{from}",
									"{to}",
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
								"parts": []any{
									"intensity",
									"stats",
									"{from}",
									"{to}",
									"{block}",
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
								"parts": []any{
									"intensity",
									"stats",
									"{from}",
									"{to}",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
