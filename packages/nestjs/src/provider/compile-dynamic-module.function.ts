import { isKeyOf, Overwrite } from 'simplytyped';
import {
   BoundDynamicModuleParam, ClassDynamicModuleParam, DynamicModuleParam, ExistingDynamicModuleParam,
   ExistingFactoryClassDynamicModuleParam, FactoryClassDynamicModuleParam,
   FactoryDynamicModuleParam, ValueDynamicModuleParam,
} from './dynamic-module-param.type';
import { DynamicModule, Provider, Type } from '@nestjs/common/interfaces';
import { NestProvider } from './nest-provider.type';
import { IBoundDynamicModuleOutput } from './bound-dynamic-module-output.interface';
import { compileModuleDescriptor } from './compile-module-descriptor.function';
import { ProviderToken } from '../token';

function isValueParameter(
   dynamicParam: DynamicModuleParam<any>,
): dynamicParam is ValueDynamicModuleParam<any>
{
   return isKeyOf(dynamicParam, 'useValue');
}

function isClassParameter(
   dynamicParam: DynamicModuleParam<any>,
): dynamicParam is ClassDynamicModuleParam<any>
{
   return isKeyOf(dynamicParam, 'useClass');
}

function isFactoryParameter(
   dynamicParam: DynamicModuleParam<any>,
): dynamicParam is FactoryDynamicModuleParam<any>
{
   return isKeyOf(dynamicParam, 'useFactory');
}

function isExistingParameter(
   dynamicParam: DynamicModuleParam<any>,
): dynamicParam is ExistingDynamicModuleParam<any>
{
   return isKeyOf(dynamicParam, 'useExisting');
}

function isFactoryClassParameter(
   dynamicParam: DynamicModuleParam<any>,
): dynamicParam is FactoryClassDynamicModuleParam<any>
{
   return isKeyOf(dynamicParam, 'useFactoryClass');
}

function isExistingFactoryClassParameter(
   dynamicParam: DynamicModuleParam<any>,
): dynamicParam is ExistingFactoryClassDynamicModuleParam<any>
{
   return isKeyOf(dynamicParam, 'useExistingFactoryClass');
}

export function compileDynamicModuleMetadata(
   moduleMetadata: Overwrite<DynamicModule, { providers: NestProvider[] }>,
   paramBindings: BoundDynamicModuleParam<any>[],
   outputBindings: IBoundDynamicModuleOutput[],
   consumingModule: Type<any>,
): DynamicModule
{
   const inputProviders: Provider[] = [];
   const inputExports: ProviderToken<any>[] = [];

   paramBindings.forEach((binding: BoundDynamicModuleParam<any>) => {
      const provide = binding.bindTo;
      inputExports.push(provide);

      if (isValueParameter(binding)) {
         inputProviders.push({
            provide,
            useValue: binding.useValue,
         });
      } else if (isClassParameter(binding)) {
         inputProviders.push({
            provide,
            useClass: binding.useClass,
         });
      } else if (isFactoryParameter(binding)) {
         inputProviders.push({
            provide,
            useFactory: binding.useFactory,
            inject: binding.inject,
         });
      } else if (isExistingParameter(binding)) {
         inputProviders.push(
            {
               provide,
               useFactory: obj => obj,
               inject: [binding.useExisting],
            },
         );
      } else if (isFactoryClassParameter(binding)) {
         inputProviders.push(
            {
               provide,
               useFactory: factory => factory.create(),
               inject: [binding.useFactoryClass],
            },
            binding.useFactoryClass,
         );
      } else if (isExistingFactoryClassParameter(binding)) {
         inputProviders.push(
            {
               provide,
               useFactory: factory => factory.create(),
               inject: [binding.useExistingFactoryClass],
            },
         );
      }
   });

   const outputProviders: Provider[] = [];
   const outputExports: ProviderToken<any>[] = [];
   outputBindings.forEach((outputBinding: IBoundDynamicModuleOutput) => {
      outputProviders.push(
         {
            provide: outputBinding.exposeAsToken,
            useFactory: obj => obj,
            inject: [outputBinding.localToken],
         },
      );
      outputExports.push(outputBinding.exposeAsToken);
   });

   const outerDynamicModule = {
      ...compileModuleDescriptor(moduleMetadata),
      module: moduleMetadata.module,
   };
   const innerDynamicModule = {
      module: consumingModule,
      providers: inputProviders,
      exports: inputExports,
   };

   if (! outerDynamicModule.imports) {
      outerDynamicModule.imports = [innerDynamicModule];
   } else {
      outerDynamicModule.imports.push(innerDynamicModule);
   }

   if (! outerDynamicModule.providers) {
      outerDynamicModule.providers = outputProviders;
   } else {
      outerDynamicModule.providers = [...outerDynamicModule.providers, ...outputProviders];
   }

   if (! outerDynamicModule.exports) {
      outerDynamicModule.exports = outputExports;
   } else {
      outerDynamicModule.exports = [...outerDynamicModule.exports, ...outputExports];
   }

   return outerDynamicModule;
}
