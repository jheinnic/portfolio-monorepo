/// <reference path="./root.ts">

import {One} from "./foo/one";
import {Two} from "./foo/two";
import {Models} from './foo/root';

export const a1: Models.ITokenType<One.THING> = "a"
export const a2: Models.ITokenType<Two.THING> = 5;
export const b: Models.ITokenType<One.THING1> = 7;
export const c: Models.ITokenType<Two.THING2> = "xyz";
// export const e: Models.ITokenType<Models.AA> = 4;

export const d: keyof Models.Stuff = Two.THING2;