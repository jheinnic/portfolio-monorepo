import { DynamicModule } from '@nestjs/common';

import { IDynamicModuleBuilder } from 'dynamic-module-builder.interface';
import { IWorkingDynamicModule } from './working-dynamic-module.interface';
import { IModule } from '../provider-token.type';

/**
 * Internal implementation detail interface extending IDynamicModuleBuilder from public API
 * to provide its terminal build method() and a reference to internal builder state for
 * easy access after a consumer has finished configuring their module.
 */
export interface IDynamicModuleBuilderImpl<Supplier extends IModule, Consumer extends IModule>
   extends IDynamicModuleBuilder<Supplier, Consumer>
{
   value: IWorkingDynamicModule;

   build(): DynamicModule;
}
