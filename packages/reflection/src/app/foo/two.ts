/// <reference path="./root.d.ts">
namespace Two {
    export const THING = Symbol("a");
    export type THING = typeof THING;

    export const THING2 = Symbol("a");
    export type THING2 = typeof THING2;
}

namespace Models {
    export interface Stuff {
        [Two.THING]: number;
        [Two.THING2]: String;
    }
}