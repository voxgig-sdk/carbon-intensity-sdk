import { CarbonIntensityEntityBase } from '../CarbonIntensityEntityBase';
import type { CarbonIntensitySDK } from '../CarbonIntensitySDK';
import type { Control } from '../types';
import type { Regional, RegionalListMatch } from '../CarbonIntensityTypes';
declare class RegionalEntity extends CarbonIntensityEntityBase<Regional> {
    constructor(client: CarbonIntensitySDK, entopts: any);
    make(this: RegionalEntity): RegionalEntity;
    list(this: any, reqmatch?: RegionalListMatch, ctrl?: Control): Promise<RegionalEntity[]>;
}
export { RegionalEntity };
