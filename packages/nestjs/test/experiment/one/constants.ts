import {
   blessLocalProviderToken, LocalProviderToken, VisibleProviderToken
} from '@jchptf/nestjs';
import { IConfigMetadataHelper } from '@jchptf/config';

export const CONFIG_MODULE_ID = Symbol('@jchptf/config');
export type CONFIG_MODULE_ID = typeof CONFIG_MODULE_ID;

const CONFIG_METADATA_HELPER_SYMBOL = Symbol('IConfigMetadataHelper');

export interface IConfigModuleTokens {
   [CONFIG_METADATA_HELPER_SYMBOL]: IConfigMetadataHelper;
}

function blessProviderToken<Token extends keyof IConfigModuleTokens>(
   token: Token): LocalProviderToken<IConfigModuleTokens[Token], CONFIG_MODULE_ID, Token>
{
   return blessLocalProviderToken(token);
}

export const CONFIG_METADATA_HELPER_PT2 =
   blessLocalProviderToken<IConfigMetadataHelper, CONFIG_MODULE_ID, 'ABCD'>('ABCD');
export const CONFIG_METADATA_HELPER_PT =
   blessProviderToken(CONFIG_METADATA_HELPER_SYMBOL);

   // blessLocalProviderToken<
   //    IConfigMetadataHelper, CONFIG_MODULE_ID, typeof CONFIG_METADATA_HELPER_SYMBOL>(
   //       CONFIG_METADATA_HELPER_SYMBOL);
export type CONFIG_METADATA_HELPER_PT = typeof CONFIG_METADATA_HELPER_PT;

export const foo: CONFIG_METADATA_HELPER_PT = 'ABCD';
export const foo2: CONFIG_METADATA_HELPER_PT = CONFIG_METADATA_HELPER_PT;

export const OTHER = Symbol('aaa')
export type OTHER = typeof OTHER;

export const foo3: VisibleProviderToken<IConfigMetadataHelper, OTHER> =
   CONFIG_METADATA_HELPER_PT;