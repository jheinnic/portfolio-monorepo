import { DynamicModule } from '@nestjs/common';

import { IDirector, IAsyncDirector } from '@jchptf/api';

import {IHasRegistry, IHaveRegistries} from './module';
import { IDynamicModuleBuilder } from './dynamic-module-builder.interface';
import { getBuilder, IDynamicModuleBuilderImpl } from './dynamic-module-builder.function';

export function buildDynamicModule<
   Supplier extends IHasRegistry, Origin extends IHaveRegistries, Consumer extends IHasRegistry
>(
    supplier: Supplier, consumer: Consumer, origin: Origin,
    director: IDirector<IDynamicModuleBuilder<Supplier, Origin, Consumer>>): DynamicModule {
   const builder: IDynamicModuleBuilderImpl<Supplier, Origin, Consumer> =
      getBuilder(supplier, consumer, origin);

   director(builder);

   return builder.build();
}

export async function asyncBuildDynamicModule<
  Supplier extends IHasRegistry, Origin extends IHaveRegistries, Consumer extends IHasRegistry
>(
  supplier: Supplier, consumer: Consumer, origin: Origin,
  director: IAsyncDirector<IDynamicModuleBuilder<Supplier, Origin, Consumer>>,
): Promise<DynamicModule>
{
   const builder: IDynamicModuleBuilderImpl<Supplier, Origin, Consumer> =
     getBuilder(supplier, consumer, origin);

   await director(builder);

   return builder.build();
}
