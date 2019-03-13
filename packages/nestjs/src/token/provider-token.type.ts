import { StringQualifier } from '@jchptf/api';
import { ConstructorFor } from 'simplytyped';

export type BaseProviderToken<Type, Modifier extends string = 'ProviderToken'> =
   StringQualifier<'ProviderToken' & Modifier, Type>;

export type LocalProviderToken<T> = BaseProviderToken<T, 'Local'>;

export type DynamicProviderToken<T> = BaseProviderToken<T, 'Local' & 'Dynamic'>;

export type GlobalProviderToken<T> = BaseProviderToken<T, 'Global'>;

export type ProviderToken<T> =
   LocalProviderToken<T> | DynamicProviderToken<T> | GlobalProviderToken<T>;

export type InjectableKey<T> =
   T extends object ? ProviderToken<T> | ConstructorFor<T> : ProviderToken<T>;

   // NOTE: Nest does allow any for provider token use, but seems to break when symbols are used,
   //       and I have no wish to see any non-string, non-Type identifier yet, so let's try doing
   //       without the any type here.  It may be necessary to put this back in order to achieve
   //       compatibility between the more strongly-asserting Provider types given in this package
   //       and the ones used by the NestJS framework interface, but perhaps not...
   // NOTE: Nest may allow a singleton object type, such as Angular's InjectionToken, and it may
   //       be worth replacing the NominalType-wrapped strings used thus far with singleton
   //       flyweight objects.  It may even be possible to make such a switch just by replacing
   //       utility method implementations found in provider-token.utilities.  Consider
   //       investigating as time permits...
   // any;
