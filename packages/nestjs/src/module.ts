import { KeysExtendedBy, KeysExtending } from '@jchptf/objecttypes';
import { UnionizeTuple } from "simplytyped";

// export const GLOBAL_MODULE_ID: unique symbol = Symbol('global scope');

export const REGISTRY: unique symbol = Symbol('moduleId');
export const MARKER: unique symbol = Symbol('moduleId');

export interface IModuleRegistry {
   readonly [REGISTRY]: this; // typeof MARKER;
}

export interface IModule<M extends IModuleRegistry> {
   readonly [REGISTRY]: () => M;
}

export type IHasRegistry = IModuleRegistry | IModule<never>;
export type IHaveRegistries = [...IModule<never>[]];
export type IRegistryOf<M extends IHasRegistry> = M extends IModule<infer R> ? R : M;

export type IToken<M extends IModule<never>> = Exclude<keyof IRegistryOf<M>, string|number>;
export type ITokenType<T extends IToken<never>> = T extends IToken<infer M> ? IRegistryOf<M>[T] : never;

export type ITokenProviding<M extends IHasRegistry, T> = KeysExtending<IRegistryOf<M>, T> & symbol;
export type ITokenConsuming<M extends IHasRegistry, T> = KeysExtendedBy<IRegistryOf<M>, T> & symbol;

export type ITokenProvidingToken<M extends IHasRegistry, T extends IToken<never>> = ITokenProviding<M, ITokenType<T>>
export type ITokenConsumingToken<M extends IHasRegistry, T extends IToken<never>> = ITokenConsuming<M, ITokenType<T>>;

export type ITokenProvidingTokens<T extends IToken<never>, Exporters extends IHaveRegistries> =
    UnionizeTuple<{
        [index in keyof Exporters & number]: ITokenProviding<Exporters[index], ITokenType<T>>;
    } & {length: Exporters["length"]}>;
