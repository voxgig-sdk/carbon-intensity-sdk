import { CarbonIntensityEntityBase } from '../CarbonIntensityEntityBase';
import type { CarbonIntensitySDK } from '../CarbonIntensitySDK';
import type { Control } from '../types';
import type { Generation, GenerationLoadMatch, GenerationListMatch } from '../CarbonIntensityTypes';
declare class GenerationEntity extends CarbonIntensityEntityBase<Generation> {
    constructor(client: CarbonIntensitySDK, entopts: any);
    make(this: GenerationEntity): GenerationEntity;
    load(this: any, reqmatch?: GenerationLoadMatch, ctrl?: Control): Promise<GenerationEntity>;
    list(this: any, reqmatch?: GenerationListMatch, ctrl?: Control): Promise<GenerationEntity[]>;
}
export { GenerationEntity };
