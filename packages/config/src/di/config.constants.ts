import {DotenvConfigOptions} from 'dotenv';

import {getLocalProviderToken, TokenDictionary} from '@jchptf/api';
import {IConfigClassFinder, IConfigFileReader, IConfigurationFactory} from '../interfaces';

export const CONFIG_FILE_READER =
   getLocalProviderToken<IConfigFileReader>("ConfigFileReader");
export const CONFIG_CLASS_FINDER =
   getLocalProviderToken<IConfigClassFinder>("ConfigClassFinder");
export const CONFIGURATION_FACTORY =
   getLocalProviderToken<IConfigurationFactory>("ConfigurationFactory");
export const DOTENV_CONFIG_OPTIONS =
   getLocalProviderToken<DotenvConfigOptions>("DotenvConfigOptions");

type ConfigTypeNames =
   typeof CONFIGURATION_FACTORY |
   typeof CONFIG_CLASS_FINDER |
   typeof CONFIG_FILE_READER |
   typeof DOTENV_CONFIG_OPTIONS
;

export const CONFIG_TYPES: TokenDictionary<ConfigTypeNames> = {
   ConfigurationFactory: CONFIGURATION_FACTORY,
   ConfigClassFinder: CONFIG_CLASS_FINDER,
   ConfigFileReader: CONFIG_FILE_READER,
   DotenvConfigOptions: DOTENV_CONFIG_OPTIONS
};