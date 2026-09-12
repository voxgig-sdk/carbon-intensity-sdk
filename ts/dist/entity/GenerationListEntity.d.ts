import { CarbonIntensityEntityBase } from '../CarbonIntensityEntityBase';
import type { CarbonIntensitySDK } from '../CarbonIntensitySDK';
import type { Control } from '../types';
import type { GenerationList, GenerationListListMatch } from '../CarbonIntensityTypes';
declare class GenerationListEntity extends CarbonIntensityEntityBase<GenerationList> {
    constructor(client: CarbonIntensitySDK, entopts: any);
    make(this: GenerationListEntity): GenerationListEntity;
    list(this: any, reqmatch?: GenerationListListMatch, ctrl?: Control): Promise<GenerationListEntity[]>;
}
export { GenerationListEntity };
