import { blessLocalProviderToken, LocalProviderToken } from '@jchptf/nestjs';
import { OneModule } from './module';

export const CONFIG_MODULE_ID = Symbol('@jchptf/config');
export type CONFIG_MODULE_ID = typeof CONFIG_MODULE_ID;

const CONFIG_METADATA_HELPER_SYMBOL = Symbol('IConfigMetadataHelper');

export interface IConfigModuleTokens {
   [CONFIG_METADATA_HELPER_SYMBOL]: number;
}

function blessProviderToken<K extends keyof IConfigModuleTokens>(
   token: K): LocalProviderToken<IConfigModuleTokens[K], typeof OneModule>
{
   return blessLocalProviderToken<IConfigModuleTokens[K], typeof OneModule>(
      token, OneModule);
}

export const CONFIG_METADATA_HELPER_PT =
   blessProviderToken(CONFIG_METADATA_HELPER_SYMBOL);
