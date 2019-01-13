import Consul, { Consul as IConsul, ConsulOptions } from 'consul';
import { DynamicModule, Global, Module } from '@nestjs/common';
import {
   CONSUL_CLIENT_PROVIDER, CONSUL_EVENT_EMITTER_PROVIDER, CONSUL_OPTIONS_PROVIDER
} from './consul.constants';
import { ConsulModuleOptions, ConsulModuleOptionsStyle } from './consul-module-options.interface';
import * as util from 'util';

@Global()
@Module({})
export class ConsulModule {
   public static forRoot(options: ConsulModuleOptions): DynamicModule {
      let configProvider;

      switch(options.style) {
         case ConsulModuleOptionsStyle.VALUE: {
            configProvider = {
               provide: CONSUL_OPTIONS_PROVIDER,
               useValue: options.config
            };
            break;
         }
         case ConsulModuleOptionsStyle.EXISTING: {
            configProvider = {
               provide: CONSUL_OPTIONS_PROVIDER,
               useFactory: async (consulOptions: ConsulOptions) => consulOptions,
               inject: [options.provider]
            };
            break;
         }
         case ConsulModuleOptionsStyle.FACTORY: {
            configProvider = {
               provide: CONSUL_OPTIONS_PROVIDER,
               useFactory: options.factory,
               inject: options.inject
            };
            break;
         }
         default:
         {
            configProvider = undefined as never;
            break;
         }
      }

      const consulProvider = {
         provide: CONSUL_CLIENT_PROVIDER,
         useFactory: async (consulOptions: ConsulOptions, emitter: NodeJS.EventEmitter): Promise<IConsul> => {
            // if (!get(consulOptions, 'defaults.timeout')) {
            //    set(consulOptions, 'defaults.timeout', 5000);
            // }
            return await new Consul({
               ...consulOptions,
               promisify: util.promisify,
               defaults: {
                 ...consulOptions.defaults,
                 timeout: 5000,
                 ctx: emitter
               }
            });
         },
         inject: [CONSUL_OPTIONS_PROVIDER, CONSUL_EVENT_EMITTER_PROVIDER],
      };

      const consulEventEmitterProvider = {
         provide: CONSUL_EVENT_EMITTER_PROVIDER,
         useFactory: async (): Promise<NodeJS.EventEmitter> => {
            return new NodeJS.EventEmitter();
         }
      };

      return {
         module: ConsulModule,
         providers: [configProvider, consulProvider, consulEventEmitterProvider],
         exports: [consulProvider],
      };
   }
}
