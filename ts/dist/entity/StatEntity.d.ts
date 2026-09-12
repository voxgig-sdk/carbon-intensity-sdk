import { CarbonIntensityEntityBase } from '../CarbonIntensityEntityBase';
import type { CarbonIntensitySDK } from '../CarbonIntensitySDK';
import type { Control } from '../types';
import type { Stat, StatLoadMatch } from '../CarbonIntensityTypes';
declare class StatEntity extends CarbonIntensityEntityBase<Stat> {
    constructor(client: CarbonIntensitySDK, entopts: any);
    make(this: StatEntity): StatEntity;
    load(this: any, reqmatch?: StatLoadMatch, ctrl?: Control): Promise<StatEntity>;
}
export { StatEntity };
