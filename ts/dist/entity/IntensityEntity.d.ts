import { CarbonIntensityEntityBase } from '../CarbonIntensityEntityBase';
import type { CarbonIntensitySDK } from '../CarbonIntensitySDK';
import type { Control } from '../types';
import type { Intensity, IntensityLoadMatch, IntensityListMatch } from '../CarbonIntensityTypes';
declare class IntensityEntity extends CarbonIntensityEntityBase<Intensity> {
    constructor(client: CarbonIntensitySDK, entopts: any);
    make(this: IntensityEntity): IntensityEntity;
    load(this: any, reqmatch?: IntensityLoadMatch, ctrl?: Control): Promise<IntensityEntity>;
    list(this: any, reqmatch?: IntensityListMatch, ctrl?: Control): Promise<IntensityEntity[]>;
}
export { IntensityEntity };
