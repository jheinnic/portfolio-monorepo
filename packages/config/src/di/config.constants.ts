// import {IConfigLoader, IConfigMetadataHelper, IConfigReader} from '../interfaces';

import { REGISTRY, MARKER } from '@jchptf/nestjs';
import { IConfigLoader, IConfigMetadataHelper, IConfigReader } from '../interfaces';
import { DotenvConfigOptions } from 'dotenv';

export const CONFIG_METADATA_HELPER: unique symbol = Symbol('IConfigMetadataHelper');
export const CONFIG_READER: unique symbol = Symbol('IConfigReader');
export const CONFIG_LOADER: unique symbol = Symbol('IConfigLoader');
export const DOTENV_CONFIG_OPTIONS: unique symbol = Symbol('DotenvConfigOptions');

export class ConfigModuleTypes {
   readonly [REGISTRY] = MARKER;

   [CONFIG_READER]: IConfigReader;
   [CONFIG_LOADER]: IConfigLoader;
   [DOTENV_CONFIG_OPTIONS]: DotenvConfigOptions;
   [CONFIG_METADATA_HELPER]: IConfigMetadataHelper;
}

export class DynamicConfigModuleImports {
   [DOTENV_CONFIG_OPTIONS]: ConfigModuleTypes[typeof DOTENV_CONFIG_OPTIONS];
}
