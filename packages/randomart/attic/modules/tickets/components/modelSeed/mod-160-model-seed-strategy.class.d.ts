import { BitInputStream } from '@thi.ng/bitstream';
import { BitStrategyKind, ModelSeedPolicy } from '../../config';
import { AbstractModelSeedStrategy } from './abstract-model-seed.strategy.class';
export declare class Mod160ModelSeedStrategy extends AbstractModelSeedStrategy {
    constructor(policyData: ModelSeedPolicy);
    readonly strategyKind: BitStrategyKind;
    protected applyTransform(selectedBytes: BitInputStream, bitsToUse: number): Uint8Array;
}
//# sourceMappingURL=mod-160-model-seed-strategy.class.d.ts.map