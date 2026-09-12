import { CarbonIntensityEntityBase } from '../CarbonIntensityEntityBase';
import type { CarbonIntensitySDK } from '../CarbonIntensitySDK';
import type { Control } from '../types';
import type { RegionalIntensityList, RegionalIntensityListLoadMatch, RegionalIntensityListListMatch } from '../CarbonIntensityTypes';
declare class RegionalIntensityListEntity extends CarbonIntensityEntityBase<RegionalIntensityList> {
    constructor(client: CarbonIntensitySDK, entopts: any);
    make(this: RegionalIntensityListEntity): RegionalIntensityListEntity;
    load(this: any, reqmatch?: RegionalIntensityListLoadMatch, ctrl?: Control): Promise<RegionalIntensityListEntity>;
    list(this: any, reqmatch?: RegionalIntensityListListMatch, ctrl?: Control): Promise<RegionalIntensityListEntity[]>;
}
export { RegionalIntensityListEntity };
