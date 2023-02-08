import { NgramSeedMapFacade } from '../components';
import { MODULE_ID } from '@jchptf/nestjs';

export const NGRAM_MODULE = Symbol('@jchptf/ngrams');
export type NGRAM_MODULE = typeof NGRAM_MODULE;

export const NGRAM_SEED_MAP_FACADE = Symbol('NGramSeedMapFacade');

export class NGramModuleId {
   public static readonly [MODULE_ID] = NGRAM_MODULE;

   [NGRAM_SEED_MAP_FACADE]: NgramSeedMapFacade;
}

export type NGramModuleType = typeof NGramModuleId;

// function blessLocal<Token extends keyof NGramModuleId>(token: Token):
//    LocalProviderToken<NGramModuleId[Token], NGramModuleType, Token>
// {
//    return blessLocalProviderToken(token, NGramModuleId);
// }
//
// export const NGRAM_ALPHABET_MAPPER_PROVIDER_TOKEN = blessLocal(NGRAM_SEED_MAP_FACADE);
