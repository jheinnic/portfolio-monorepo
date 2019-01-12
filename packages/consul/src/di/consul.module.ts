import { ConsulOptions, Consul as IConsul } from 'consul';
import Consul from 'consul';
import { get, set } from 'lodash';
import { Module, DynamicModule, Global } from '@nestjs/common';
import { BOOTSTRAP_PROVIDER, CONSUL_PROVIDER, BOOT_ADAPTER } from "./consul.constants";

@Global()
@Module({})
export class ConsulModule {
   static register(options: ConsulOptions): DynamicModule {
      const inject = [];
      if (options.adapter === BOOT_ADAPTER) {
         inject.push(BOOTSTRAP_PROVIDER);
      }
      const consulProvider = {
         provide: CONSUL_PROVIDER,
         useFactory: async (boot: IBoot): Promise<IConsul> => {
            if (options.adapter === BOOT_ADAPTER && boot) {
               options = boot.get('consul', {});
            }
            if (!get(options, 'defaults.timeout')) {
               set(options, 'defaults.timeout', 5000);
            }
            return await new Consul({ ...options, promisify: true });
         },
         inject,
      };

      return {
         module: ConsulModule,
         components: [consulProvider],
         exports: [consulProvider],
      };
   }
}
