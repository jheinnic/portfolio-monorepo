import { BitInputStream } from '@thi.ng/bitstream';
import { IPaintModelSeedStrategy } from '../../interface';
import { BitStrategyKind, ModelSeedPolicy } from '../../config';
import { Name } from '../../../../infrastructure/validation';
import { IArtworkSeed } from '../../../../../src/apps/modules/roots/paint-gateway/follower/interface/model';
export declare abstract class AbstractModelSeedStrategy implements IPaintModelSeedStrategy {
    protected readonly policyData: ModelSeedPolicy;
    constructor(policyData: ModelSeedPolicy);
    readonly name: Name;
    abstract readonly strategyKind: BitStrategyKind;
    extractSeed(publicKeyX: Buffer, publicKeyY: Buffer): IArtworkSeed;
    protected abstract applyTransform(selectedBytes: BitInputStream, bitsToUse: number): Uint8Array;
}
//# sourceMappingURL=abstract-model-seed.strategy.class.d.ts.map