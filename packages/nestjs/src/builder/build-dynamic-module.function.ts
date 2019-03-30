import { DynamicModule } from '@nestjs/common';

import { IDirector } from '@jchptf/api';

import { IModule } from '../module';

import { getBuilder, IDynamicModuleBuilderImpl } from './get-builder-impl.function';
import { IDynamicModuleBuilder } from './dynamic-module-builder.interface';

export function buildDynamicModule<
   Supplier extends IModule, Consumer extends IModule
>(supplier: Supplier, consumer: Consumer,
  director: IDirector<IDynamicModuleBuilder<Supplier, Consumer>>,
): DynamicModule
{
   const builder: IDynamicModuleBuilderImpl<Supplier, Consumer> =
      getBuilder(supplier, consumer);

   director(builder);

   return builder.build();
}
