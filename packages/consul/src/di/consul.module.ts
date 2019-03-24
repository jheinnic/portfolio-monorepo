import { DynamicModule, Global, Module, Type } from '@nestjs/common';
import { CONSUL_CLIENT_PROVIDER } from './consul-client.provider';
import { ConsulOptions } from 'consul';

import {
   applyDynamicModuleParam, buildDynamicModule, DynamicModuleParam, IDynamicModuleBuilder,
   ModuleIdentifier
} from '@jchptf/nestjs';

import { CONSUL_MODULE_ID, CONSUL_OPTIONS_PROVIDER_TOKEN, } from './consul.constants';
import { CONSUL_EVENT_EMITTER_PROVIDER } from './consul-event-emitter.provider';

@Global()
@Module({})
export class ConsulModule
{
   public static forRoot<Consumer extends ModuleIdentifier>(
      rootModule: Type<any>,
      options: DynamicModuleParam<
         ConsulOptions, CONSUL_MODULE_ID, Consumer, typeof CONSUL_OPTIONS_PROVIDER_TOKEN>
   ): DynamicModule
   {
      return buildDynamicModule(
         ConsulModule,
         rootModule,
         (builder: IDynamicModuleBuilder<CONSUL_MODULE_ID, Consumer>): void => {
            applyDynamicModuleParam(builder, options);
            builder
               .bindProvider(CONSUL_EVENT_EMITTER_PROVIDER, false)
               .bindProvider(CONSUL_CLIENT_PROVIDER, true);
         },
      );
   }
}
