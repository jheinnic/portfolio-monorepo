/// <reference path="../../../reflection/typings/foo/root.d.ts">
/// <reference path="../../../reflection/typings/foo/two.d.ts">
/// <reference path="../../../reflection/typings/foo/one.d.ts">
/// <reference path="../typings/foo/root.d.ts">
/// <reference path="../typings/foo/two.d.ts">
/// <reference path="../typings/foo/one.d.ts">

export const a1: Models.ITokenType<One.THING> = "abc";
export const a2: Models.ITokenType<Two.THING> = 5;
export const b: Models.ITokenType<One.THING1> = "abc";
export const c: Models.ITokenType<Two.THING2> = 7;
export const e: Models.ITokenType<Models.AA> = 4;

export const d: keyof Models.Stuff = Two.THING2;