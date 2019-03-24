import { Type } from '@nestjs/common';

import { IFactory } from '@jchptf/api';

import { ArgsAsInjectableKeys } from 'args-as-injectable-keys.type';
import { InjectableKey } from 'injectable-key.type';
import { LocalProviderToken } from '../provider-token.type';
import { ModuleIdentifier } from '../module-identifier.type';

// export type DynamicModuleParam<
//    ParamType,
//    FactoryType extends (AnyFunc<Promise<ParamType>> | string | undefined) = undefined
//    > =
//    undefined extends FactoryType
//       ? ExistingDynamicModuleParam<ParamType>
//       : (string extends FactoryType
//       ? (FactoryType extends string
//          ? ClassDynamicModuleParam<ParamType, Extract<FactoryType, string>>
//          : never)
//       : FactoryDynamicModuleParam<ParamType, Extract<FactoryType, AnyFunc<Promise<ParamType>>>>);
export enum DynamicModuleParamStyle
{
   VALUE,
   CLASS,
   FACTORY_CLASS,
   FACTORY_METHOD_CALL,
   SUPPLIER_PROVIDED,
   SUPPLIER_PROVIDED_FACTORY,
   SUPPLIER_INJECTED_FUNCTION,
   CONSUMER_PROVIDED,
   CONSUMER_PROVIDED_FACTORY,
   CONSUMER_INJECTED_FUNCTION,
   // FACTORY_CALL_MUTUAL_DI,
}

// /**
//  * An asynchronously accessed parameter for a DynamicModule's asynchronous creation methods.
//  * Requires using one of three styles:
//  * -- An Existing parameter supplies the ProviderToken already bound to the desired type.
//  * -- A IFactory parameter supplies an asynchronous provider function, and uses FactoryType to
//  *    supply i
//  */
// export type DynamicModuleNoContextParam<ParamType extends {}> =
//    IAsValue<ParamType> |
//    IAsClass<ParamType> |
//    IFromFactoryClass<ParamType> |
//    IByNoArgFactoryCall<ParamType>
//    ;
//
// export type DynamicModuleSingleContextParam<ParamType extends {},
//    ModuleId extends ModuleIdentifier
// > =
//    IFromExisting<ParamType, ModuleId> |
//    IFromExistingFactoryClass<ParamType, ModuleId> |
//    IBySingleDIFactoryCall<ParamType, ModuleId>
//    ;
//
// export type DynamicModuleMutualContextParam<ParamType extends {},
//    SupplierModuleId extends ModuleIdentifier, ConsumerModuleId extends ModuleIdentifier
// > =
//    IByMutualDIFactoryCall<ParamType, SupplierModuleId, ConsumerModuleId>
//    ;

export type DynamicModuleParam<ParamType extends {},
   SupplierModuleId extends ModuleIdentifier, ConsumerModuleId extends ModuleIdentifier
> =
   IAsValue<ParamType, SupplierModuleId> |
   IAsClass<ParamType, SupplierModuleId> |
   IFromFactoryClass<ParamType, SupplierModuleId> |
   IByNoArgFactoryCall<ParamType, SupplierModuleId> |
   IFromSupplierExisting<ParamType, SupplierModuleId> |
   IFromSupplierExistingFactory<ParamType, SupplierModuleId> |
   IBySupplierFactoryCall<ParamType, SupplierModuleId> |
   IFromConsumerExisting<ParamType, SupplierModuleId, ConsumerModuleId> |
   IFromConsumerExistingFactory<ParamType, SupplierModuleId, ConsumerModuleId> |
   IByConsumerFactoryCall<ParamType, SupplierModuleId,  ConsumerModuleId>
   // IByMutualDIFactoryCall<ParamType, SupplierModuleId, ConsumerModuleId>
;

export interface IAsValue<ParamType extends {}, SupplierModuleId extends ModuleIdentifier> {
   style: DynamicModuleParamStyle.VALUE;
   provide: LocalProviderToken<ParamType, SupplierModuleId>;
   useValue: ParamType;
}

export interface IAsClass<ParamType extends {}, SupplierModuleId extends ModuleIdentifier> {
   style: DynamicModuleParamStyle.CLASS;
   provide: LocalProviderToken<ParamType, SupplierModuleId>;
   useClass: Type<ParamType>;
}

export interface IFromFactoryClass<ParamType, SupplierModuleId extends ModuleIdentifier> {
   style: DynamicModuleParamStyle.FACTORY_CLASS;
   provide: LocalProviderToken<ParamType, SupplierModuleId>;
   provideFactory: LocalProviderToken<IFactory<ParamType>, SupplierModuleId>;
   useFactoryClass: Type<IFactory<ParamType>>;
}

export interface IFromSupplierExisting<
   ParamType extends {},
   SupplierModuleId extends ModuleIdentifier,
>
{
   style: DynamicModuleParamStyle.SUPPLIER_PROVIDED;
   provide: LocalProviderToken<ParamType, SupplierModuleId>;
   useExisting: InjectableKey<ParamType, SupplierModuleId>;
}

export interface IFromSupplierExistingFactory<
   ParamType extends {},
   SupplierModuleId extends ModuleIdentifier,
>
{
   style: DynamicModuleParamStyle.SUPPLIER_PROVIDED_FACTORY;
   provide: LocalProviderToken<ParamType, SupplierModuleId>;
   useExisting: InjectableKey<IFactory<ParamType>, SupplierModuleId>;
}

export interface IFromConsumerExisting<
   ParamType extends {},
   SupplierModuleId extends ModuleIdentifier,
   ConsumerModuleId extends ModuleIdentifier,
>
{
   style: DynamicModuleParamStyle.CONSUMER_PROVIDED;
   provide: LocalProviderToken<ParamType, SupplierModuleId>;
   useExisting: LocalProviderToken<ParamType, ConsumerModuleId>;
}

export interface IFromConsumerExistingFactory<
   ParamType extends {},
   SupplierModuleId extends ModuleIdentifier,
   ConsumerModuleId extends ModuleIdentifier,
>
{
   style: DynamicModuleParamStyle.CONSUMER_PROVIDED_FACTORY;
   provide: LocalProviderToken<ParamType, SupplierModuleId>;
   useExisting: LocalProviderToken<IFactory<ParamType>, ConsumerModuleId>;
}

export interface IByNoArgFactoryCall<
   ParamType extends {},
   SupplierModuleId extends ModuleIdentifier>
{
   style: DynamicModuleParamStyle.FACTORY_METHOD_CALL;
   provide: LocalProviderToken<ParamType, SupplierModuleId>;
   useFactory: (() => ParamType) | (() => Promise<ParamType>);
   inject?: void[];
}

interface IBySupplierFactoryCall<
   ParamType extends {},
   SupplierModuleId extends ModuleIdentifier
>
{
   style: DynamicModuleParamStyle.SUPPLIER_INJECTED_FUNCTION;
   provide: LocalProviderToken<ParamType, SupplierModuleId>;
   useFactory: ((...args: any) => ParamType) | ((...args: any) => Promise<ParamType>);
   inject: InjectableKey<any, SupplierModuleId>[];
}

export function bySupplierFactoryCall<
   ParamType extends {},
   Factory extends ((...args: any) => ParamType) | ((...args: any) => Promise<ParamType>),
   SupplierModuleId extends ModuleIdentifier,
>(
   provide: LocalProviderToken<ParamType, SupplierModuleId>,
   useFactory: Factory, inject: ArgsAsInjectableKeys<Factory, SupplierModuleId>,
): IBySupplierFactoryCall<ParamType, SupplierModuleId> {
   return {
      provide,
      useFactory,
      inject,
      style: DynamicModuleParamStyle.SUPPLIER_INJECTED_FUNCTION,
   };
}

interface IByConsumerFactoryCall<
   ParamType extends {},
   SupplierModuleId extends ModuleIdentifier,
   ConsumerModuleId extends ModuleIdentifier,
>
{
   style: DynamicModuleParamStyle.CONSUMER_INJECTED_FUNCTION;
   provide: LocalProviderToken<ParamType, SupplierModuleId>;
   useFactory: ((...args: any) => ParamType) | ((...args: any) => Promise<ParamType>);
   inject: InjectableKey<any, ConsumerModuleId>[];
}

export function byConsumerFactoryCall<
   ParamType extends {},
   Factory extends ((...args: any) => ParamType) | ((...args: any) => Promise<ParamType>),
   SupplierModuleId extends ModuleIdentifier,
   ConsumerModuleId extends ModuleIdentifier,
>(
   provide: LocalProviderToken<ParamType, SupplierModuleId>,
   useFactory: Factory, inject: ArgsAsInjectableKeys<Factory, ConsumerModuleId>,
): IByConsumerFactoryCall<ParamType, SupplierModuleId, ConsumerModuleId> {
   return {
      provide,
      useFactory,
      inject,
      style: DynamicModuleParamStyle.CONSUMER_INJECTED_FUNCTION,
   };
}

/*
 * This is too complicated to support!
interface IByMutualDIFactoryCall<
   ParamType extends {},
   SupplierModuleId extends ModuleIdentifier,
   ConsumerModuleId extends ModuleIdentifier,
>
{
   style: DynamicModuleParamStyle.FACTORY_CALL_MUTUAL_DI;
   provide: LocalProviderToken<ParamType, SupplierModuleId>;
   useFactory: ((...args: any) => ParamType) | ((...args: any) => Promise<ParamType>);
   inject: InjectableKey<any, SupplierModuleId|ConsumerModuleId>[];
   fromSupplier: InjectableKey<any, SupplierModuleId>[];
   fromConsumer: InjectableKey<any, ConsumerModuleId>[];
}

export function byMutualFactoryCall<
   ParamType extends {},
   Factory extends ((...args: any) => ParamType) | ((...args: any) => Promise<ParamType>),
   SupplierModuleId extends ModuleIdentifier,
   ConsumerModuleId extends ModuleIdentifier,
>(
   provide: LocalProviderToken<ParamType, SupplierModuleId>,
   useFactory: Factory,
   inject: ArgsAsInjectableKeys<Factory, SupplierModuleId|ConsumerModuleId>,
   fromSupplier: InjectableKey<any, SupplierModuleId>[],
   fromConsumer: InjectableKey<any, ConsumerModuleId>[],
): IByMutualDIFactoryCall<ParamType, SupplierModuleId, ConsumerModuleId> {
   return {
      provide,
      useFactory,
      inject,
      fromSupplier,
      fromConsumer,
      style: DynamicModuleParamStyle.FACTORY_CALL_MUTUAL_DI,
   };
}
 */
