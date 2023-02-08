/// <reference path="./root.d.ts">
namespace Models {
    export const THING: unique symbol = Symbol("a");
    export type THING = typeof THING;

    export const THING2: unique symbol = Symbol("a");
    export type THING2 = typeof THING2;

    export interface Stuff {
        [THING]: number;
        [THING2]: String;
    }
}