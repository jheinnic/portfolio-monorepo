import consul, { Consul, Consul as IConsul, ConsulOptions } from 'consul';
import { EventEmitter } from 'events';
import * as util from 'util';

import {
   CONSUL_CLIENT_PROVIDER_TOKEN, CONSUL_EVENT_EMITTER_PROVIDER_TOKEN, CONSUL_MODULE_ID,
   CONSUL_OPTIONS_PROVIDER_TOKEN,
} from './consul.constants';
import { Provider } from '@nestjs/common';
import { bySupplierFactoryCall } from '@jchptf/nestjs';

// $ExpectType IAsyncFactoryProviderWithArgs<IConsul>
export const CONSUL_CLIENT_PROVIDER: Provider =
   bySupplierFactoryCall<
      typeof CONSUL_CLIENT_PROVIDER_TOKEN, Consul,
      (opt: ConsulOptions, emitter: EventEmitter) => Promise<Consul>,
      CONSUL_MODULE_ID
>(
      CONSUL_CLIENT_PROVIDER_TOKEN,
      async (consulOptions: ConsulOptions, emitter: EventEmitter): Promise<IConsul> =>
      {
         return new consul({
            ...consulOptions,
            promisify: util.promisify,
            defaults: {
               ...consulOptions.defaults,
               timeout: 5000,
               ctx: emitter,
            },
         });
      },
      [CONSUL_OPTIONS_PROVIDER_TOKEN, CONSUL_EVENT_EMITTER_PROVIDER_TOKEN],
   );
