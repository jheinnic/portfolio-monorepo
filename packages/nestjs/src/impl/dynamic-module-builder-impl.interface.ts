import { DynamicModule } from '@nestjs/common';

import { IDynamicModuleBuilder } from 'dynamic-module-builder.interface';
import { IWorkingDynamicModule } from './working-dynamic-module.interface';

/**
 * Internal implementation detail interface extending IDynamicModuleBuilder from public API
 * to provide its terminal build method() and a reference to internal builder state for
 * easy access after a consumer has finished configuring their module.
 */
export interface IDynamicModuleBuilderImpl<
   Supplier extends string|symbol, Consumer extends string|symbol>
   extends IDynamicModuleBuilder<Supplier, Consumer>
{
   value: IWorkingDynamicModule;

   build(): DynamicModule;
}
