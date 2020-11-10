import { DynamicModule, Type } from '@nestjs/common';

import { IDirector, IAsyncDirector } from '@jchptf/api';

import {IModule, IModuleLike, IModuleRegistry, IModuleTupleTypes} from './module';
import { IDynamicModuleBuilder } from './dynamic-module-builder.interface';
import { getBuilder, IDynamicModuleBuilderImpl } from './dynamic-module-builder.function';

export function buildDynamicModule<
   Supplier extends IModule<IModuleRegistry>,
   Origin extends IModule<IModuleRegistry>[],
   Consumer extends IModule<IModuleRegistry>
>(
  supplier: Type<Supplier>,
  origin: IModuleTupleTypes<Origin>,
  director: IDirector<IDynamicModuleBuilder<Supplier, Origin, Consumer>>,
): DynamicModule
{
   const builder: IDynamicModuleBuilderImpl<Supplier, Origin, Consumer> =
      getBuilder(supplier, origin);

   director(builder);

   return builder.build();
}

export async function asyncBuildDynamicModule<
  Supplier extends IModule<IModuleRegistry>,
  Origin extends IModule<IModuleRegistry>[],
  Consumer extends IModule<IModuleRegistry>
  >(
  supplier: Type<Supplier>,
  origin: IModuleTupleTypes<Origin>,
  consumer: Type<Consumer>,
  director: IAsyncDirector<IDynamicModuleBuilder<Supplier, Origin, Consumer>>,
): Promise<DynamicModule>
{
   const builder: IDynamicModuleBuilderImpl<Supplier, Origin, Consumer> =
     getBuilder(supplier, origin, consumer);

   await director(builder);

   return builder.build();
}
