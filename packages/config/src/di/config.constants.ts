import {DotenvConfigOptions} from 'dotenv';

import {
   getDynamicProviderBinding, getGlobalProviderToken, getModuleIdentifier, getNamedTypeIntent
} from '@jchptf/api';
import {IConfigClassFinder, IConfigFileReader, IConfigurationFactory} from '../interfaces';

export const CONFIG_MODULE_ID = getModuleIdentifier('@jchptf/config');

const CFR = getNamedTypeIntent<IConfigFileReader>("IConfigFileReader");
const CCF = getNamedTypeIntent<IConfigClassFinder>("IConfigClassFinder");
const CF = getNamedTypeIntent<IConfigurationFactory>("IConfigurationFactory");
const DCO = getNamedTypeIntent<DotenvConfigOptions>("DotenvConfigOptions");

export const CONFIG_FILE_READER =
   getGlobalProviderToken<IConfigFileReader>(CFR);
export const CONFIG_CLASS_FINDER =
   getGlobalProviderToken<IConfigClassFinder>(CCF);
export const CONFIGURATION_FACTORY =
   getGlobalProviderToken<IConfigurationFactory>(CF);
export const DOTENV_CONFIG_OPTIONS =
   getGlobalProviderToken<DotenvConfigOptions>(DCO);

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
