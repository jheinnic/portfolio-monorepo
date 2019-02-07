import consul, { Consul as IConsul, ConsulOptions } from 'consul';
import { DynamicModule, Global, Module } from '@nestjs/common';
import * as util from 'util';
import {
   CONSUL_CLIENT_PROVIDER, CONSUL_EVENT_EMITTER_PROVIDER, CONSUL_OPTIONS_PROVIDER,
} from './consul.constants';
import { AsyncModuleParam, asyncProviderFromParam } from '@jchptf/api';

@Global()
@Module({})
export class ConsulModule
{
   public static forRoot(options: AsyncModuleParam<ConsulOptions, any>): DynamicModule
   {
      const configProviders = asyncProviderFromParam(CONSUL_OPTIONS_PROVIDER, options);

      const consulProvider = {
         provide: CONSUL_CLIENT_PROVIDER,
         useFactory: async (
            consulOptions: ConsulOptions, emitter: NodeJS.EventEmitter,
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
         useFactory: async (): Promise<NodeJS.EventEmitter> => {
            return new NodeJS.EventEmitter();
         },
      };

      return {
         module: ConsulModule,
         providers: [...configProviders, consulProvider, consulEventEmitterProvider],
         exports: [consulProvider],
      };
   }
}
