import { ModelSeed } from './messages';
import { BitStrategyKind } from '../tickets/config';
import { Name } from '../../../../../../src/infrastructure/validation';

export interface IPaintModelSeedStrategy {
   readonly name: Name;

   readonly strategyKind: BitStrategyKind;

   extractSeed(publicKeyX: Buffer, publicKeyY: Buffer): ModelSeed | Promise<ModelSeed>;
}
