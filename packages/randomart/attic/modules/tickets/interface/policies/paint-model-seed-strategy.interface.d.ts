import { BitStrategyKind } from '../../config';
import { Name } from '../../../../infrastructure/validation';
import { IModelSeed } from '../../../randomArt/interface/model';
export interface IPaintModelSeedStrategy {
    readonly name: Name;
    readonly strategyKind: BitStrategyKind;
    extractSeed(publicKeyX: Buffer, publicKeyY: Buffer): IModelSeed | Promise<IModelSeed>;
}
//# sourceMappingURL=paint-model-seed-strategy.interface.d.ts.map