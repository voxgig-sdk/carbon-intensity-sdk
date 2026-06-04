package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "CarbonIntensity",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"name": "from",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "generationmix",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "to",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
				},
				"name": "generation",
				"op": map[string]any{
					"list": map[string]any{
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
							map[string]any{
								"method": "GET",
								"orig": "/generation",
								"parts": []any{
									"generation",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 1,
							},
						},
						"input": "data",
						"key$": "list",
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
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "generationmix",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "to",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
				},
				"name": "generation_list",
				"op": map[string]any{
					"list": map[string]any{
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
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
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
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "from",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "intensity",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "to",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 3,
					},
				},
				"name": "intensity",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "period",
											"orig": "period",
											"reqd": true,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 1,
							},
							map[string]any{
								"method": "GET",
								"orig": "/intensity",
								"parts": []any{
									"intensity",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 2,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
						"name": "biomass",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "coal",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "dutch_import",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "french_import",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "gas__combined_cycle",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "gas__open_cycle",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 5,
					},
					map[string]any{
						"name": "hydro",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 6,
					},
					map[string]any{
						"name": "irish_import",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 7,
					},
					map[string]any{
						"name": "nuclear",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 8,
					},
					map[string]any{
						"name": "oil",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 9,
					},
					map[string]any{
						"name": "other",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 10,
					},
					map[string]any{
						"name": "pumped_storage",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 11,
					},
					map[string]any{
						"name": "solar",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 12,
					},
					map[string]any{
						"name": "wind",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 13,
					},
				},
				"name": "intensity_factor",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"method": "GET",
								"orig": "/intensity/factors",
								"parts": []any{
									"intensity",
									"factors",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
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
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "from",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "intensity",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "to",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 3,
					},
				},
				"name": "intensity_list",
				"op": map[string]any{
					"list": map[string]any{
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
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
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
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 1,
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
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 2,
							},
							map[string]any{
								"method": "GET",
								"orig": "/intensity/date",
								"parts": []any{
									"intensity",
									"date",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 3,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "dnoregion",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "postcode",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "regionid",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "shortname",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 4,
					},
				},
				"name": "regional",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"method": "GET",
								"orig": "/regional",
								"parts": []any{
									"regional",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
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
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "dnoregion",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "postcode",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "regionid",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "shortname",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 4,
					},
				},
				"name": "regional_intensity",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"method": "GET",
								"orig": "/regional/england",
								"parts": []any{
									"regional",
									"england",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 0,
							},
							map[string]any{
								"method": "GET",
								"orig": "/regional/scotland",
								"parts": []any{
									"regional",
									"scotland",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 1,
							},
							map[string]any{
								"method": "GET",
								"orig": "/regional/wales",
								"parts": []any{
									"regional",
									"wales",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 2,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
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
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 1,
							},
						},
						"input": "data",
						"key$": "load",
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
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "dnoregion",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "postcode",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "regionid",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "shortname",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 4,
					},
				},
				"name": "regional_intensity_list",
				"op": map[string]any{
					"list": map[string]any{
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
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
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 1,
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
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 2,
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
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 3,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "postcode",
											"orig": "postcode",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "regionid",
											"orig": "regionid",
											"reqd": true,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 1,
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "postcode",
											"orig": "postcode",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 2,
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "postcode",
											"orig": "postcode",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 3,
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "postcode",
											"orig": "postcode",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 4,
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "regionid",
											"orig": "regionid",
											"reqd": true,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 5,
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "regionid",
											"orig": "regionid",
											"reqd": true,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 6,
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "regionid",
											"orig": "regionid",
											"reqd": true,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 7,
							},
						},
						"input": "data",
						"key$": "load",
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
						"name": "from",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "intensity",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "to",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
				},
				"name": "stat",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "from",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 1,
							},
						},
						"input": "data",
						"key$": "list",
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
