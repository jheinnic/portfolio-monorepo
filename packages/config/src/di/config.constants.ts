import { DotenvConfigOptions } from 'dotenv';

import { blessLocalProviderToken, LocalProviderToken, MODULE_ID } from '@jchptf/nestjs';

import { IConfigLoader, IConfigMetadataHelper, IConfigReader } from '../interfaces';

export const CONFIG_MODULE_ID = Symbol('@jchptf/config');
export type CONFIG_MODULE_ID = typeof CONFIG_MODULE_ID;

export const CONFIG_METADATA_HELPER = Symbol('IConfigMetadataHelper');
export const CONFIG_READER = Symbol('IConfigReader');
export const CONFIG_LOADER = Symbol('IConfigLoader');
export const DOTENV_CONFIG_OPTIONS = Symbol('DotenvConfigOptions');

export class ConfigModuleId {
   public static readonly [MODULE_ID]: CONFIG_MODULE_ID;

   [CONFIG_METADATA_HELPER]: IConfigMetadataHelper;
   [CONFIG_READER]: IConfigReader;
   [CONFIG_LOADER]: IConfigLoader;
   [DOTENV_CONFIG_OPTIONS]: DotenvConfigOptions;
}

function blessLocal<K extends keyof ConfigModuleId>(token: K):
   LocalProviderToken<ConfigModuleId[K], typeof ConfigModuleId, K>
{
   return blessLocalProviderToken(token, ConfigModuleId);
}

export const CONFIG_METADATA_HELPER_PROVIDER_TOKEN = blessLocal(CONFIG_METADATA_HELPER);
export const CONFIG_READER_PROVIDER_TOKEN = blessLocal(CONFIG_READER);
export const CONFIG_LOADER_PROVIDER_TOKEN = blessLocal(CONFIG_LOADER);
export const DOTENV_CONFIG_OPTIONS_PROVIDER_TOKEN = blessLocal(DOTENV_CONFIG_OPTIONS);

// export type CONFIG_METADATA_HELPER_PROVIDER_TOKEN = typeof CONFIG_METADATA_HELPER;
// export type CONFIG_READER_PROVIDER_TOKEN = typeof CONFIG_READER;
// export type CONFIG_LOADER_PROVIDER_TOKEN = typeof CONFIG_LOADER;
// export type DOTENV_CONFIG_OPTIONS_PROVIDER_TOKEN = typeof DOTENV_CONFIG_OPTIONS;
