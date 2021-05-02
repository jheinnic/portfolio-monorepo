import { BitStrategyKind } from './bit-strategy-kind.enum';
import { PrefixSelectStyle } from './prefix-select-style.enum';
import { Name } from '../../../infrastructure/validation';
export declare class ModelSeedPolicy {
    readonly name: Name;
    readonly bitMode: BitStrategyKind;
    readonly prefixSelect: PrefixSelectStyle;
    readonly xRunsForward: boolean;
    readonly yRunsForward: boolean;
    readonly xFromBit: number;
    readonly xToBit: number;
    readonly yFromBit: number;
    readonly yToBit: number;
    readonly useNewModel: boolean;
}
//# sourceMappingURL=model-seed-policy.config.d.ts.map