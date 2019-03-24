import { Type } from '@nestjs/common';

import { IFactory } from '@jchptf/api';

import { ArgsAsInjectableKeys } from 'args-as-injectable-keys.type';
import { InjectableKey } from 'injectable-key.type';
import { IModule, LocalProviderToken } from '../provider-token.type';

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
//    ModuleId extends IModule
// > =
//    IFromExisting<ParamType, ModuleId> |
//    IFromExistingFactoryClass<ParamType, ModuleId> |
//    IBySingleDIFactoryCall<ParamType, ModuleId>
//    ;
//
// export type DynamicModuleMutualContextParam<ParamType extends {},
//    SupplierModuleId extends IModule, ConsumerModuleId extends IModule
// > =
//    IByMutualDIFactoryCall<ParamType, SupplierModuleId, ConsumerModuleId>
//    ;

export type DynamicModuleParam<
   ParamType extends {}, Supplier extends IModule, Consumer extends IModule
> =
   IAsValue<ParamType, Supplier> |
   IAsClass<ParamType, Supplier> |
   IFromFactoryClass<ParamType, Supplier> |
   IByNoArgFactoryCall<ParamType, Supplier> |
   IFromSupplierExisting<ParamType, Supplier> |
   IFromSupplierExistingFactory<ParamType, Supplier> |
   IBySupplierFactoryCall<ParamType, Supplier> |
   IFromConsumerExisting<ParamType, Supplier, Consumer> |
   IFromConsumerExistingFactory<ParamType, Supplier, Consumer> |
   IByConsumerFactoryCall<ParamType, Supplier, Consumer>
   // IByMutualDIFactoryCall<ParamType, Supplier, Consumer>
   ;

export interface IAsValue<ParamType extends {},
   Supplier extends IModule,
   >
{
   style: DynamicModuleParamStyle.VALUE;
   provide: LocalProviderToken<ParamType, Supplier>;
   useValue: ParamType;
}

export interface IAsClass<ParamType extends {},
   Supplier extends IModule>
{
   style: DynamicModuleParamStyle.CLASS;
   provide: LocalProviderToken<ParamType, Supplier>;
   useClass: Type<ParamType>;
}

export interface IFromFactoryClass<ParamType,
   Supplier extends IModule>
{
   style: DynamicModuleParamStyle.FACTORY_CLASS;
   provide: LocalProviderToken<ParamType, Supplier>;
   provideFactory: LocalProviderToken<IFactory<ParamType>, Supplier>;
   useFactoryClass: Type<IFactory<ParamType>>;
}

export interface IFromSupplierExisting<ParamType extends {},
   Supplier extends IModule,
   >
{
   style: DynamicModuleParamStyle.SUPPLIER_PROVIDED;
   provide: LocalProviderToken<ParamType, Supplier>;
   useExisting: InjectableKey<ParamType, Supplier>;
}

export interface IFromSupplierExistingFactory<ParamType extends {},
   Supplier extends IModule,
   >
{
   style: DynamicModuleParamStyle.SUPPLIER_PROVIDED_FACTORY;
   provide: LocalProviderToken<ParamType, Supplier>;
   useExisting: InjectableKey<IFactory<ParamType>, Supplier>;
}

export interface IFromConsumerExisting<ParamType extends {},
   Supplier extends IModule,
   Consumer extends IModule,
   >
{
   style: DynamicModuleParamStyle.CONSUMER_PROVIDED;
   provide: LocalProviderToken<ParamType, Supplier>;
   useExisting: LocalProviderToken<ParamType, Consumer>;
}

export interface IFromConsumerExistingFactory<ParamType extends {},
   Supplier extends IModule,
   Consumer extends IModule,
   >
{
   style: DynamicModuleParamStyle.CONSUMER_PROVIDED_FACTORY;
   provide: LocalProviderToken<ParamType, Supplier>;
   useExisting: LocalProviderToken<IFactory<ParamType>, Consumer>;
}

export interface IByNoArgFactoryCall<ParamType extends {},
   Supplier extends IModule>
{
   style: DynamicModuleParamStyle.FACTORY_METHOD_CALL;
   provide: LocalProviderToken<ParamType, Supplier>;
   useFactory: (() => ParamType) | (() => Promise<ParamType>);
   inject?: void[];
}

interface IBySupplierFactoryCall<ParamType extends {},
   Supplier extends IModule>
{
   style: DynamicModuleParamStyle.SUPPLIER_INJECTED_FUNCTION;
   provide: LocalProviderToken<ParamType, Supplier>;
   useFactory: ((...args: any) => ParamType) | ((...args: any) => Promise<ParamType>);
   inject: InjectableKey<any, Supplier>[];
}

export function bySupplierFactoryCall<ParamType extends {},
   Factory extends ((...args: any) => ParamType) | ((...args: any) => Promise<ParamType>),
   Supplier extends IModule,
   >(
   provide: LocalProviderToken<ParamType, Supplier>, useFactory: Factory,
   inject: ArgsAsInjectableKeys<Factory, Supplier>,
): IBySupplierFactoryCall<ParamType, Supplier>
{
   return {
      provide,
      useFactory,
      inject,
      style: DynamicModuleParamStyle.SUPPLIER_INJECTED_FUNCTION,
   };
}

interface IByConsumerFactoryCall<ParamType extends {},
   Supplier extends IModule,
   Consumer extends IModule,
   >
{
   style: DynamicModuleParamStyle.CONSUMER_INJECTED_FUNCTION;
   provide: LocalProviderToken<ParamType, Supplier>;
   useFactory: ((...args: any) => ParamType) | ((...args: any) => Promise<ParamType>);
   inject: InjectableKey<any, Consumer>[];
}

export function byConsumerFactoryCall<ParamType extends {},
   Factory extends ((...args: any) => ParamType) | ((...args: any) => Promise<ParamType>),
   Supplier extends IModule,
   Consumer extends IModule,
   >(
   provide: LocalProviderToken<ParamType, Supplier>,
   useFactory: Factory,
   inject: ArgsAsInjectableKeys<Factory, Consumer>,
): IByConsumerFactoryCall<ParamType, Supplier, Consumer>
{
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
   Supplier extends IModule,
   Consumer extends IModule,
>
{
   style: DynamicModuleParamStyle.FACTORY_CALL_MUTUAL_DI;
   provide: LocalProviderToken<ParamType, Supplier>;
   useFactory: ((...args: any) => ParamType) | ((...args: any) => Promise<ParamType>);
   inject: InjectableKey<any, Supplier|ConsumerModuleId>[];
   fromSupplier: InjectableKey<any, Supplier>[];
   fromConsumer: InjectableKey<any, Consumer>[];
}

export function byMutualFactoryCall<
   ParamType extends {},
   Factory extends ((...args: any) => ParamType) | ((...args: any) => Promise<ParamType>),
   Supplier extends IModule,
   Consumer extends IModule,
>(
   provide: LocalProviderToken<ParamType, Supplier>,
   useFactory: Factory,
   inject: ArgsAsInjectableKeys<Factory, Supplier|ConsumerModuleId>,
   fromSupplier: InjectableKey<any, Supplier>[],
   fromConsumer: InjectableKey<any, Consumer>[],
): IByMutualDIFactoryCall<ParamType, Supplier, ConsumerModuleId> {
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
