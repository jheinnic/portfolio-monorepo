import { DynamicModule } from '@nestjs/common';
import { IAsyncDirector, IDirector } from '@jchptf/api';

import { getBuilder } from './impl';
import { IDynamicModuleBuilderImpl } from './impl/dynamic-module-builder-impl.interface';
import { IDynamicModuleBuilder } from './dynamic-module-builder.interface';
import { IModule } from './provider-token.type';

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
