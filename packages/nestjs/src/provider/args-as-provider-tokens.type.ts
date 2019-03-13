import { AnyFunc } from 'simplytyped';
import { InjectableKey, ProviderToken } from './provider-token.type';

export type ArgsAsProviderTokens<F extends AnyFunc> = F extends () => any ? void[]
   : F extends (x1: infer X1) => any
      ? [ProviderToken<X1>]
      : F extends (x1: infer X1, x2: infer X2) => any
         ? [ProviderToken<X1>, ProviderToken<X2>]
         : F extends (x1: infer X1, x2: infer X2, x3: infer X3) => any
            ? [ProviderToken<X1>, ProviderToken<X2>, ProviderToken<X3>]
            : F extends (x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4) => any
               ? [ProviderToken<X1>, ProviderToken<X2>, ProviderToken<X3>, ProviderToken<X4>]
               : F extends (
                  x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4, x5: infer X5) => any
                  ? [ProviderToken<X1>, ProviderToken<X2>, ProviderToken<X3>,
                     ProviderToken<X4>, ProviderToken<X5>]
                  : F extends (
                     x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4, x5: infer X5,
                     x6: infer X6) => any
                     ? [ProviderToken<X1>, ProviderToken<X2>, ProviderToken<X3>,
                        ProviderToken<X4>, ProviderToken<X5>, ProviderToken<X6>]
                     : F extends (
                        x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4, x5: infer X5,
                        x6: infer X6, x7: infer X7) => any
                        ? [ProviderToken<X1>, ProviderToken<X2>,
                           ProviderToken<X3>, ProviderToken<X4>, ProviderToken<X5>,
                           ProviderToken<X6>, ProviderToken<X7>]
                        : ProviderToken<any>[];

export type ArgsAsInjectableKeys<F extends AnyFunc> = F extends () => any ? void[]
   : F extends (x1: infer X1) => any
      ? [InjectableKey<X1>]
      : F extends (x1: infer X1, x2: infer X2) => any
         ? [InjectableKey<X1>, InjectableKey<X2>]
         : F extends (x1: infer X1, x2: infer X2, x3: infer X3) => any
            ? [InjectableKey<X1>, InjectableKey<X2>, InjectableKey<X3>]
            : F extends (x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4) => any
               ? [InjectableKey<X1>, InjectableKey<X2>, InjectableKey<X3>, InjectableKey<X4>]
               : F extends (
                  x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4, x5: infer X5) => any
                  ? [InjectableKey<X1>, InjectableKey<X2>, InjectableKey<X3>,
                     InjectableKey<X4>, InjectableKey<X5>]
                  : F extends (
                     x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4, x5: infer X5,
                     x6: infer X6) => any
                     ? [InjectableKey<X1>, InjectableKey<X2>, InjectableKey<X3>,
                        InjectableKey<X4>, InjectableKey<X5>, InjectableKey<X6>]
                     : F extends (
                        x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4, x5: infer X5,
                        x6: infer X6, x7: infer X7) => any
                        ? [InjectableKey<X1>, InjectableKey<X2>,
                           InjectableKey<X3>, InjectableKey<X4>, InjectableKey<X5>,
                           InjectableKey<X6>, InjectableKey<X7>]
                        : InjectableKey<any>[];