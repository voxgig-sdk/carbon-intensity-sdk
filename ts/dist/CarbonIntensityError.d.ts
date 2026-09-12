import { Context } from './Context';
declare class CarbonIntensityError extends Error {
    isCarbonIntensityError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { CarbonIntensityError };
