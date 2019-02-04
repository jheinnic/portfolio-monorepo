import { DotenvConfigOptions } from 'dotenv';

import {
   getDynamicProviderBinding, getGlobalProviderToken, getModuleIdentifier, getNamedTypeIntent,
} from '@jchptf/api';
import { IConfigFileReader, IConfigLoader, IConfigMetadataHelper } from '../interfaces';

export const CONFIG_MODULE_ID = getModuleIdentifier('@jchptf/config');

const CMH = getNamedTypeIntent<IConfigMetadataHelper>('IConfigMetadataHelper');
const CFR = getNamedTypeIntent<IConfigFileReader>('IConfigFileReader');
const CL  = getNamedTypeIntent<IConfigLoader>('IConfigLoader');
const DCO = getNamedTypeIntent<DotenvConfigOptions|false>('DotenvConfigOptions');

export const CONFIG_METADATA_HELPER_PROVIDER =
   getGlobalProviderToken<IConfigMetadataHelper>(CMH);
export const CONFIG_FILE_READER_PROVIDER =
   getGlobalProviderToken<IConfigFileReader>(CFR);
export const CONFIG_LOADER_PROVIDER =
   getGlobalProviderToken<IConfigLoader>(CL);
export const DOTENV_CONFIG_OPTIONS =
   getGlobalProviderToken<DotenvConfigOptions|false>(DCO);

export const CONFIG_MODULE_DYNAMIC_PROVIDER_BINDING =
   getDynamicProviderBinding(CONFIG_MODULE_ID);

// interface ConfigTypeNames {
//    configFileReader: IConfigFileReader;
//    configClassFinder: IConfigClassFinder;
//    configurationFactory: IConfigurationFactory;
//    dotenvConfigOptions: DotenvConfigOptions;
// }
//
// export const CONFIG_TYPES: TokenDictionary<ConfigTypeNames> = {
//    configurationFactory: CONFIGURATION_FACTORY,
//    configClassFinder: CONFIG_CLASS_FINDER,
//    configFileReader: CONFIG_FILE_READER,
//    dotenvConfigOptions: DOTENV_CONFIG_OPTIONS
// };
