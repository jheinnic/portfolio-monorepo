import { DynamicModule, Type } from '@nestjs/common';

import { IDirector, IAsyncDirector } from '@jchptf/api';

import {IHasRegistry, IModule, IModuleRegistry, IModuleTupleTypes} from './module';
import { IDynamicModuleBuilder } from './dynamic-module-builder.interface';
import { getBuilder, IDynamicModuleBuilderImpl } from './dynamic-module-builder.function';

export function buildDynamicModule<
   Supplier extends IModule<IModuleRegistry>,
   Origin extends [...IHasRegistry[]],
   Consumer extends IModule<IModuleRegistry>
>(
  supplier: Type<Supplier>,
  consumer: Type<Consumer>,
  origin: IModuleTupleTypes<Origin>,
  director: IDirector<IDynamicModuleBuilder<Supplier, Origin, Consumer>>,
): DynamicModule
{
   const builder: IDynamicModuleBuilderImpl<Supplier, Origin, Consumer> =
      getBuilder(supplier, consumer, origin);

   director(builder);

   return builder.build();
}

export async function asyncBuildDynamicModule<
  Supplier extends IModule<IModuleRegistry>,
  Origin extends [...IHasRegistry[]],
  Consumer extends IModule<IModuleRegistry>
  >(
  supplier: Type<Supplier>,
  consumer: Type<Consumer>,
  origin: IModuleTupleTypes<Origin>,
  director: IAsyncDirector<IDynamicModuleBuilder<Supplier, Origin, Consumer>>,
): Promise<DynamicModule>
{
   const builder: IDynamicModuleBuilderImpl<Supplier, Origin, Consumer> =
     getBuilder(supplier, consumer, origin);

   await director(builder);

   return builder.build();
}
