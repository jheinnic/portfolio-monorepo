import {DotenvConfigOptions} from 'dotenv';

import {IntentQualifier, TokenDictionary} from '../interfaces/injection-token.type';
import {getLocalProviderToken} from '../token-identifier.utilities';
import {IConfigurationFactory} from '../interfaces/configuration-factory.interface';
import {IConfigClassFinder} from '../interfaces/config-class-finder.interface';
import {IConfigFileReader} from '../interfaces/config-file-reader.interface';


export const CONFIG_FILE_READER = "ConfigFileReader" as IntentQualifier;
export const CONFIG_CLASS_FINDER = "ConfigClassFinder" as IntentQualifier;
export const CONFIGURATION_FACTORY = "ConfigurationFactory" as IntentQualifier;
export const DOTENV_CONFIG_OPTIONS = "DotenvConfigOptions" as IntentQualifier;

type ConfigTypeNames =
   typeof CONFIGURATION_FACTORY |
   typeof CONFIG_CLASS_FINDER |
   typeof CONFIG_FILE_READER |
   typeof DOTENV_CONFIG_OPTIONS
;

export const CONFIG_TYPES: TokenDictionary<ConfigTypeNames> = {
   ConfigurationFactory: getLocalProviderToken<IConfigurationFactory>(CONFIGURATION_FACTORY),
   ConfigClassFinder: getLocalProviderToken<IConfigClassFinder>(CONFIG_CLASS_FINDER),
   ConfigFileReader: getLocalProviderToken<IConfigFileReader>(CONFIG_FILE_READER),
   DotenvConfigOptions: getLocalProviderToken<DotenvConfigOptions>(DOTENV_CONFIG_OPTIONS),
};