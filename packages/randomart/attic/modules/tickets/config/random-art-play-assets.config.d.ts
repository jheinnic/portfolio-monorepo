import { UUID } from '../../../infrastructure/validation';
import { ImageStylePolicy, ModelSeedPolicy, RenderingPolicy } from '.';
export declare class RandomArtPlayAssets {
    readonly configVersion: UUID;
    readonly imagePolicies: ReadonlyArray<ImageStylePolicy>;
    readonly seedPolicies: ReadonlyArray<ModelSeedPolicy>;
    readonly renderPolicies: ReadonlyArray<RenderingPolicy>;
}
//# sourceMappingURL=random-art-play-assets.config.d.ts.map