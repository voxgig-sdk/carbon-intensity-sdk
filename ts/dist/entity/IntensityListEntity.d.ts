import { CarbonIntensityEntityBase } from '../CarbonIntensityEntityBase';
import type { CarbonIntensitySDK } from '../CarbonIntensitySDK';
import type { Control } from '../types';
import type { IntensityList, IntensityListLoadMatch, IntensityListListMatch } from '../CarbonIntensityTypes';
declare class IntensityListEntity extends CarbonIntensityEntityBase<IntensityList> {
    constructor(client: CarbonIntensitySDK, entopts: any);
    make(this: IntensityListEntity): IntensityListEntity;
    load(this: any, reqmatch?: IntensityListLoadMatch, ctrl?: Control): Promise<IntensityListEntity>;
    list(this: any, reqmatch?: IntensityListListMatch, ctrl?: Control): Promise<IntensityListEntity[]>;
}
export { IntensityListEntity };
