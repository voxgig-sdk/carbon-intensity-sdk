"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarbonIntensityError = void 0;
class CarbonIntensityError extends Error {
    isCarbonIntensityError = true;
    sdk = 'CarbonIntensity';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.CarbonIntensityError = CarbonIntensityError;
//# sourceMappingURL=CarbonIntensityError.js.map