import { CarbonIntensityEntityBase } from '../CarbonIntensityEntityBase';
import type { CarbonIntensitySDK } from '../CarbonIntensitySDK';
import type { Control } from '../types';
import type { IntensityFactor, IntensityFactorListMatch } from '../CarbonIntensityTypes';
declare class IntensityFactorEntity extends CarbonIntensityEntityBase<IntensityFactor> {
    constructor(client: CarbonIntensitySDK, entopts: any);
    make(this: IntensityFactorEntity): IntensityFactorEntity;
    list(this: any, reqmatch?: IntensityFactorListMatch, ctrl?: Control): Promise<IntensityFactorEntity[]>;
}
export { IntensityFactorEntity };
