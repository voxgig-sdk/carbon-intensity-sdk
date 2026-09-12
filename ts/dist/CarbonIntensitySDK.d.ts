import { GenerationEntity } from './entity/GenerationEntity';
import { GenerationListEntity } from './entity/GenerationListEntity';
import { IntensityEntity } from './entity/IntensityEntity';
import { IntensityFactorEntity } from './entity/IntensityFactorEntity';
import { IntensityListEntity } from './entity/IntensityListEntity';
import { RegionalEntity } from './entity/RegionalEntity';
import { RegionalIntensityEntity } from './entity/RegionalIntensityEntity';
import { RegionalIntensityListEntity } from './entity/RegionalIntensityListEntity';
import { StatEntity } from './entity/StatEntity';
export type * from './CarbonIntensityTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { CarbonIntensityEntityBase } from './CarbonIntensityEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class CarbonIntensitySDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Generation(entopts?: Record<string, any>): GenerationEntity;
    GenerationList(entopts?: Record<string, any>): GenerationListEntity;
    Intensity(entopts?: Record<string, any>): IntensityEntity;
    IntensityFactor(entopts?: Record<string, any>): IntensityFactorEntity;
    IntensityList(entopts?: Record<string, any>): IntensityListEntity;
    Regional(entopts?: Record<string, any>): RegionalEntity;
    RegionalIntensity(entopts?: Record<string, any>): RegionalIntensityEntity;
    RegionalIntensityList(entopts?: Record<string, any>): RegionalIntensityListEntity;
    Stat(entopts?: Record<string, any>): StatEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): CarbonIntensitySDK;
    tester(testopts?: any, sdkopts?: any): CarbonIntensitySDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof CarbonIntensitySDK;
export { stdutil, config, BaseFeature, CarbonIntensityEntityBase, CarbonIntensitySDK, SDK, };
