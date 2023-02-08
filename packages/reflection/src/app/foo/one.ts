/// <reference path="./root.d.ts">
// import {Models} from './root';

export module One {
    export const THING = Symbol("a");
    export type THING = typeof THING;

    export const THING1 = Symbol("a");
    export type THING1 = typeof THING1;
}

declare namespace Models {
    export class Stuff {
        public [One.THING]: String;
        public [One.THING1]: number;
    }
}