import {ImageStyleMetadata} from './image-style-metadata.interface';
import {UUID} from "../../../infrastructure/validation";
import {ModelSeedStrategyName} from "./model-seed-strategy-name.type";
import {ModelSeedStrategyMetadata} from "./model-seed-metadata.interface";
import {RenderStyleName} from "./render-style-name.type";
import {ImageStyleName} from "./image-style-name.type";
import {RenderStyleMetadata} from "./render-style-metadata.interface";

export interface IPolicyMetadataAccess {

   getConfigVersion(): UUID;

   findSeedStrategyByName(name: ModelSeedStrategyName): ModelSeedStrategyMetadata;

   findImageStyleByName(name: ImageStyleName): ImageStyleMetadata;

   findRenderStyleByName(name: RenderStyleName): RenderStyleMetadata;

   findRenderStylesByName(names: Iterable<RenderStyleName>): Iterable<RenderStyleMetadata>;

   findRenderStylesByImageStyleName(name: ImageStyleName): Iterable<RenderStyleMetadata>;
}
