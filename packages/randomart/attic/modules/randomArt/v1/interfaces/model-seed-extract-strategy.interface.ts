import {BitStrategyKind} from '../../../../../src/modules/tickets/config/bit-strategy-kind.enum';

export interface IModelSeedExtractStrategy {
   strategyKey(): BitStrategyKind
   applyStrategy()
}