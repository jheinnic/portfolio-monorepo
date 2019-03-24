import { IDynamicModuleBuilder } from 'dynamic-module-builder.interface';
import { DynamicModuleParam, DynamicModuleParamStyle } from './dynamic-module-param.interface';
import { ArgsAsInjectableKeys } from '../args-as-injectable-keys.type';
import { IModule } from '../provider-token.type';

export function applyDynamicModuleParam<
   ParamType extends {},
   SupplierId extends IModule,
   ConsumerId extends IModule,
>(
   builder: IDynamicModuleBuilder<SupplierId, ConsumerId>,
   param: DynamicModuleParam<ParamType, SupplierId, ConsumerId>,
): IDynamicModuleBuilder<SupplierId, ConsumerId>
{
   switch (param.style) {
      case DynamicModuleParamStyle.VALUE: {
         return builder.provideValue(param.provide, param.useValue);
      }
      case DynamicModuleParamStyle.CLASS: {
         return builder.provideClass(param.provide, param.useClass);
      }
      case DynamicModuleParamStyle.FACTORY_CLASS: {
         return builder.provideWithFactoryClass(
            param.provide, param.provideFactory, param.useFactoryClass);
      }
      case DynamicModuleParamStyle.CONSUMER_PROVIDED: {
         return builder.selectFromConsumer(param.provide, param.useExisting);
      }
      case DynamicModuleParamStyle.CONSUMER_PROVIDED_FACTORY: {
         return builder.applyFactoryFromConsumer(param.provide, param.useExisting);
      }
      case DynamicModuleParamStyle.SUPPLIER_PROVIDED: {
         return builder.selectFromSupplier(param.provide, param.useExisting);
      }
      case DynamicModuleParamStyle.SUPPLIER_PROVIDED_FACTORY: {
         return builder.applyFactoryFromSupplier(param.provide, param.useExisting);
      }
      case DynamicModuleParamStyle.FACTORY_METHOD_CALL: {
         return builder.callFactoryMethod(param.provide, param.useFactory);
      }
      case DynamicModuleParamStyle.CONSUMER_INJECTED_FUNCTION: {
         return builder.callConsumerFactoryMethod(
            param.provide,
            param.useFactory,
            param.inject as ArgsAsInjectableKeys<typeof param.useFactory, ConsumerId>);
      }
      case DynamicModuleParamStyle.SUPPLIER_INJECTED_FUNCTION: {
         return builder.callSupplierFactoryMethod(
            param.provide,
            param.useFactory,
            param.inject as ArgsAsInjectableKeys<typeof param.useFactory, SupplierId>);
      }
      default: {
         return undefined as never;
      }
   }
}
