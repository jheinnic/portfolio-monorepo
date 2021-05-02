import '@jchptf/reflection';
import { UUID } from '../../../../../src/infrastructure/validation';
import { ImageStylePolicy, ModelSeedPolicy, RenderingPolicy } from './index';
export declare class RandomArtPlayAssets {
    readonly configVersion: UUID;
    readonly imagePolicies: ReadonlyArray<ImageStylePolicy>;
    readonly seedPolicies: ReadonlyArray<ModelSeedPolicy>;
    readonly renderPolicies: ReadonlyArray<RenderingPolicy>;
}
//# sourceMappingURL=random-art-play-assets.config.d.ts.map