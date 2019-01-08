import { Keys } from 'simplytyped';
import { If } from './boolean';
import {
   IfExcludes, IfExtendedBy, IfExtends, IfIntersects, IfIsExactly, IfStronglyExtendedBy, IfStronglyExtends
} from './selection';

type KeyValue<T, K extends keyof T, IgnoreUndef extends boolean> =
   If<IgnoreUndef, Required<T>[K], T[K]>;

export type KeysThatAre<T, CheckType, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IfIsExactly<KeyValue<T, K, IgnoreUndef>, CheckType, K, never>
}[Keys<T>];

export type KeysThatAreNot<T, CheckType, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IfIsExactly<KeyValue<T, K, IgnoreUndef>, CheckType, never, K>
}[Keys<T>];

export type KeysExtending<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IfExtends<KeyValue<T, K, IgnoreUndef>, C, K, never>;
}[Keys<T>];

export type KeysNotExtending<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IfExtends<KeyValue<T, K, IgnoreUndef>, C, never, K>;
}[Keys<T>];

export type KeysStronglyExtending<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IfStronglyExtends<KeyValue<T, K, IgnoreUndef>, C, K, never>;
}[Keys<T>];

export type KeysNotStronglyExtending<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IfStronglyExtends<KeyValue<T, K, IgnoreUndef>, C, never, K>;
}[Keys<T>];

export type KeysExtendedBy<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IfExtendedBy<KeyValue<T, K, IgnoreUndef>, C, K, never>;
}[Keys<T>];

export type KeysNotExtendedBy<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IfExtendedBy<KeyValue<T, K, IgnoreUndef>, C, never, K>;
}[Keys<T>];

export type KeysStronglyExtendedBy<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IfStronglyExtendedBy<KeyValue<T, K, IgnoreUndef>, C, K, never>;
}[Keys<T>];

export type KeysNotStronglyExtendedBy<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IfStronglyExtendedBy<KeyValue<T, K, IgnoreUndef>, C, never, K>;
}[Keys<T>];

export type KeysIntersecting<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IfIntersects<KeyValue<T, K, IgnoreUndef>, C, K, never>;
}[Keys<T>];

export type KeysExcluding<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IfExcludes<KeyValue<T, K, IgnoreUndef>, C, K, never>;
}[Keys<T>];

// export type OnlyKeysThatAre<T, C> =
//    Pick<T, KeysThatAre<T, C>>;
//
// export type OnlyKeysThatAreNot<T, C> =
//    Pick<T, KeysThatAreNot<T, C>>;
//
// export type IfOnlyKeysThatAre<T, C, P = T, N = never> =
//    IfStrictlyExtends<T, OnlyKeysThatAre<T, C>, P, N>
//
// export type IfOnlyKeysThatAreNot<T, C, P = T, N = never> =
//    IfStrictlyExtends<T, OnlyKeysThatAreNot<T, C>, P, N>

