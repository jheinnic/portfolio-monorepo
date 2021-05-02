import { ModelSeedStrategyName, RenderStyleName } from '.';
import { IPaintModelSeedStrategy } from '..';
export interface ModelSeedStrategyMetadata {
    readonly name: ModelSeedStrategyName;
    readonly renderStyles: ReadonlyArray<RenderStyleName>;
    readonly modelSeedStrategy: IPaintModelSeedStrategy;
}
//# sourceMappingURL=model-seed-metadata.interface.d.ts.map