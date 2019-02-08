import { AnyFunc, ArgsAsTuple, ConstructorFor } from 'simplytyped';
import { ProviderToken } from '@jchptf/api';
import { INoArgsConstructorFor } from '@jchptf/objecttypes';

// export type AsyncModuleParam<
//    ParamType,
//    FactoryType extends (AnyFunc<Promise<ParamType>> | string | undefined) = undefined
//    > =
//    undefined extends FactoryType
//       ? ExistingAsyncModuleParam<ParamType>
//       : (string extends FactoryType
//       ? (FactoryType extends string
//          ? ClassAsyncModuleParam<ParamType, Extract<FactoryType, string>>
//          : never)
//       : FactoryAsyncModuleParam<ParamType, Extract<FactoryType, AnyFunc<Promise<ParamType>>>>);
export enum AsyncModuleParamStyle
{
   VALUE,
   EXISTING,
   FACTORY,
   CLASS,
}

/**
 * An asynchronously accessed parameter for a DynamicModule's asynchronous creation methods.
 * Requires using one of three styles:
 * -- An Existing parameter supplies the ProviderToken already bound to the desired type.
 * -- A Factory parameter supplies an asynchronous provider function, and uses FactoryType to
 *    supply i
 */
export type AsyncModuleParam<ParamType extends object,
   FactoryType extends (AnyFunc<Promise<ParamType>> | string | undefined) = undefined> =
   ValueAsyncModuleParam<ParamType, Extract<FactoryType, undefined>> |
   ExistingAsyncModuleParam<ParamType, Extract<FactoryType, undefined>> |
   ClassAsyncModuleParam<ParamType, Extract<FactoryType, string>> |
   FactoryAsyncModuleParam<ParamType, Extract<FactoryType, AnyFunc<Promise<ParamType>>>>
   ;

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

export type ValueAsyncModuleParam<
   ParamType extends object,
   _Unused extends undefined = undefined
   > = {
   style: AsyncModuleParamStyle.VALUE,
   useValue: ParamType | INoArgsConstructorFor<ParamType>,
};

export type ExistingAsyncModuleParam<
   ParamType extends object,
   _Unused extends undefined = undefined
   > = {
   style: AsyncModuleParamStyle.EXISTING,
   // provide: ProviderToken<ParamType>,
   useExisting: ProviderToken<ParamType>,
};

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

export type FactoryAsyncModuleParam<
   ParamType extends object,
   FactoryType extends AnyFunc<Promise<ParamType>>
   > =
   ArgsAsTuple<FactoryType> extends void[]
      ? {
         style: AsyncModuleParamStyle.FACTORY,
         // provide: ProviderToken<ParamType>,
         useFactory: FactoryType,
      }
      : {
         style: AsyncModuleParamStyle.FACTORY,
         // provide: ProviderToken<ParamType>,
         useFactory: FactoryType,
         inject: ArgsAsProviderTokens<FactoryType>,
      }
   ;

export type ClassAsyncModuleParam<
   ParamType extends object, FactoryType extends string> =
   {
      style: AsyncModuleParamStyle.CLASS,
      // provide: ProviderToken<ParamType>,
      useClass: ConstructorFor<{ [K in FactoryType]: () => ParamType }>,
   }
   ;
