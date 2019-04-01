import { Type } from '@nestjs/common';

import { IFactory } from '@jchptf/api';

import { IModule } from '../module';
import { ArgsAsInjectableKeys, FactoryMethod, InjectableKey } from '../provider';

export type IEnhancedProvider<
   ParamType extends {}, Module extends IModule, Value = string|symbol
> =
   IValueProvider<ParamType, Module, Value> |
   IClassProvider<ParamType, Module, Value> |
   // IFromFactoryClass<ParamType, Module, Value> |
   IFromFactoryCall<ParamType, Module, Value> |
   IFromExisting<ParamType, Module, Value> |
   IFromExistingFactory<ParamType, Module, Value>
;

export interface IValueProvider
   <ParamType extends {}, Module extends IModule, Value = string|symbol>
{
   provide: InjectableKey<ParamType, Module, Value>;
   useValue: ParamType;
}

export interface IClassProvider
   <ParamType extends {}, Module extends IModule, Value = string|symbol>
{
   provide: InjectableKey<ParamType, Module, Value>;
   useClass: Type<ParamType>;
}

// export interface IFromFactoryClass
// <ParamType extends {}, Module extends IModule, Value = string|symbol>
// {
//    provide: InjectableKey<ParamType, Module, Value>;
//    provideFactory?: InjectableKey<IFactoryObject<ParamType>, Module>;
//    useFactoryClass: Type<IFactoryObject<ParamType>>;
// }

export interface IFromExisting
   <ParamType extends {}, Module extends IModule, Value = string|symbol>
{
   provide: InjectableKey<ParamType, Module, Value>;
   useExisting: InjectableKey<ParamType, Module>;
}

export interface IFromExistingFactory
   <ParamType extends {}, Module extends IModule, Value = string|symbol>
{
   provide: InjectableKey<ParamType, Module, Value>;
   useExistingFactory: InjectableKey<IFactory<ParamType>, Module>;
}

export interface IFromFactoryCall<
   ParamType extends {},
   Module extends IModule,
   Value = string|symbol,
   Factory extends FactoryMethod<ParamType> = FactoryMethod<ParamType>>
{
   provide: InjectableKey<ParamType, Module, Value>;
   useFactory: Factory;
   inject: ArgsAsInjectableKeys<Factory, Module>;
}
