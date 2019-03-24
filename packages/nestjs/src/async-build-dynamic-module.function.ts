import { DynamicModule, Type } from '@nestjs/common';
import { IAsyncDirector, IDirector } from '@jchptf/api';

import { IDynamicModuleBuilderImpl, getBuilder } from './impl';
import { IDynamicModuleBuilder } from './dynamic-module-builder.interface';
import { ModuleIdentifier } from './module-identifier.type';

export async function asyncBuildDynamicModule<
   Supplier extends ModuleIdentifier, Consumer extends ModuleIdentifier>(
   supplier: Type<any>, consumer: Type<any>,
   director: IAsyncDirector<IDynamicModuleBuilder<Supplier, Consumer>> |
             IDirector<IDynamicModuleBuilder<Supplier, Consumer>>,
): Promise<DynamicModule>
{
   const builder: IDynamicModuleBuilderImpl<Supplier, Consumer> =
      getBuilder(supplier, consumer);

   await director(builder);

   return builder.build();
}
