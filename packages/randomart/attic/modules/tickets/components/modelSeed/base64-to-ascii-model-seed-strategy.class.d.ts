import { BitInputStream } from '@thi.ng/bitstream';
import { BitStrategyKind, ModelSeedPolicy } from '../../config';
import { AbstractModelSeedStrategy } from './abstract-model-seed.strategy.class';
export declare class Base64ToAsciiModelSeedStrategy extends AbstractModelSeedStrategy {
    constructor(policyData: ModelSeedPolicy);
    readonly strategyKind: BitStrategyKind;
    protected applyTransform(selectedBits: BitInputStream, bitsToUse: number): Uint8Array;
}
//# sourceMappingURL=base64-to-ascii-model-seed-strategy.class.d.ts.map