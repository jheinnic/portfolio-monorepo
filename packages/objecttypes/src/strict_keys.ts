import {IfStrictlyExtends} from './inheritance';
import {KeysThatAre, KeysThatAreNot} from './keys';

// Attempts to exclude wildcard matches on any, which will by definition match
// both KeysThatAre<T, C> and KeysThatAreNot<T, C>, regardless of what C is.
export type StrictKeysThatAre<T, C> =
   Exclude<KeysThatAre<T, C>, KeysThatAreNot<T, C>>;

export type StrictKeysThatAreNot<T, C> =
   Exclude<KeysThatAreNot<T, C>, KeysThatAre<T, C>>;
// export type OnlyStrictKeysThatAre<T, C> = {
//    [K in Keys<T>]: K extends StrictKeysThatAre<T, C> ? T[K] : never;
// }
// export type OnlyStrictKeysThatAreNot<T, C> = {
//    [K in Keys<T>]: K extends StrictKeysThatAreNot<T, C> ? T[K] : never;
// }

export type OnlyStrictKeysThatAre<T, C> =
   Pick<T, StrictKeysThatAre<T, C>>;

export type OnlyStrictKeysThatAreNot<T, C> =
   Pick<T, StrictKeysThatAreNot<T, C>>;
// export type IfStrictKeysThatAre<T, C> =
//    T extends OnlyStrictKeysThatAre<T, C> ? T : never;
// export type IfStrictKeysThatAreNot<T, C> =
//    T extends OnlyStrictKeysThatAreNot<T, C> ? T : never;

export type IfOnlyStrictKeysThatAre<T, C, P = T, N = never> =
   IfStrictlyExtends<T, OnlyStrictKeysThatAre<T, C>, P, N>
   // OnlyStrictKeysThatAre<T, C> extends T ? T : never;

export type IfOnlyStrictKeysThatAreNot<T, C, P = T, N = never> =
   IfStrictlyExtends<T, OnlyStrictKeysThatAreNot<T, C>, P, N>
   // OnlyStrictKeysThatAreNot<T, C> extends T ? T : never;

