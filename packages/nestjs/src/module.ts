import { KeysExtendedBy, KeysExtending } from '@jchptf/objecttypes';
import {Type} from '@nestjs/common';
import {UnionizeTuple} from "simplytyped";

// export const GLOBAL_MODULE_ID: unique symbol = Symbol('global scope');

export const REGISTRY: unique symbol = Symbol('moduleId');
export const MARKER: unique symbol = Symbol('moduleId');

export interface IModuleRegistry {
   readonly [REGISTRY]: this; // typeof MARKER;
}

export interface IModule<M extends IModuleRegistry> {
   readonly [REGISTRY]: M;
}

export type IHasRegistry<R extends IModuleRegistry = IModuleRegistry> = R | IModule<R>;
export type IRegistryOf<M extends IHasRegistry<any>> = M extends IModule<infer R> ? R : M;

export type IToken<M extends IHasRegistry> = Exclude<keyof IRegistryOf<M>, string|number>;
export type ITokenType<M extends IHasRegistry, T extends IToken<M>> = IRegistryOf<M>[T];

export type ITokenProviding<M extends IHasRegistry, T> =
  Exclude<KeysExtending<IRegistryOf<M>, T>, string|number>;

export type ITokenRequiring<M extends IHasRegistry, T> =
  Exclude<KeysExtendedBy<IRegistryOf<M>, T>, string|number>;

export type ITokenImportExportable<
  Importer extends IHasRegistry, T extends IToken<Importer>, Exporters extends [...IHasRegistry[]]> =
   UnionizeTuple<{
      [index in Exclude<keyof Exporters, string|symbol>]: ITokenProviding<Exporters[index], ITokenType<Importer, T>>;
   } & {length: Exporters["length"]}>

export type ITokenExportImportable<
  Exporter extends IHasRegistry, T extends IToken<Exporter>, Importer extends IHasRegistry> =
  ITokenRequiring<Importer, ITokenType<Exporter, T>>;

export type IModuleTupleTypes<Tuple extends IHasRegistry[]> = {
    [Index in Exclude<keyof Tuple, string | symbol>]: Type<Tuple[Index]>;
} & {length: Tuple["length"]};