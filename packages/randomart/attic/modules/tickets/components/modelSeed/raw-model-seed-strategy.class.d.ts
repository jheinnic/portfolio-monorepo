import { BitInputStream } from '@thi.ng/bitstream';
import { BitStrategyKind, ModelSeedPolicy } from '../../config';
import { AbstractModelSeedStrategy } from './abstract-model-seed.strategy.class';
export declare class RawModelSeedStrategy extends AbstractModelSeedStrategy {
    constructor(policyData: ModelSeedPolicy);
    readonly strategyKind: BitStrategyKind;
    protected applyTransform(selectedBits: BitInputStream, bitsToUse: number): Uint8Array;
}
//# sourceMappingURL=raw-model-seed-strategy.class.d.ts.map