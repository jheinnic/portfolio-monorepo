import {Keys} from 'simplytyped';
import {IfStrictlyExtends} from './inheritance';

export type KeysThatAre<T, C> = {
   [K in Keys<T>]: T[K] extends C ? K : never;
}[Keys<T>];

export type KeysThatAreNot<T, C> = {
   [K in Keys<T>]: T[K] extends C ? never : K;
}[Keys<T>];

export type OnlyKeysThatAre<T, C> =
   Pick<T, KeysThatAre<T, C>>;

export type OnlyKeysThatAreNot<T, C> =
   Pick<T, KeysThatAreNot<T, C>>;

export type IfOnlyKeysThatAre<T, C, P = T, N = never> =
   IfStrictlyExtends<T, OnlyKeysThatAre<T, C>, P, N>

export type IfOnlyKeysThatAreNot<T, C, P = T, N = never> =
   IfStrictlyExtends<T, OnlyKeysThatAreNot<T, C>, P, N>

