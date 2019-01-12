import { Keys } from 'simplytyped';
import { If } from './boolean';
import { Extends, Intersects, IsExactly, StronglyExtends } from './classification';

type KeyValue<T, K extends keyof T, IgnoreUndef extends boolean> =
   If<IgnoreUndef, Required<T>[K], T[K], T[K], T[K]>;

export type KeysThatAre<T, CheckType, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IsExactly<KeyValue<T, K, IgnoreUndef>, CheckType, K, never>
}[Keys<T>];

export type KeysThatAreNot<T, CheckType, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IsExactly<KeyValue<T, K, IgnoreUndef>, CheckType, never, K>
}[Keys<T>];

export type KeysExtending<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: If<Extends<KeyValue<T, K, IgnoreUndef>, C>, K, never, never, K>;
}[Keys<T>];

export type KeysNotExtending<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: If<Extends<KeyValue<T, K, IgnoreUndef>, C>, never, K, K, never>;
}[Keys<T>];

export type KeysStronglyExtending<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: If<StronglyExtends<KeyValue<T, K, IgnoreUndef>, C>, K, never, never, K>;
}[Keys<T>];

export type KeysNotStronglyExtending<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: If<StronglyExtends<KeyValue<T, K, IgnoreUndef>, C>, never, K, K, never>;
}[Keys<T>];

export type KeysExtendedBy<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: Extends<C, KeyValue<T, K, IgnoreUndef>, K, never>;
}[Keys<T>];

export type KeysNotExtendedBy<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: Extends<C, KeyValue<T, K, IgnoreUndef>, never, K>;
}[Keys<T>];

export type KeysStronglyExtendedBy<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: StronglyExtends<C, KeyValue<T, K, IgnoreUndef>, K, never>;
}[Keys<T>];

export type KeysNotStronglyExtendedBy<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: StronglyExtends<C, KeyValue<T, K, IgnoreUndef>, never, K>;
}[Keys<T>];

export type KeysIntersecting<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: Intersects<KeyValue<T, K, IgnoreUndef>, C, K, never>;
}[Keys<T>];

export type KeysExcluding<T, C, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: Intersects<KeyValue<T, K, IgnoreUndef>, C, never, K>;
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

