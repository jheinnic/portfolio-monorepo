import { StringQualifier } from './string-qualifier.type';

export type BaseProviderToken<Type, Modifier extends string = 'ProviderToken'> =
   StringQualifier<'ProviderToken' & Modifier, Type>;

export type LocalProviderToken<T> = BaseProviderToken<T, 'Local'>;

export type DynamicProviderToken<T> = BaseProviderToken<T, 'Local' & 'Dynamic'>;

export type GlobalProviderToken<T> = BaseProviderToken<T, 'Global'>;

export type ProviderToken<T> =
   LocalProviderToken<T> | DynamicProviderToken<T> | GlobalProviderToken<T>;
