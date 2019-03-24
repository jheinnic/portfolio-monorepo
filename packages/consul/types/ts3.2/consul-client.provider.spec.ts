import consul, { Consul as IConsul, ConsulOptions } from 'consul';
import { EventEmitter } from 'events';
import * as util from 'util';

import {
   getLocalProviderTokenString, getModuleIdentifier, IWithArgsAsyncFactoryProvider, NestProvider,
   ProviderToken,
} from '@jchptf/nestjs';
import {
   CONSUL_CLIENT_PROVIDER_TOKEN, CONSUL_EVENT_EMITTER_PROVIDER_TOKEN, CONSUL_OPTIONS_PROVIDER_TOKEN
} from './consul.constants';

export const CONSUL_CLIENT_PROVIDER: IWithArgsAsyncFactoryProvider<
   IConsul, (a: ConsulOptions, b: EventEmitter) => Promise<IConsul>> = {
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
   inject: [CONSUL_OPTIONS_PROVIDER_TOKEN, CONSUL_EVENT_EMITTER_PROVIDER_TOKEN]
};

export const CONSUL_CLIENT_PROVIDERS: NestProvider<IConsul> = {
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
   inject: [CONSUL_EVENT_EMITTER_PROVIDER_TOKEN, CONSUL_CLIENT_PROVIDER_TOKEN],
};

export type GG<T, P extends any[]> = {
   a: T;
   b: (...args: P) => T;
   c: TupleAsInjectableKeys<P>
};

function woo<T, P extends any[]>(_arg: GG<T, P>) {
   return 1;
}

export const Mm = getModuleIdentifier('ammm');

let hh: ProviderToken<string>;
woo({a: 5, b: (_a: string, _b: boolean): number => 3, c: [hh = getLocalProviderTokenString(Mm, 'apple'), hh = getLocalProviderTokenString(Mm, 'pie')]});



type PromiseTuple<T> = {
   [K in keyof T]: Promise<T[K]>
};

interface IA<M, N extends any[] = []> {
   id: M;
   work: (...args: N) => M;
   future: PromiseTuple<N>;
}

interface IC<M> {
   id: M;
   work: (...args: any[]) => M;
   future: this['work'] extends (...args: infer P) => M ? PromiseTuple<P> : never;
}

interface IB<M> {
   name: M;
   age: number;
}

interface IW<M> {
   id: M;
   work: this['future'] extends any[] ? (...args: this['future']) => M : never;
   future: PromiseTuple<any[]>;
}

type Things<M> = IA<M, any[]> | IB<M> | IC<M>;

// export let c: Things<number>;
export let d: IW<number>;
// export let e: IA<number, [boolean, string]>;

// $ExpectType IW<number>
d = {
   id: 6,
   work: (a: boolean, e: number, b: string): number => {
      if (a) {
         return b.length;
      }

      return e;
   },
   future: [Promise.resolve(9), Promise.resolve('ready')],
};
