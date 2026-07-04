# CarbonIntensity SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import CarbonIntensityUtility
from core.spec import CarbonIntensitySpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import CarbonIntensityBaseFeature
from features import _make_feature


class CarbonIntensitySDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = CarbonIntensityUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return CarbonIntensityUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = CarbonIntensitySpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def generation(self):
        """Idiomatic facade: client.generation.list() / client.generation.load({"id": ...})."""
        from entity.generation_entity import GenerationEntity
        cached = getattr(self, "_generation", None)
        if cached is None:
            cached = GenerationEntity(self, None)
            self._generation = cached
        return cached

    def Generation(self, data=None):
        # Deprecated: use client.generation instead.
        from entity.generation_entity import GenerationEntity
        return GenerationEntity(self, data)


    @property
    def generation_list(self):
        """Idiomatic facade: client.generation_list.list() / client.generation_list.load({"id": ...})."""
        from entity.generation_list_entity import GenerationListEntity
        cached = getattr(self, "_generation_list", None)
        if cached is None:
            cached = GenerationListEntity(self, None)
            self._generation_list = cached
        return cached

    def GenerationList(self, data=None):
        # Deprecated: use client.generation_list instead.
        from entity.generation_list_entity import GenerationListEntity
        return GenerationListEntity(self, data)


    @property
    def intensity(self):
        """Idiomatic facade: client.intensity.list() / client.intensity.load({"id": ...})."""
        from entity.intensity_entity import IntensityEntity
        cached = getattr(self, "_intensity", None)
        if cached is None:
            cached = IntensityEntity(self, None)
            self._intensity = cached
        return cached

    def Intensity(self, data=None):
        # Deprecated: use client.intensity instead.
        from entity.intensity_entity import IntensityEntity
        return IntensityEntity(self, data)


    @property
    def intensity_factor(self):
        """Idiomatic facade: client.intensity_factor.list() / client.intensity_factor.load({"id": ...})."""
        from entity.intensity_factor_entity import IntensityFactorEntity
        cached = getattr(self, "_intensity_factor", None)
        if cached is None:
            cached = IntensityFactorEntity(self, None)
            self._intensity_factor = cached
        return cached

    def IntensityFactor(self, data=None):
        # Deprecated: use client.intensity_factor instead.
        from entity.intensity_factor_entity import IntensityFactorEntity
        return IntensityFactorEntity(self, data)


    @property
    def intensity_list(self):
        """Idiomatic facade: client.intensity_list.list() / client.intensity_list.load({"id": ...})."""
        from entity.intensity_list_entity import IntensityListEntity
        cached = getattr(self, "_intensity_list", None)
        if cached is None:
            cached = IntensityListEntity(self, None)
            self._intensity_list = cached
        return cached

    def IntensityList(self, data=None):
        # Deprecated: use client.intensity_list instead.
        from entity.intensity_list_entity import IntensityListEntity
        return IntensityListEntity(self, data)


    @property
    def regional(self):
        """Idiomatic facade: client.regional.list() / client.regional.load({"id": ...})."""
        from entity.regional_entity import RegionalEntity
        cached = getattr(self, "_regional", None)
        if cached is None:
            cached = RegionalEntity(self, None)
            self._regional = cached
        return cached

    def Regional(self, data=None):
        # Deprecated: use client.regional instead.
        from entity.regional_entity import RegionalEntity
        return RegionalEntity(self, data)


    @property
    def regional_intensity(self):
        """Idiomatic facade: client.regional_intensity.list() / client.regional_intensity.load({"id": ...})."""
        from entity.regional_intensity_entity import RegionalIntensityEntity
        cached = getattr(self, "_regional_intensity", None)
        if cached is None:
            cached = RegionalIntensityEntity(self, None)
            self._regional_intensity = cached
        return cached

    def RegionalIntensity(self, data=None):
        # Deprecated: use client.regional_intensity instead.
        from entity.regional_intensity_entity import RegionalIntensityEntity
        return RegionalIntensityEntity(self, data)


    @property
    def regional_intensity_list(self):
        """Idiomatic facade: client.regional_intensity_list.list() / client.regional_intensity_list.load({"id": ...})."""
        from entity.regional_intensity_list_entity import RegionalIntensityListEntity
        cached = getattr(self, "_regional_intensity_list", None)
        if cached is None:
            cached = RegionalIntensityListEntity(self, None)
            self._regional_intensity_list = cached
        return cached

    def RegionalIntensityList(self, data=None):
        # Deprecated: use client.regional_intensity_list instead.
        from entity.regional_intensity_list_entity import RegionalIntensityListEntity
        return RegionalIntensityListEntity(self, data)


    @property
    def stat(self):
        """Idiomatic facade: client.stat.list() / client.stat.load({"id": ...})."""
        from entity.stat_entity import StatEntity
        cached = getattr(self, "_stat", None)
        if cached is None:
            cached = StatEntity(self, None)
            self._stat = cached
        return cached

    def Stat(self, data=None):
        # Deprecated: use client.stat instead.
        from entity.stat_entity import StatEntity
        return StatEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
