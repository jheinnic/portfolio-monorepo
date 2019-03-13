import { FactoryProvider } from '@nestjs/common/interfaces';
import { DynamicProviderToken, ProviderToken } from './provider-token.type';

export interface IDynamicProvider<T> extends FactoryProvider {
   provide: DynamicProviderToken<T>;
   useFactory: (injected: T) => T;
   inject: [ProviderToken<T>];
}
