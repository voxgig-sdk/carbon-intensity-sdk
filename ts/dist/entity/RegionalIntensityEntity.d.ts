import { CarbonIntensityEntityBase } from '../CarbonIntensityEntityBase';
import type { CarbonIntensitySDK } from '../CarbonIntensitySDK';
import type { Control } from '../types';
import type { RegionalIntensity, RegionalIntensityLoadMatch, RegionalIntensityListMatch } from '../CarbonIntensityTypes';
declare class RegionalIntensityEntity extends CarbonIntensityEntityBase<RegionalIntensity> {
    constructor(client: CarbonIntensitySDK, entopts: any);
    make(this: RegionalIntensityEntity): RegionalIntensityEntity;
    load(this: any, reqmatch?: RegionalIntensityLoadMatch, ctrl?: Control): Promise<RegionalIntensityEntity>;
    list(this: any, reqmatch?: RegionalIntensityListMatch, ctrl?: Control): Promise<RegionalIntensityEntity[]>;
}
export { RegionalIntensityEntity };
