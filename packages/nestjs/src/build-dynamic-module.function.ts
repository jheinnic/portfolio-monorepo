import { DynamicModule } from '@nestjs/common';
import { IDirector } from '@jchptf/api';

import { getBuilder } from './impl';
import { IDynamicModuleBuilderImpl } from './impl/dynamic-module-builder-impl.interface';
import { IDynamicModuleBuilder } from './dynamic-module-builder.interface';
import { IModule } from './provider-token.type';

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
