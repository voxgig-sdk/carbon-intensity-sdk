package core

import (
	"fmt"
	"strings"

	vs "github.com/voxgig-sdk/carbon-intensity-sdk/go/utility/struct"
)

type CarbonIntensitySDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewCarbonIntensitySDK(options map[string]any) *CarbonIntensitySDK {
	sdk := &CarbonIntensitySDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := MakeConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath([]any{"feature", "test", "active"}, sdk.options) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath([]any{"__derived__", "featureorder"}, sdk.options).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *CarbonIntensitySDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *CarbonIntensitySDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *CarbonIntensitySDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *CarbonIntensitySDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

// Raw endpoint access is operator-controllable, like every entity op.
// Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
// either one reaches the same endpoint.
func (sdk *CarbonIntensitySDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	if !sdk.opAllowed("direct") {
		return sdk.opDenied("direct"), nil
	}

	return sdk.rawRequest(fetchargs)
}

// Is this raw-access op permitted by the SDK's allow.op option?
func (sdk *CarbonIntensitySDK) opAllowed(op string) bool {
	allowOp, _ := vs.GetPath([]any{"allow", "op"}, sdk.options).(string)
	return strings.Contains(allowOp, op)
}

func (sdk *CarbonIntensitySDK) opDenied(op string) map[string]any {
	allowOp, _ := vs.GetPath([]any{"allow", "op"}, sdk.options).(string)
	return map[string]any{
		"ok": false,
		"err": fmt.Errorf("CarbonIntensitySDK: %s: operation not allowed by"+
			" SDK option allow.op value: \"%s\"", op, allowOp),
	}
}

// Ungated request path shared by Direct and Graphql, each of which checks
// its own allow.op token first. Unexported, rather than a flag on fetchargs:
// a caller-supplied marker would let anyone opt straight back out of the
// gate by passing it.
func (sdk *CarbonIntensitySDK) rawRequest(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					// f() returns nil on parse error in our fetcher.
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}

// Raw GraphQL access: the pressure valve that makes the generated surface's
// deliberate omissions (per-call selection sets, typed filter builders,
// batching, subscriptions) livable — the whole schema stays reachable.
//
// Thin wrapper over the same prepare/fetch path Direct uses, with the one
// thing raw Direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
// as a top-level `errors` array, so status alone would report a failed query
// as ok.
//
// NOTE: like Direct, this bypasses the feature pipeline — no retry,
// ratelimit or paging features apply.
func (sdk *CarbonIntensitySDK) Graphql(
	query string, variables map[string]any, ctrl map[string]any,
) (map[string]any, error) {
	if !sdk.opAllowed("graphql") {
		return sdk.opDenied("graphql"), nil
	}

	if variables == nil {
		variables = map[string]any{}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	res, err := sdk.rawRequest(map[string]any{
		"method":  "POST",
		"headers": map[string]any{"content-type": "application/json"},
		"body":    map[string]any{"query": query, "variables": variables},
		"ctrl":    ctrl,
	})

	if err != nil {
		return res, err
	}

	// Errors are read BEFORE any status check: a GraphQL parse or validation
	// failure comes back as HTTP 400 carrying the standard { errors: [...] }
	// body, and the raw path represents a non-2xx as ok:false with no err —
	// so returning early on status would discard the server's own
	// diagnostics, which are the only useful part of that response.
	errors, _ := vs.GetPath([]any{"data", "errors"}, res).([]any)

	if 0 < len(errors) {
		msg, _ := vs.GetProp(errors[0], "message").(string)
		if msg == "" {
			msg = "graphql error"
		}
		res["ok"] = false
		res["err"] = fmt.Errorf("CarbonIntensitySDK: graphql: %s", msg)
		res["graphql"] = errors
	}

	return res, nil
}


// Generation returns a Generation entity bound to this client.
// Idiomatic usage: client.Generation(nil).List(nil, nil) or
// client.Generation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CarbonIntensitySDK) Generation(data map[string]any) CarbonIntensityEntity {
	return NewGenerationEntityFunc(sdk, data)
}


// GenerationList returns a GenerationList entity bound to this client.
// Idiomatic usage: client.GenerationList(nil).List(nil, nil) or
// client.GenerationList(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CarbonIntensitySDK) GenerationList(data map[string]any) CarbonIntensityEntity {
	return NewGenerationListEntityFunc(sdk, data)
}


// Intensity returns a Intensity entity bound to this client.
// Idiomatic usage: client.Intensity(nil).List(nil, nil) or
// client.Intensity(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CarbonIntensitySDK) Intensity(data map[string]any) CarbonIntensityEntity {
	return NewIntensityEntityFunc(sdk, data)
}


// IntensityFactor returns a IntensityFactor entity bound to this client.
// Idiomatic usage: client.IntensityFactor(nil).List(nil, nil) or
// client.IntensityFactor(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CarbonIntensitySDK) IntensityFactor(data map[string]any) CarbonIntensityEntity {
	return NewIntensityFactorEntityFunc(sdk, data)
}


// IntensityList returns a IntensityList entity bound to this client.
// Idiomatic usage: client.IntensityList(nil).List(nil, nil) or
// client.IntensityList(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CarbonIntensitySDK) IntensityList(data map[string]any) CarbonIntensityEntity {
	return NewIntensityListEntityFunc(sdk, data)
}


// Regional returns a Regional entity bound to this client.
// Idiomatic usage: client.Regional(nil).List(nil, nil) or
// client.Regional(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CarbonIntensitySDK) Regional(data map[string]any) CarbonIntensityEntity {
	return NewRegionalEntityFunc(sdk, data)
}


// RegionalIntensity returns a RegionalIntensity entity bound to this client.
// Idiomatic usage: client.RegionalIntensity(nil).List(nil, nil) or
// client.RegionalIntensity(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CarbonIntensitySDK) RegionalIntensity(data map[string]any) CarbonIntensityEntity {
	return NewRegionalIntensityEntityFunc(sdk, data)
}


// RegionalIntensityList returns a RegionalIntensityList entity bound to this client.
// Idiomatic usage: client.RegionalIntensityList(nil).List(nil, nil) or
// client.RegionalIntensityList(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CarbonIntensitySDK) RegionalIntensityList(data map[string]any) CarbonIntensityEntity {
	return NewRegionalIntensityListEntityFunc(sdk, data)
}


// Stat returns a Stat entity bound to this client.
// Idiomatic usage: client.Stat(nil).List(nil, nil) or
// client.Stat(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CarbonIntensitySDK) Stat(data map[string]any) CarbonIntensityEntity {
	return NewStatEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *CarbonIntensitySDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewCarbonIntensitySDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
