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

func TestGenerationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Generation(nil)
		if ent == nil {
			t.Fatal("expected non-nil GenerationEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := generationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "generation." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set CARBONINTENSITY_TEST_GENERATION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		generationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.generation", setup.data)))
		var generationRef01Data map[string]any
		if len(generationRef01DataRaw) > 0 {
			generationRef01Data = core.ToMapAny(generationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = generationRef01Data

		// LIST
		generationRef01Ent := client.Generation(nil)
		generationRef01Match := map[string]any{}

		generationRef01ListResult, err := generationRef01Ent.List(generationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, generationRef01ListOk := generationRef01ListResult.([]any)
		if !generationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", generationRef01ListResult)
		}

	})
}

func generationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "generation", "GenerationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read generation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse generation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"generation01", "generation02", "generation03"},
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
	entidEnvRaw := os.Getenv("CARBONINTENSITY_TEST_GENERATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CARBONINTENSITY_TEST_GENERATION_ENTID": idmap,
		"CARBONINTENSITY_TEST_LIVE":      "FALSE",
		"CARBONINTENSITY_TEST_EXPLAIN":   "FALSE",
		"CARBONINTENSITY_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["CARBONINTENSITY_TEST_GENERATION_ENTID"])
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
