import { ConstructorFor } from 'simplytyped';

import { ArgsAsInjectableKeys } from './args-as-provider-tokens.type';
import { InjectableKey, LocalProviderToken } from '../token';
import { AnyMsyncFunc, NoArgsMsyncFunc } from '@jchptf/txtypes';
import { IFactory } from '@jchptf/api';

// export type DynamicModuleParam<
//    ParamType,
//    FactoryType extends (AnyFunc<Promise<ParamType>> | string | undefined) = undefined
//    > =
//    undefined extends FactoryType
//       ? ExistingDynamicModuleParam<ParamType>
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
export type DynamicModuleParam<ParamType> =
   ValueDynamicModuleParam<ParamType> |
   FactoryDynamicModuleParam<ParamType> |
   ExistingDynamicModuleParam<ParamType> |
   FactoryClassDynamicModuleParam<ParamType> |
   ExistingFactoryClassDynamicModuleParam<ParamType> |
   (ParamType extends object ? ClassDynamicModuleParam<ParamType> : never)
;

export type BoundDynamicModuleParam<ParamType> = DynamicModuleParam<ParamType> & {
   bindTo: LocalProviderToken<ParamType>;
};

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

export type ValueDynamicModuleParam<ParamType> = {
   useValue: ParamType;
};

export type ClassDynamicModuleParam<ParamType extends object> = {
   useClass: ConstructorFor<ParamType>;
};

export type ExistingDynamicModuleParam<ParamType> = {
   useExisting: InjectableKey<ParamType>;
};

interface INoArgsFactoryProvider<Provided>
{
   useFactory: NoArgsMsyncFunc<Provided>;
   inject?: void[];
}

interface IInjectedFactoryProvider<Provided>
{
   useFactory: AnyMsyncFunc<Provided>;
   inject: ArgsAsInjectableKeys<this['useFactory']>;
}

export type FactoryDynamicModuleParam<ParamType> =
   INoArgsFactoryProvider<ParamType> | IInjectedFactoryProvider<ParamType>;

export type FactoryClassDynamicModuleParam<ParamType> = {
   useFactoryClass: ConstructorFor<IFactory<ParamType>>;
};

export type ExistingFactoryClassDynamicModuleParam<ParamType> = {
   useExistingFactoryClass: InjectableKey<IFactory<ParamType>>;
};
