import { ModelSeedStrategyName, RenderStyleName } from '../tickets/interface/policies';
import { IPaintModelSeedStrategy } from '../tickets/interface';

export interface ModelSeedStrategyMetadata {
   readonly name: ModelSeedStrategyName;
   // readonly useNewModel: boolean;
   // readonly xDimension: DimensionSeedMetadata;
   // readonly yDimension: DimensionSeedMetadata;
   readonly renderStyles: ReadonlyArray<RenderStyleName>;
   readonly modelSeedStrategy: IPaintModelSeedStrategy;
}
