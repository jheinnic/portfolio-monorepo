import { ProviderToken } from './provider-token.type';
import { AnyFunc, ArgsAsTuple, ConstructorFor } from 'simplytyped';
import { If, IsExactly } from '@jchptf/objecttypes';

export type AsyncModuleParam<
   ParamType,
   FactoryType extends AnyFunc<Promise<ParamType>> | string | never = never
> =
   FactoryType extends never
      ? never
      : If<
         IsExactly<FactoryType, string>,
         { useClass: ConstructorFor<{ [K in Extract<FactoryType, string>]: () => ParamType }> },
         FactoryProvider<ParamType, Extract<FactoryType, AnyFunc<Promise<ParamType>>>>
      >;

/*
export type ProviderTokenTuple<ProvidedTuple extends any[]> =
   ProvidedTuple extends void[] ? void[]
      : ProvidedTuple extends [infer T1] ? [ProviderToken<T1>]
      : ProvidedTuple extends [infer T1, infer T2] ? [ProviderToken<T1>, ProviderToken<T2>]
         : ProvidedTuple extends [infer T1, infer T2, infer T3]
            ? [ProviderToken<T1>, ProviderToken<T2>, ProviderToken<T3>]
            : ProvidedTuple extends [infer T1, infer T2, infer T3, infer T4]
               ? [ProviderToken<T1>, ProviderToken<T2>, ProviderToken<T3>, ProviderToken<T4>]
               : never;
*/

type ArgsAsProviderTokens<F extends AnyFunc> = F extends () => any ? void[]
   : F extends (x1: infer X1) => any
      ? [ProviderToken<X1>]
      : F extends (x1: infer X1, x2: infer X2) => any
         ? [ProviderToken<X1>, ProviderToken<X2>]
         : F extends (x1: infer X1, x2: infer X2, x3: infer X3) => any
            ? [ProviderToken<X1>, ProviderToken<X2>, ProviderToken<X3>]
            : F extends (x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4) => any
               ? [ProviderToken<X1>, ProviderToken<X2>, ProviderToken<X3>, ProviderToken<X4>]
               : F extends (x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4, x5: infer X5) => any
                  ? [ProviderToken<X1>, ProviderToken<X2>, ProviderToken<X3>, ProviderToken<X4>, ProviderToken<X5>]
                  : F extends (x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4, x5: infer X5, x6: infer X6) => any
                     ? [ProviderToken<X1>, ProviderToken<X2>, ProviderToken<X3>, ProviderToken<X4>, ProviderToken<X5>, ProviderToken<X6>]
                     : F extends (x1: infer X1, x2: infer X2, x3: infer X3, x4: infer X4, x5: infer X5, x6: infer X6, x7: infer X7) => any
                        ? [ProviderToken<X1>, ProviderToken<X2>, ProviderToken<X3>, ProviderToken<X4>, ProviderToken<X5>, ProviderToken<X6>, ProviderToken<X7>]
                        : ProviderToken<any>[];

export type FactoryProvider<ParamType, FactoryType extends AnyFunc<Promise<ParamType>>> =
   If<
      IsExactly<ArgsAsTuple<FactoryType>, void[]>,
      { useFactory: FactoryType },
      { useFactory: FactoryType, inject: ArgsAsProviderTokens<FactoryType> }
   >;
