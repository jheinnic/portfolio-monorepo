import { Keys } from 'simplytyped';
import { If } from './boolean';
import { IfExcludes, IfExtends, IfHasType, IfIsExactly } from './selection';

// Keys
export type KeysThatAre<T, CheckType, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IfIsExactly<If<IgnoreUndef, Required<T>, T>[K], CheckType, K, never>
}[Keys<T>];

export type KeysThatAreNot<T, CheckType, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IfIsExactly<If<IgnoreUndef, Required<T>, T>[K], CheckType, never, K>
}[Keys<T>];

export type KeysAccepting<T, CheckType, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IfExtends<Extract<If<IgnoreUndef, Required<T>, T>[K], CheckType>, never, K, never>
}[Keys<T>];

export type KeysAcceptedBy<T, CheckType, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IfExtends<Extract<CheckType, If<IgnoreUndef, Required<T>, T>[K]>, never, K, never>
}[Keys<T>];

export type KeysNotAccepting<T, CheckType, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IfExtends<Extract<If<IgnoreUndef, Required<T>, T>[K], CheckType>, never, never, K>
}[Keys<T>];

export type KeysNotAcceptedBy<T, CheckType, IgnoreUndef extends boolean = true> = {
   [K in Keys<T>]-?: IfExtends<Extract<CheckType, If<IgnoreUndef, Required<T>, T>[K]>, never, never, K>
}[Keys<T>];

// export type KeysPartiallyAccepting<T, CheckType, IgnoreUndef extends boolean = true> = {
//    [K in Keys<T>]-?: IfHasPartial<If<IgnoreUndef, Required<T>, T>[K], CheckType, K, never>
// }[Keys<T>];

// export type KeysPartiallyAcceptedBy<T, CheckType, IgnoreUndef extends boolean = true> = {
//    [K in Keys<T>]-?: IfHasPartial<CheckType, If<IgnoreUndef, Required<T>, T>[K], K, never>
// }[Keys<T>];

// OnlyKeys
export type OnlyKeysThatAre<T, CheckType, IgnoreUndef extends boolean = true> =
   Pick<T, KeysThatAre<T, CheckType, IgnoreUndef>>;

export type OnlyKeysThatAreNot<T, CheckType, IgnoreUndef extends boolean = true> =
   Pick<T, KeysThatAreNot<T, CheckType, IgnoreUndef>>;

export type OnlyKeysAccepting<T, CheckType, IgnoreUndef extends boolean = true> =
   Pick<T, KeysAccepting<T, CheckType, IgnoreUndef>>;

export type OnlyKeysAcceptedBy<T, CheckType, IgnoreUndef extends boolean = true> =
   Pick<T, KeysAcceptedBy<T, CheckType, IgnoreUndef>>;

export type OnlyKeysExcluding<T, CheckType, IgnoreUndef extends boolean = true> =
   Pick<T, KeysExcluding<T, CheckType, IgnoreUndef>>;

// export type OnlyKeysPartiallyAccepting<T, CheckType, IgnoreUndef extends boolean = true> =
//    Pick<T, KeysPartiallyAccepting<T, CheckType, IgnoreUndef>>;

// export type OnlyKeysPartiallyAcceptedBy<T, CheckType, IgnoreUndef extends boolean = true> =
//    Pick<T, KeysPartiallyAcceptedBy<T, CheckType, IgnoreUndef>>;

// IfOnly
export type IfOnlyKeysThatAre<T, CheckType, IgnoreUndef extends boolean = true, Then = T, Else = never> =
   IfIsExactly<OnlyKeysThatAre<T, CheckType, IgnoreUndef>, T, Then, Else>;

export type IfOnlyKeysThatAreNot<T, CheckType, IgnoreUndef extends boolean = true, Then = T, Else = never> =
   IfIsExactly<OnlyKeysThatAreNot<T, CheckType, IgnoreUndef>, T, Then, Else>;

export type IfOnlyKeysAccepting<T, CheckType, IgnoreUndef extends boolean = true, Then = T, Else = never> =
   IfIsExactly<OnlyKeysAccepting<T, CheckType, IgnoreUndef>, T, Then, Else>;

export type IfOnlyKeysAcceptedBy<T, CheckType, IgnoreUndef extends boolean = true, Then = T, Else = never> =
   IfIsExactly<OnlyKeysAcceptedBy<T, CheckType, IgnoreUndef>, T, Then, Else>;

export type IfOnlyKeysExcluding<T, CheckType, IgnoreUndef extends boolean = true, Then = T, Else = never> =
   IfIsExactly<OnlyKeysExcluding<T, CheckType, IgnoreUndef>, T, Then, Else>;

// export type IfOnlyKeysPartiallyAccepting<T, CheckType, IgnoreUndef extends boolean = true, Then = T, Else = never> =
//    IfIsExactly<OnlyKeysPartiallyAccepting<T, CheckType, IgnoreUndef>, T, Then, Else>;

// export type IfOnlyKeysPartiallyAcceptedBy<T, CheckType, IgnoreUndef extends boolean = true, Then = T, Else = never> =
//    IfIsExactly<OnlyKeysPartiallyAcceptedBy<T, CheckType, IgnoreUndef>, T, Then, Else>;
