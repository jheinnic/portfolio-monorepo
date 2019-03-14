import { ConstructorFor } from 'simplytyped';

import { ArgsAsInjectableKeys } from './args-as-provider-tokens.type';
import { ProviderToken } from '../token';
import { AnyMsyncFunc, NoArgsMsyncFunc } from '@jchptf/txtypes';
import { IFactory } from '@jchptf/api';

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
   CLASS,
   EXISTING,
   FACTORY,
   FACTORY_CLASS,
}

/**
 * An asynchronously accessed parameter for a DynamicModule's asynchronous creation methods.
 * Requires using one of three styles:
 * -- An Existing parameter supplies the ProviderToken already bound to the desired type.
 * -- A IFactory parameter supplies an asynchronous provider function, and uses FactoryType to
 *    supply i
 */
export type AsyncModuleParam<ParamType> =
   ValueAsyncModuleParam<ParamType> |
   ExistingAsyncModuleParam<ParamType> |
   FactoryClassAsyncModuleParam<ParamType> |
   FactoryAsyncModuleParam<ParamType> |
   (ParamType extends object ? ClassAsyncModuleParam<ParamType> : never)
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

export type ValueAsyncModuleParam<ParamType> = {
   style: AsyncModuleParamStyle.VALUE,
   useValue: ParamType,
};

export type ClassAsyncModuleParam<ParamType extends object> = {
   style: AsyncModuleParamStyle.CLASS,
   useClass: ConstructorFor<ParamType>,
};

export type ExistingAsyncModuleParam<ParamType> = {
   style: AsyncModuleParamStyle.EXISTING,
   useExisting: ProviderToken<ParamType> | string |
      (ParamType extends object ? ConstructorFor<ParamType> : never),
};

interface INoArgsFactoryProvider<Provided>
{
   style: AsyncModuleParamStyle.FACTORY;
   useFactory: NoArgsMsyncFunc<Provided>;
   inject?: void[];
}

interface IInjectedFactoryProvider<Provided>
{
   style: AsyncModuleParamStyle.FACTORY;
   useFactory: AnyMsyncFunc<Provided>;
   inject: ArgsAsInjectableKeys<this['useFactory']>;
}

export type FactoryAsyncModuleParam<ParamType> =
   INoArgsFactoryProvider<ParamType> | IInjectedFactoryProvider<ParamType>;

export type FactoryClassAsyncModuleParam<ParamType> = {
   style: AsyncModuleParamStyle.FACTORY_CLASS;
   useFactoryClass: ConstructorFor<IFactory<ParamType>>;
};
