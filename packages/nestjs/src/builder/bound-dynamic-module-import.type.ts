import { Type } from '@nestjs/common';

import { IFactory, IFactoryObject } from '@jchptf/api';

import { IModule } from '../module';
import { ArgsAsInjectableKeys, FactoryMethod, InjectableKey } from '../provider';
import { DynamicProviderBindingStyle } from './dynamic-provider-binding-style.enum';

export type IBoundDynamicModuleImport<
   ParamType extends {}, Supplier extends IModule, Consumer extends IModule, Value = string|symbol
> =
   IAsValue<ParamType, Supplier, Value> |
   IAsClass<ParamType, Supplier, Value> |
   IFromFactoryClass<ParamType, Supplier, Value> |
   IFromFactoryMethod<ParamType, Supplier, Value> |
   IFromSupplierExisting<ParamType, Supplier, Value> |
   IFromSupplierExistingFactory<ParamType, Supplier, Value> |
   IBySupplierFactoryCall<ParamType, Supplier, Value> |
   IFromConsumerExisting<ParamType, Supplier, Consumer, Value> |
   IFromConsumerExistingFactory<ParamType, Supplier, Consumer, Value> |
   IByConsumerFactoryCall<ParamType, Supplier, Consumer, Value>
   // IByMutualDIFactoryCall<ParamType, Supplier, Consumer>
;

   // This last entry is unique--insofar as it defines how an existing supplier token's
   // bound value should be _exported_ to the consuming module, whereas all other param
   // types are used to specify how to provide bindings for a supplier's unbound
   // provider tokens.  It specifies an export behavior from supplier to consumer, whereas
   // all other params are either about imports either from consumer to supplier or from
   // supplier to itself.  This special trait inverts the sense of the 'provides' property.
   // IForExportToConsumer<ParamType, Supplier, Consumer>,

export interface IAsValue
   <ParamType extends {}, Supplier extends IModule, Value = string|symbol>
{
   style: DynamicProviderBindingStyle.VALUE;
   provide: InjectableKey<ParamType, Supplier, Value>;
   useValue: ParamType;
}

export interface IAsClass
   <ParamType extends {}, Supplier extends IModule, Value = string|symbol>
{
   style: DynamicProviderBindingStyle.CLASS;
   provide: InjectableKey<ParamType, Supplier, Value>;
   useClass: Type<ParamType>;
}

export interface IFromFactoryClass
<ParamType extends {}, Supplier extends IModule, Value = string|symbol>
{
   style: DynamicProviderBindingStyle.FACTORY_CLASS;
   provide: InjectableKey<ParamType, Supplier, Value>;
   provideFactory: InjectableKey<IFactoryObject<ParamType>, Supplier>;
   useFactoryClass: Type<IFactoryObject<ParamType>>;
}

export interface IFromFactoryMethod
<ParamType extends {}, Supplier extends IModule, Value = string|symbol>
{
   style: DynamicProviderBindingStyle.FACTORY_METHOD_CALL;
   provide: InjectableKey<ParamType, Supplier, Value>;
   useFactory: IFactory<ParamType>;
}

export interface IFromSupplierExisting
   <ParamType extends {}, Supplier extends IModule, Value = string|symbol>
{
   style: DynamicProviderBindingStyle.SUPPLIER_PROVIDED;
   provide: InjectableKey<ParamType, Supplier, Value>;
   useExisting: InjectableKey<ParamType, Supplier>;
}

export interface IFromSupplierExistingFactory
   <ParamType extends {}, Supplier extends IModule, Value = string|symbol>
{
   style: DynamicProviderBindingStyle.SUPPLIER_PROVIDED_FACTORY;
   provide: InjectableKey<ParamType, Supplier, Value>;
   useExisting: InjectableKey<IFactory<ParamType>, Supplier>;
}

export interface IFromConsumerExisting <
   ParamType extends {},
   Supplier extends IModule,
   Consumer extends IModule,
   Value = string|symbol>
{
   style: DynamicProviderBindingStyle.CONSUMER_PROVIDED;
   provide: InjectableKey<ParamType, Supplier, Value>;
   useExisting: InjectableKey<ParamType, Consumer>;
}

export interface IFromConsumerExistingFactory <
   ParamType extends {},
   Supplier extends IModule,
   Consumer extends IModule,
   Value = string|symbol>
{
   style: DynamicProviderBindingStyle.CONSUMER_PROVIDED_FACTORY;
   provide: InjectableKey<ParamType, Supplier, Value>;
   useExisting: InjectableKey<IFactory<ParamType>, Consumer>;
}

export interface IBySupplierFactoryCall<
   ParamType extends {},
   Supplier extends IModule,
   Value = string|symbol,
   Factory extends FactoryMethod<ParamType> = FactoryMethod<ParamType>,
>
{
   style: DynamicProviderBindingStyle.SUPPLIER_INJECTED_FUNCTION;
   provide: InjectableKey<ParamType, Supplier, Value>;
   useFactory: Factory;
   inject: ArgsAsInjectableKeys<Factory, Supplier>;
}

// export function bySupplierFactoryCall<
//    ParamType extends {},
//    Supplier extends IModule,
//    Factory extends FactoryMethod<ParamType>,
//    Value = string|symbol,
// >(
//    provide: InjectableKey<ParamType, Supplier, Value>,
//    useFactory: Factory,
//    inject: ArgsAsInjectableKeys<Factory, Supplier>,
// ): IBySupplierFactoryCall<ParamType, Supplier, Factory>
// {
//    return {
//       provide,
//       useFactory,
//       inject,
//       style: DynamicProviderBindingStyle.SUPPLIER_INJECTED_FUNCTION,
//    };
// }

export interface IByConsumerFactoryCall<
   ParamType extends {},
   Supplier extends IModule,
   Consumer extends IModule,
   Value = string|symbol,
   Factory extends FactoryMethod<ParamType> = FactoryMethod<ParamType>,
>
{
   style: DynamicProviderBindingStyle.CONSUMER_INJECTED_FUNCTION;
   provide: InjectableKey<ParamType, Supplier, Value>;
   useFactory: Factory;
   inject: ArgsAsInjectableKeys<Factory, Consumer>;
}

// export function byConsumerFactoryCall<ParamType extends {},
//    Supplier extends IModule,
//    Consumer extends IModule,
//    Factory extends FactoryMethod<ParamType>,
//    Value = string|symbol
// >(
//    provide: InjectableKey<ParamType, Supplier, Value>,
//    useFactory: Factory,
//    inject: ArgsAsInjectableKeys<Factory, Consumer>,
// ): IByConsumerFactoryCall<ParamType, Supplier, Consumer, Factory>
// {
//    return {
//       provide,
//       useFactory,
//       inject,
//       style: DynamicProviderBindingStyle.CONSUMER_INJECTED_FUNCTION,
//    };
// }

/*
 * This is too complicated to support!
interface IByMutualDIFactoryCall<
   ParamType extends {},
   Supplier extends IModule,
   Consumer extends IModule,
>
{
   style: DynamicProviderBindingStyle.FACTORY_CALL_MUTUAL_DI;
   provide: InjectableKey<ParamType, Supplier>;
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
   provide: InjectableKey<ParamType, Supplier>,
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
      style: DynamicProviderBindingStyle.FACTORY_CALL_MUTUAL_DI,
   };
}
 */
