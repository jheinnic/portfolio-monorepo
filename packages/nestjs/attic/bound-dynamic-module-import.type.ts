import { Type } from '@nestjs/common';

import { IFactoryMethod } from '@jchptf/api';

// export interface IFromFactoryClass<Supplier extends IModuleLike, Token extends IToken<Supplier>>
// {
//    style: DynamicProviderBindingStyle.FACTORY_CLASS;
//    provideFactory: ITokenProviding<Supplier, IFactoryObject<ITokenType<Supplier, Token>>>;
//    useFactoryClass: Type<IFactoryObject<ITokenType<Supplier, Token>>>;
// }

// export interface IFromFactoryMethod<ParamType extends {}, Supplier extends IModule>
// {
//    style: DynamicProviderBindingStyle.FACTORY_METHOD_CALL;
//    provide: InjectableKey<ParamType, Supplier>;
//    useFactory: IFactory<ParamType>;
// }
//

// export interface IFromSupplierExistingFactory<ParamType extends {}, Supplier extends IModule>
// {
//    style: DynamicProviderBindingStyle.SUPPLIER_PROVIDED_FACTORY;
//    provide: InjectableKey<ParamType, Supplier>;
//    useExisting: InjectableKey<IFactory<ParamType>, Supplier>;
// }

// export interface IFromConsumerExistingFactory<ParamType extends {},
//   Supplier extends IModule,
//   Consumer extends IModule>
// {
//    style: DynamicProviderBindingStyle.CONSUMER_PROVIDED_FACTORY;
//    provide: InjectableKey<ParamType, Supplier>;
//    useExisting: InjectableKey<IFactory<ParamType>, Consumer>;
// }

// export function bySupplierFactoryCall<
//    ParamType extends {},
//    Supplier extends IModule,
//    Factory extends FactoryMethod<ParamType>,
//    Value = string|symbol,
// >(
//    provide: InjectableKey<ParamType, Supplier>,
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

// export function byConsumerFactoryCall<ParamType extends {},
//    Supplier extends IModule,
//    Consumer extends IModule,
//    Factory extends FactoryMethod<ParamType>,
//    Value = string|symbol
// >(
//    provide: InjectableKey<ParamType, Supplier>,
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
