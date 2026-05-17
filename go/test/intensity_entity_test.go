package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/carbon-intensity-sdk/go"
	"github.com/voxgig-sdk/carbon-intensity-sdk/go/core"

	vs "github.com/voxgig-sdk/carbon-intensity-sdk/go/utility/struct"
)

func TestIntensityEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Intensity(nil)
		if ent == nil {
			t.Fatal("expected non-nil IntensityEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := intensityBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "intensity." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set CARBONINTENSITY_TEST_INTENSITY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		intensityRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.intensity", setup.data)))
		var intensityRef01Data map[string]any
		if len(intensityRef01DataRaw) > 0 {
			intensityRef01Data = core.ToMapAny(intensityRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = intensityRef01Data

		// LIST
		intensityRef01Ent := client.Intensity(nil)
		intensityRef01Match := map[string]any{}

		intensityRef01ListResult, err := intensityRef01Ent.List(intensityRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, intensityRef01ListOk := intensityRef01ListResult.([]any)
		if !intensityRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", intensityRef01ListResult)
		}

		// LOAD
		intensityRef01MatchDt0 := map[string]any{}
		intensityRef01DataDt0Loaded, err := intensityRef01Ent.Load(intensityRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if intensityRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func intensityBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "intensity", "IntensityTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read intensity test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse intensity test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"intensity01", "intensity02", "intensity03", "date01", "date02", "date03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("CARBONINTENSITY_TEST_INTENSITY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CARBONINTENSITY_TEST_INTENSITY_ENTID": idmap,
		"CARBONINTENSITY_TEST_LIVE":      "FALSE",
		"CARBONINTENSITY_TEST_EXPLAIN":   "FALSE",
		"CARBONINTENSITY_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["CARBONINTENSITY_TEST_INTENSITY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["CARBONINTENSITY_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["CARBONINTENSITY_APIKEY"],
			},
			extra,
		})
		client = sdk.NewCarbonIntensitySDK(core.ToMapAny(mergedOpts))
	}

	live := env["CARBONINTENSITY_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["CARBONINTENSITY_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
