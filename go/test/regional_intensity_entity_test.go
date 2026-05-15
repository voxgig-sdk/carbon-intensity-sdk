package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/carbon-intensity-sdk"
	"github.com/voxgig-sdk/carbon-intensity-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestRegionalIntensityEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.RegionalIntensity(nil)
		if ent == nil {
			t.Fatal("expected non-nil RegionalIntensityEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := regional_intensityBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "regional_intensity." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set CARBONINTENSITY_TEST_REGIONAL_INTENSITY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		regionalIntensityRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.regional_intensity", setup.data)))
		var regionalIntensityRef01Data map[string]any
		if len(regionalIntensityRef01DataRaw) > 0 {
			regionalIntensityRef01Data = core.ToMapAny(regionalIntensityRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = regionalIntensityRef01Data

		// LIST
		regionalIntensityRef01Ent := client.RegionalIntensity(nil)
		regionalIntensityRef01Match := map[string]any{}

		regionalIntensityRef01ListResult, err := regionalIntensityRef01Ent.List(regionalIntensityRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, regionalIntensityRef01ListOk := regionalIntensityRef01ListResult.([]any)
		if !regionalIntensityRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", regionalIntensityRef01ListResult)
		}

		// LOAD
		regionalIntensityRef01MatchDt0 := map[string]any{}
		regionalIntensityRef01DataDt0Loaded, err := regionalIntensityRef01Ent.Load(regionalIntensityRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if regionalIntensityRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func regional_intensityBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "regional_intensity", "RegionalIntensityTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read regional_intensity test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse regional_intensity test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"regional_intensity01", "regional_intensity02", "regional_intensity03", "postcode01", "postcode02", "postcode03", "regionid01", "regionid02", "regionid03"},
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
	entidEnvRaw := os.Getenv("CARBONINTENSITY_TEST_REGIONAL_INTENSITY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CARBONINTENSITY_TEST_REGIONAL_INTENSITY_ENTID": idmap,
		"CARBONINTENSITY_TEST_LIVE":      "FALSE",
		"CARBONINTENSITY_TEST_EXPLAIN":   "FALSE",
		"CARBONINTENSITY_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["CARBONINTENSITY_TEST_REGIONAL_INTENSITY_ENTID"])
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
