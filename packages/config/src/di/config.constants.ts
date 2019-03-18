import { DotenvConfigOptions } from 'dotenv';

import {
   getDynamicModuleKind, getLocalProviderToken, getModuleIdentifier,
} from '@jchptf/nestjs';
import { IConfigReader, IConfigLoader, IConfigMetadataHelper } from '../interfaces';

export const CONFIG_MODULE_ID = getModuleIdentifier('@jchptf/config');

// const CMH = getNamedTypeIntent<IConfigMetadataHelper>('IConfigMetadataHelper');
// const CR  = getNamedTypeIntent<IConfigReader>('IConfigReader');
// const CL  = getNamedTypeIntent<IConfigLoader>('IConfigLoader');
// const DCO = getNamedTypeIntent<DotenvConfigOptions|false>('DotenvConfigOptions');

export const CONFIG_METADATA_HELPER_PROVIDER =
   getLocalProviderToken<IConfigMetadataHelper>('IConfigMetadataHelper');
export const CONFIG_READER_PROVIDER =
   getLocalProviderToken<IConfigReader>('IConfigReader');
export const CONFIG_LOADER_PROVIDER =
   getLocalProviderToken<IConfigLoader>('IConfigLoader');
export const DOTENV_CONFIG_OPTIONS =
   getLocalProviderToken<DotenvConfigOptions|false>('DotenvConfigOptions');

export const CONFIG_DYNAMIC_MODULE_TYPE =
   getDynamicModuleKind(CONFIG_MODULE_ID);
