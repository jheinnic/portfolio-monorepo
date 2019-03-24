import consul, { Consul as IConsul, ConsulOptions } from 'consul';
import { EventEmitter } from 'events';
import * as util from 'util';

import { IWithArgsAsyncFactoryProvider, NestProvider } from '@jchptf/nestjs';
import {
   CONSUL_CLIENT_PROVIDER_TOKEN, CONSUL_EVENT_EMITTER_PROVIDER_TOKEN, CONSUL_OPTIONS_PROVIDER_TOKEN
} from './consul.constants';

// $ExpectType IAsyncFactoryProviderWithArgs<IConsul>
export const CONSUL_CLIENT_PROVIDER: IWithArgsAsyncFactoryProvider<IConsul> = {
   provide: CONSUL_CLIENT_PROVIDER_TOKEN,
   useFactory: async (
      consulOptions: ConsulOptions, emitter: EventEmitter,
   ): Promise<IConsul> => {
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
   foo: 8,
   // inject: [CONSUL_OPTIONS_PROVIDER_TOKEN, CONSUL_EVENT_EMITTER_PROVIDER_TOKEN],
};

