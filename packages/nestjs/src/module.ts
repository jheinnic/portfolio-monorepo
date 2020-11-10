import { KeysExtendedBy, KeysExtending } from '@jchptf/objecttypes';
import {Type} from '@nestjs/common';

// export const GLOBAL_MODULE_ID: unique symbol = Symbol('global scope');

export const REGISTRY: unique symbol = Symbol('moduleId');
export const MARKER: unique symbol = Symbol('moduleId');

export interface IModuleRegistry {
   readonly [REGISTRY]: this; // typeof MARKER;
}

export interface IModule<M extends IModuleRegistry> {
   readonly [REGISTRY]: M;
}

export type IModuleLike = IModuleRegistry | IModule<IModuleRegistry>;

export type IModuleTypes<M extends IModuleLike> = M extends IModule<infer R> ? R : M;

export type IToken<M extends IModuleLike> = M extends IModule<infer R>
  ? Exclude<keyof R, string|number>
  : Exclude<keyof M, string|number>;
export type ITokenType<M extends IModuleLike, T extends IToken<M>> =
  M extends IModule<infer R> ? R[T] : M[T];

export type ITokenProviding<M extends IModuleLike, T> = M extends IModule<infer R>
  ? Exclude<KeysExtending<R, T>, string|number>
  : Exclude<KeysExtending<M, T>, string|number>;

export type ITokenRequiring<M extends IModuleLike, T> = M extends IModule<infer R>
  ? Exclude<KeysExtendedBy<R, T>, string|number>
  : Exclude<KeysExtendedBy<M, T>, string|number>;

export type ITokenImportExportable<
  Importer extends IModuleLike, T extends IToken<Importer>, Exporter extends IModuleLike> =
  ITokenProviding<Exporter, ITokenType<Importer, T>>;

export type ITokenExportImportable<
  Exporter extends IModuleLike, T extends IToken<Exporter>, Importer extends IModuleLike> =
  ITokenRequiring<Importer, ITokenType<Exporter, T>>;

export type IModuleTupleTypes<Tuple extends [...IModule<IModuleRegistry>[]]> = {
   [Index in keyof Tuple]: Type<Tuple[Index]>;
} & {length: Tuple['length']}