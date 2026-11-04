import { CarbonIntensityEntityBase } from '../CarbonIntensityEntityBase';
import type { CarbonIntensitySDK } from '../CarbonIntensitySDK';
import type { Control } from '../types';
import type { RegionalIntensity, RegionalIntensityListMatch } from '../CarbonIntensityTypes';
declare class RegionalIntensityEntity extends CarbonIntensityEntityBase<RegionalIntensity> {
    constructor(client: CarbonIntensitySDK, entopts: any);
    make(this: RegionalIntensityEntity): RegionalIntensityEntity;
    list(this: any, reqmatch?: RegionalIntensityListMatch, ctrl?: Control): Promise<RegionalIntensityEntity[]>;
}
export { RegionalIntensityEntity };
