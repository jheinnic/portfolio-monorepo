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

export type DynamicModuleParam<
   ParamType extends {},
   Supplier extends symbol|string,
   Consumer extends symbol|string,
   Token extends LocalProviderToken<ParamType, Supplier, symbol|string> =
      LocalProviderToken<ParamType, Supplier, symbol|string>,
> =
         IAsValue<Token, ParamType, Supplier> |
         IAsClass<Token, ParamType, Supplier> |
         IFromFactoryClass<Token, ParamType, Supplier> |
         IByNoArgFactoryCall<Token, ParamType, Supplier> |
         IFromSupplierExisting<Token, ParamType, Supplier> |
         IFromSupplierExistingFactory<Token, ParamType, Supplier> |
         IBySupplierFactoryCall<Token, ParamType, Supplier> |
         IFromConsumerExisting<Token, ParamType, Supplier, Consumer> |
         IFromConsumerExistingFactory<Token, ParamType, Supplier, Consumer> |
         IByConsumerFactoryCall<Token, ParamType, Supplier, Consumer>
      // IByMutualDIFactoryCall<ParamType, Supplier, Consumer>
   ;

export interface IAsValue<
   Token extends LocalProviderToken<ParamType, Supplier, symbol|string>,
   ParamType extends {},
   Supplier extends ModuleIdentifier,
> {
   style: DynamicModuleParamStyle.VALUE;
   provide: Token;
   useValue: ParamType;
}

export interface IAsClass<
   Token extends LocalProviderToken<ParamType, Supplier, any>,
   ParamType extends {},
   Supplier extends ModuleIdentifier
> {
   style: DynamicModuleParamStyle.CLASS;
   provide: Token;
   useClass: Type<ParamType>;
}

export interface IFromFactoryClass<
   Token extends LocalProviderToken<ParamType, Supplier, any>,
   ParamType,
   Supplier extends ModuleIdentifier
> {
   style: DynamicModuleParamStyle.FACTORY_CLASS;
   provide: Token;
   provideFactory: LocalProviderToken<IFactory<ParamType>, Supplier>;
   useFactoryClass: Type<IFactory<ParamType>>;
}

export interface IFromSupplierExisting<
   Token extends LocalProviderToken<ParamType, Supplier, any>,
   ParamType extends {},
   Supplier extends ModuleIdentifier,
>
{
   style: DynamicModuleParamStyle.SUPPLIER_PROVIDED;
   provide: Token;
   useExisting: InjectableKey<ParamType, Supplier>;
}

export interface IFromSupplierExistingFactory<
   Token extends LocalProviderToken<ParamType, Supplier, any>,
   ParamType extends {},
   Supplier extends ModuleIdentifier,
>
{
   style: DynamicModuleParamStyle.SUPPLIER_PROVIDED_FACTORY;
   provide: Token;
   useExisting: InjectableKey<IFactory<ParamType>, Supplier>;
}

export interface IFromConsumerExisting<
   Token extends LocalProviderToken<ParamType, Supplier, any>,
   ParamType extends {},
   Supplier extends ModuleIdentifier,
   Consumer extends ModuleIdentifier,
>
{
   style: DynamicModuleParamStyle.CONSUMER_PROVIDED;
   provide: Token;
   useExisting: LocalProviderToken<ParamType, Consumer>;
}

export interface IFromConsumerExistingFactory<
   Token extends LocalProviderToken<ParamType, Supplier, any>,
   ParamType extends {},
   Supplier extends ModuleIdentifier,
   Consumer extends ModuleIdentifier,
>
{
   style: DynamicModuleParamStyle.CONSUMER_PROVIDED_FACTORY;
   provide: Token;
   useExisting: LocalProviderToken<IFactory<ParamType>, Consumer>;
}

export interface IByNoArgFactoryCall<
   Token extends LocalProviderToken<ParamType, Supplier, any>,
   ParamType extends {},
   Supplier extends ModuleIdentifier>
{
   style: DynamicModuleParamStyle.FACTORY_METHOD_CALL;
   provide: Token;
   useFactory: (() => ParamType) | (() => Promise<ParamType>);
   inject?: void[];
}

interface IBySupplierFactoryCall<
   Token extends LocalProviderToken<ParamType, Supplier, any>,
   ParamType extends {},
   Supplier extends ModuleIdentifier
>
{
   style: DynamicModuleParamStyle.SUPPLIER_INJECTED_FUNCTION;
   provide: Token;
   useFactory: ((...args: any) => ParamType) | ((...args: any) => Promise<ParamType>);
   inject: InjectableKey<any, Supplier>[];
}

export function bySupplierFactoryCall<
   Token extends LocalProviderToken<ParamType, Supplier, any>,
   ParamType extends {},
   Factory extends ((...args: any) => ParamType) | ((...args: any) => Promise<ParamType>),
   Supplier extends ModuleIdentifier,
>(
   provide: Token, useFactory: Factory, inject: ArgsAsInjectableKeys<Factory, Supplier>,
): IBySupplierFactoryCall<Token, ParamType, Supplier> {
   return {
      provide,
      useFactory,
      inject,
      style: DynamicModuleParamStyle.SUPPLIER_INJECTED_FUNCTION,
   };
}

interface IByConsumerFactoryCall<
   Token extends LocalProviderToken<ParamType, Supplier, any>,
   ParamType extends {},
   Supplier extends ModuleIdentifier,
   Consumer extends ModuleIdentifier,
>
{
   style: DynamicModuleParamStyle.CONSUMER_INJECTED_FUNCTION;
   provide: Token;
   useFactory: ((...args: any) => ParamType) | ((...args: any) => Promise<ParamType>);
   inject: InjectableKey<any, Consumer>[];
}

export function byConsumerFactoryCall<
   Token extends LocalProviderToken<ParamType, Supplier, any>,
   ParamType extends {},
   Factory extends ((...args: any) => ParamType) | ((...args: any) => Promise<ParamType>),
   Supplier extends ModuleIdentifier,
   Consumer extends ModuleIdentifier,
>(
   provide: Token, useFactory: Factory, inject: ArgsAsInjectableKeys<Factory, Consumer>,
): IByConsumerFactoryCall<Token, ParamType, Supplier, Consumer> {
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
   Supplier extends ModuleIdentifier,
   Consumer extends ModuleIdentifier,
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
   Supplier extends ModuleIdentifier,
   Consumer extends ModuleIdentifier,
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
