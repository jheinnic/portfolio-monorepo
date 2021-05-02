import { BitInputStream } from '@thi.ng/bitstream';
import { BitStrategyKind, ModelSeedPolicy } from '../../config';
import { AbstractModelSeedStrategy } from './abstract-model-seed.strategy.class';
export declare class RawMappedModelSeedStrategy extends AbstractModelSeedStrategy {
    constructor(policyData: ModelSeedPolicy);
    private static byteMap;
    readonly strategyKind: BitStrategyKind;
    protected applyTransform(selectedBytes: BitInputStream, bitsToUse: number): Uint8Array;
}
//# sourceMappingURL=raw-mapped-model-seed-strategy.class.d.ts.map