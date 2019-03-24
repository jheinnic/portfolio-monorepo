import { DynamicModule, Type } from '@nestjs/common';
import { IDirector } from '@jchptf/api';

import { IDynamicModuleBuilderImpl, getBuilder } from './impl';
import { IDynamicModuleBuilder } from './dynamic-module-builder.interface';
import { ModuleIdentifier } from './module-identifier.type';

export function buildDynamicModule<
   Supplier extends ModuleIdentifier, Consumer extends ModuleIdentifier
>(supplier: Type<any>, consumer: Type<any>,
  director: IDirector<IDynamicModuleBuilder<Supplier, Consumer>>,
): DynamicModule
{
   const builder: IDynamicModuleBuilderImpl<Supplier, Consumer> =
      getBuilder(supplier, consumer);

   director(builder);

   return builder.build();
}
