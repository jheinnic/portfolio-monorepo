import { LengthOf } from '@jchptf/tupletypes';

import { InjectableKey } from './injectable-key.type';
import { IModule } from './provider-token.type';

// export type ArgsAsProviderTokens<F extends AnyMsyncFunc> = F extends () => any ? void[]
//    : F extends (x1: infer X1) => any
//       ? [ProviderToken<X1>]
//       : F extends (x1: infer X1, x2: infer X2) => any
//          ? [ProviderToken<X1>, ProviderToken<X2>]
//          : F extends (x1: infer X1, x2: infer X2, x3: infer X3) => any
//             ? [ProviderToken<X1>, ProviderToken<X2>, ProviderToken<X3>]
//             : F extends (x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4) => any
//                ? [ProviderToken<X1>, ProviderToken<X2>, ProviderToken<X3>, ProviderToken<X4>]
//                : F extends (
//                   x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4, x5: infer X5) => any
//                   ? [ProviderToken<X1>, ProviderToken<X2>, ProviderToken<X3>,
//                      ProviderToken<X4>, ProviderToken<X5>]
//                   : F extends (
//                      x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4, x5: infer X5,
//                      x6: infer X6) => any
//                      ? [ProviderToken<X1>, ProviderToken<X2>, ProviderToken<X3>,
//                         ProviderToken<X4>, ProviderToken<X5>, ProviderToken<X6>]
//                      : F extends (
//                         x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4, x5: infer X5,
//                         x6: infer X6, x7: infer X7) => any
//                         ? [ProviderToken<X1>, ProviderToken<X2>,
//                            ProviderToken<X3>, ProviderToken<X4>, ProviderToken<X5>,
//                            ProviderToken<X6>, ProviderToken<X7>]
//                         : ProviderToken<any>[];

/**
 * Unlike ProviderToken<T>, which is specific to this library's compile-time augmentation of
 * otherwise plain/ordinary strings and symbols, InjectableKeys<T> can be satisfied both by
 * one of this library's ProviderTokens, suitably bound to T, other NestJs-supported keys,
 * such as Class objects, for which this library provides no competing augmentation.
 */
export type ArgsAsInjectableKeys<F extends () => any, Mod extends IModule> =
   LengthOf<Parameters<F>> extends 0
   ? [] : F extends (x1: infer X1) => any
      ? [InjectableKey<X1, Mod>]
      : F extends (x1: infer X1, x2: infer X2) => any
         ? [InjectableKey<X1, Mod>, InjectableKey<X2, Mod>]
         : F extends (x1: infer X1, x2: infer X2, x3: infer X3) => any
            ? [InjectableKey<X1, Mod>, InjectableKey<X2, Mod>, InjectableKey<X3, Mod>]
            : F extends (x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4) => any
               ? [InjectableKey<X1, Mod>, InjectableKey<X2, Mod>,
                  InjectableKey<X3, Mod>, InjectableKey<X4, Mod>]
               : F extends (
                  x1: infer X1, x2: infer X2, x3: infer X3,
                  x4: infer X4, x5: infer X5) => any
                  ? [InjectableKey<X1, Mod>, InjectableKey<X2, Mod>,
                     InjectableKey<X3, Mod>, InjectableKey<X4, Mod>,
                     InjectableKey<X5, Mod>]
                  : F extends (
                     x1: infer X1, x2: infer X2, x3: infer X3,
                     x4: infer X4, x5: infer X5, x6: infer X6) => any
                     ? [InjectableKey<X1, Mod>, InjectableKey<X2, Mod>,
                        InjectableKey<X3, Mod>, InjectableKey<X4, Mod>,
                        InjectableKey<X5, Mod>, InjectableKey<X6, Mod>]
                     : F extends (
                        x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4,
                        x5: infer X5, x6: infer X6, x7: infer X7) => any
                        ? [InjectableKey<X1, Mod>, InjectableKey<X2, Mod>,
                           InjectableKey<X3, Mod>, InjectableKey<X4, Mod>,
                           InjectableKey<X5, Mod>, InjectableKey<X6, Mod>,
                           InjectableKey<X7, Mod>]
                        : InjectableKey<any, Mod>[];
