import { DotenvConfigOptions } from 'dotenv';

import { getLocalProviderTokenString, getModuleIdentifier } from '@jchptf/nestjs';

import { IConfigReader, IConfigLoader, IConfigMetadataHelper } from '../interfaces';

export const CONFIG_MODULE_ID = getModuleIdentifier('@jchptf/config');

// const CMH = getNamedTypeIntent<IConfigMetadataHelper>('IConfigMetadataHelper');
// const CR  = getNamedTypeIntent<IConfigReader>('IConfigReader');
// const CL  = getNamedTypeIntent<IConfigLoader>('IConfigLoader');
// const DCO = getNamedTypeIntent<DotenvConfigOptions|false>('DotenvConfigOptions');

export const CONFIG_METADATA_HELPER_PROVIDER =
   getLocalProviderTokenString<IConfigMetadataHelper>(CONFIG_MODULE_ID, 'IConfigMetadataHelper');
export const CONFIG_READER_PROVIDER =
   getLocalProviderTokenString<IConfigReader>(CONFIG_MODULE_ID, 'IConfigReader');
export const CONFIG_LOADER_PROVIDER =
   getLocalProviderTokenString<IConfigLoader>(CONFIG_MODULE_ID, 'IConfigLoader');
export const DOTENV_CONFIG_OPTIONS =
   getLocalProviderTokenString<DotenvConfigOptions|false>(CONFIG_MODULE_ID, 'DotenvConfigOptions');

// export const CONFIG_DYNAMIC_MODULE_TYPE =
//    getDynamicModuleKind(CONFIG_MODULE_ID);
