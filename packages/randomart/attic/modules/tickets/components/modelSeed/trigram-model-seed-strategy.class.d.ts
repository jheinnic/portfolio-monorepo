import { BitInputStream } from '@thi.ng/bitstream';
import { BitStrategyKind, ModelSeedPolicy } from '../../config';
import { AbstractAsyncModelSeedStrategy } from './abstract-async-model-seed.strategy.class';
export declare class TrigramModelSeedStrategy extends AbstractAsyncModelSeedStrategy {
    private trigrams;
    constructor(policyData: ModelSeedPolicy);
    readonly strategyKind: BitStrategyKind;
    protected applyTransform(selectedBytes: BitInputStream, bitsToUse: number): Promise<Uint8Array>;
}
//# sourceMappingURL=trigram-model-seed-strategy.class.d.ts.map