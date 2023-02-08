import { NGRAM_SEED_MAP_FACADE_PROVIDER_TOKEN, NGramModuleType } from './ngrams.constants';
import { INgramSeedMapFacade, NgramSeedMapFacade } from '../components';
import { DynamicProviderBindingStyle, IAsClass } from '@jchptf/nestjs';

export const NGRAM_SEED_MAP_FACADE: IAsClass<INgramSeedMapFacade, NGramModuleType> = {
   style: DynamicProviderBindingStyle.CLASS,
   provide: NGRAM_SEED_MAP_FACADE_PROVIDER_TOKEN,
   useClass: NgramSeedMapFacade,
};

export const NGRAM_PROVIDERS = [NGRAM_SEED_MAP_FACADE]
