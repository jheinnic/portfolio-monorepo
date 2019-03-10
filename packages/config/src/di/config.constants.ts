import { DotenvConfigOptions } from 'dotenv';

import {
   getDynamicModuleType, getLocalProviderToken, getModuleIdentifier, getNamedTypeIntent,
} from '@jchptf/nestjs';
import { IConfigReader, IConfigLoader, IConfigMetadataHelper } from '../interfaces';

export const CONFIG_MODULE_ID = getModuleIdentifier('@jchptf/config');

const CMH = getNamedTypeIntent<IConfigMetadataHelper>('IConfigMetadataHelper');
const CR  = getNamedTypeIntent<IConfigReader>('IConfigReader');
const CL  = getNamedTypeIntent<IConfigLoader>('IConfigLoader');
const DCO = getNamedTypeIntent<DotenvConfigOptions|false>('DotenvConfigOptions');

export const CONFIG_METADATA_HELPER_PROVIDER =
   getLocalProviderToken<IConfigMetadataHelper>(CONFIG_MODULE_ID, CMH);
export const CONFIG_READER_PROVIDER =
   getLocalProviderToken<IConfigReader>(CONFIG_MODULE_ID, CR);
export const CONFIG_LOADER_PROVIDER =
   getLocalProviderToken<IConfigLoader>(CONFIG_MODULE_ID, CL);
export const DOTENV_CONFIG_OPTIONS =
   getLocalProviderToken<DotenvConfigOptions|false>(CONFIG_MODULE_ID, DCO);

export const CONFIG_DYNAMIC_MODULE_TYPE =
   getDynamicModuleType(CONFIG_MODULE_ID);
