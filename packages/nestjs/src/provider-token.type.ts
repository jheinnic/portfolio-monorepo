import { BaseProviderToken } from './string-qualifier.type';
import { FactoryProvider } from '@nestjs/common/interfaces';

export type LocalProviderToken<T> = BaseProviderToken<T, 'Local'>;

export type DynamicProviderToken<T> = BaseProviderToken<T, 'Local' & 'Dynamic'>;

export type GlobalProviderToken<T> = BaseProviderToken<T, 'Global'>;

export type ProviderToken<T> =
   LocalProviderToken<T> | DynamicProviderToken<T> | GlobalProviderToken<T>;

export interface DynamicProvider<T> extends FactoryProvider {
   provide: DynamicProviderToken<T>,
   useFactory: (injected: T) => T,
   inject: [LocalProviderToken<T>]
}
