import {interfaces} from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;
import {Symbolic} from '@jchptf/api';
import {Keys} from 'simplytyped';

// export type Plugins<I extends Symbolic, O extends Symbolic> = {
//    [K in SharedKeys<I, O>]: [I[K], O[K]];
// }
//
// export type ExtensionPoint<I, O, P extends keyof Plugins<I, O>> =
//    ServiceIdentifier<I[P]>
//
// export type ExtensionProduct<I, O, P extends keyof Plugins<I, O>> =
//    ServiceIdentifier<O[P]>

export type Extensions<P extends Symbolic> = {
   [K in Keys<P>]: (plugin: K) => P[K] extends void ? void : ServiceIdentifier<P[K]>
}

// export type ExtensionPoint<I, O = void> = (plugin: interfaces.ServiceIdentifier<I>) =>
//    O extends void ? void : interfaces.ServiceIdentifier<O>

// export type ExtensionPoint<I, O, P extends keyof Plugins<I, O>> =
//    ServiceIdentifier<I[P]>
//
// export type ExtensionProduct<I, O, P extends keyof Plugins<I, O>> =
//    ServiceIdentifier<O[P]>
