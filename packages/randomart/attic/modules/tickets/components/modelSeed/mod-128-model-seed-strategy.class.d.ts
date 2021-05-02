import { BitInputStream } from '@thi.ng/bitstream';
import { BitStrategyKind, ModelSeedPolicy } from '../../config';
import { AbstractModelSeedStrategy } from './abstract-model-seed.strategy.class';
export declare class Mod128ModelSeedStrategy extends AbstractModelSeedStrategy {
    constructor(policyData: ModelSeedPolicy);
    readonly strategyKind: BitStrategyKind;
    protected applyTransform(selectedBytes: BitInputStream, bitsToUse: number): Uint8Array;
}
//# sourceMappingURL=mod-128-model-seed-strategy.class.d.ts.map