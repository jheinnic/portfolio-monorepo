import {
   KeysExcluding, KeysExtendedBy, KeysExtending, KeysIntersecting, KeysNotExtendedBy,
   KeysNotStronglyExtendedBy, KeysNotStronglyExtending, KeysStronglyExtendedBy, KeysStronglyExtending,
   KeysThatAre, KeysThatAreNot
} from '@jchptf/objecttypes';
import { IOne } from './fixtures';
import { KeysNotExtending } from '../src';

// $ExpectType "a" | "h"
export type Test001 = KeysThatAre<IOne, string>;

// $ExpectType "b" | "d" | "e" | "c" | "f" | "g" | "i" | "j" | "k" | "l"
export type Test002 = KeysThatAreNot<IOne, string>;

// $ExpectType "d" | "a" | "c" | "f" | "h" | "j" | "k"
export type Test003 = KeysExtending<IOne, string>;

// $ExpectType "b" | "e" | "g" | "i" | "l"
export type Test004 = KeysNotExtending<IOne, string>;

// $ExpectType "b" | "d" | "a" | "h" | "i" | "k"
export type Test005 = KeysExtendedBy<IOne, string>;

// $ExpectType "e" | "c" | "f" | "g" | "j" | "l"
export type Test006 = KeysNotExtendedBy<IOne, string>;

// $ExpectType "e" | "f" | "g" | "l"
export type Test007 = KeysExcluding<IOne, string>;

// $ExpectType "b" | "d" | "a" | "c" | "h" | "i" | "j" | "k"
export type Test008 = KeysIntersecting<IOne, string>;

// $ExpectType "a" | "c" | "f" | "h" | "j"
export type Test009 = KeysStronglyExtending<IOne, string>;

// $ExpectType "b" | "d" | "e" | "g" | "i" | "k" | "l"
export type Test010 = KeysNotStronglyExtending<IOne, string>;

// $ExpectType "b" | "d" | "a" | "h" | "i" | "k"
export type Test011 = KeysStronglyExtendedBy<IOne, string>;

// $ExpectType "e" | "c" | "f" | "g" | "j" | "l"
export type Test012 = KeysNotStronglyExtendedBy<IOne, string>;
