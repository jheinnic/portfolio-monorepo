import { IModuleLike, ITokenProviding } from '../module';
import { Type } from '@nestjs/common';

export type InjectableKey<Mod extends IModuleLike, T> =
   ITokenProviding<Mod, T> | Type<T>;

/**
 * Unlike ProviderToken<T>, which is specific to this library's compile-time augmentation of
 * otherwise plain/ordinary strings and symbols, InjectableKeys<T> can be satisfied both by
 * one of this library's ProviderTokens, suitably bound to T, other NestJs-supported keys,
 * such as Class objects, for which this library provides no competing augmentation.
 */
export type ArgsAsInjectableKeys<F extends () => any, Mod extends IModuleLike> =
   F extends (() => any)
   ? [] : F extends (x1: infer X1) => any
      ? [InjectableKey<Mod, X1>]
      : F extends (x1: infer X1, x2: infer X2) => any
         ? [InjectableKey<Mod, X1>, InjectableKey<Mod, X2>]
         : F extends (x1: infer X1, x2: infer X2, x3: infer X3) => any
            ? [InjectableKey<Mod, X1>, InjectableKey<Mod, X2>, InjectableKey<Mod, X3>]
            : F extends (x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4) => any
               ? [InjectableKey<Mod, X1>, InjectableKey<Mod, X2>,
                  InjectableKey<Mod, X3>, InjectableKey<Mod, X4>]
               : F extends (
                  x1: infer X1, x2: infer X2, x3: infer X3,
                  x4: infer X4, x5: infer X5) => any
                  ? [InjectableKey<Mod, X1>, InjectableKey<Mod, X2>,
                     InjectableKey<Mod, X3>, InjectableKey<Mod, X4>,
                     InjectableKey<Mod, X5>]
                  : F extends (
                     x1: infer X1, x2: infer X2, x3: infer X3,
                     x4: infer X4, x5: infer X5, x6: infer X6) => any
                     ? [InjectableKey<Mod, X1>, InjectableKey<Mod, X2>,
                        InjectableKey<Mod, X3>, InjectableKey<Mod, X4>,
                        InjectableKey<Mod, X5>, InjectableKey<Mod, X6>]
                     : F extends (
                        x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4,
                        x5: infer X5, x6: infer X6, x7: infer X7) => any
                        ? [InjectableKey<Mod, X1>, InjectableKey<Mod, X2>,
                           InjectableKey<Mod, X3>, InjectableKey<Mod, X4>,
                           InjectableKey<Mod, X5>, InjectableKey<Mod, X6>,
                           InjectableKey<Mod, X7>]
                        : InjectableKey<any, Mod>[];
