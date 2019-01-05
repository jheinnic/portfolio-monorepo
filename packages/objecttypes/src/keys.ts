import {Keys} from 'simplytyped';

// Inheritance-based Property Classifiers and Filters
export type KeysThatAre<T, C> = {
   [K in Keys<T>]: T[K] extends C ? K : never;
}[Keys<T>];
export type KeysThatAreNot<T, C> = {
   [K in Keys<T>]: T[K] extends C ? never : K;
}[Keys<T>];

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
export type IfStrictKeysThatAre<T, C> =
   OnlyStrictKeysThatAre<T, C> extends T ? T : never;
export type IfStrictKeysThatAreNot<T, C> =
   OnlyStrictKeysThatAreNot<T, C> extends T ? T : never;

