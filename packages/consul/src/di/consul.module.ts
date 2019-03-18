import { DynamicModule, Global, Module } from '@nestjs/common';
import {
   CONSUL_CLIENT_PROVIDER, CONSUL_EVENT_EMITTER_PROVIDER, CONSUL_OPTIONS_PROVIDER,
} from './consul.constants';
import consul, { Consul as IConsul, ConsulOptions } from 'consul';
import { EventEmitter } from 'events';
import * as util from 'util';

import { DynamicModuleParam, asyncProviderFromParam } from '@jchptf/nestjs';

@Global()
@Module({})
export class ConsulModule
{
   public static forRoot(options: DynamicModuleParam<ConsulOptions, any>): DynamicModule
   {
      const configProviders = asyncProviderFromParam(CONSUL_OPTIONS_PROVIDER, options);

      const consulProvider = {
         provide: CONSUL_CLIENT_PROVIDER,
         useFactory: async (
            consulOptions: ConsulOptions, emitter: EventEmitter,
         ): Promise<IConsul> => {
            // if (!get(consulOptions, 'defaults.timeout')) {
            //    set(consulOptions, 'defaults.timeout', 5000);
            // }
            return await new consul({
               ...consulOptions,
               promisify: util.promisify,
               defaults: {
                  ...consulOptions.defaults,
                  timeout: 5000,
                  ctx: emitter,
               },
            });
         },
         inject: [CONSUL_OPTIONS_PROVIDER, CONSUL_EVENT_EMITTER_PROVIDER],
      };

      const consulEventEmitterProvider = {
         provide: CONSUL_EVENT_EMITTER_PROVIDER,
         useFactory: async (): Promise<EventEmitter> => {
            return new EventEmitter();
         },
      };

      return {
         module: ConsulModule,
         providers: [...configProviders, consulProvider, consulEventEmitterProvider],
         exports: [consulProvider],
      };
   }
}
