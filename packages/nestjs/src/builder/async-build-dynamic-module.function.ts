import { DynamicModule } from '@nestjs/common';
import { IAsyncDirector, IDirector } from '@jchptf/api';

import { IModule } from '../module';
import { getBuilder, IDynamicModuleBuilderImpl } from './get-builder-impl.function';
import { IDynamicModuleBuilder } from './dynamic-module-builder.interface';

export async function asyncBuildDynamicModule<
   Supplier extends IModule, Consumer extends IModule>(
   supplier: Supplier, consumer: Consumer,
   director: IAsyncDirector<IDynamicModuleBuilder<Supplier, Consumer>> |
             IDirector<IDynamicModuleBuilder<Supplier, Consumer>>,
): Promise<DynamicModule>
{
   const builder: IDynamicModuleBuilderImpl<Supplier, Consumer> =
      getBuilder(supplier, consumer);

   await director(builder);

   return builder.build();
}
