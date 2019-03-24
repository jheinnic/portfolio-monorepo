import { DynamicModule, Global, Module, Type } from '@nestjs/common';
import { CONSUL_CLIENT_PROVIDER } from './consul-client.provider';
import { ConsulOptions } from 'consul';
import { EventEmitter } from 'events';

import { buildDynamicModule, IDynamicModuleBuilder, InputProviderParam } from '@jchptf/nestjs';

import {
   CONSUL_EVENT_EMITTER_PROVIDER_TOKEN, CONSUL_OPTIONS_PROVIDER_TOKEN,
} from './consul.constants';
import { CONSUL_EVENT_EMITTER_PROVIDER, AA } from './consul-event-emitter.provider';

@Global()
@Module({})
export class ConsulModule
{
   public static forRoot(
      rootModule: Type<any>,
      options: InputProviderParam<typeof CONSUL_OPTIONS_PROVIDER_TOKEN, ConsulOptions>,
   ): DynamicModule
   {
      return buildDynamicModule(
         ConsulModule,
         rootModule,
         (builder: IDynamicModuleBuilder): void => {
            builder.bindInputProvider(options)
               .bindProvider(CONSUL_EVENT_EMITTER_PROVIDER, false)
               .bindProvider(AA, false)
               .bindProvider(CONSUL_CLIENT_PROVIDER, true);
         },
      );
   }
}
