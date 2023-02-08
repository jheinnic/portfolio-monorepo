/// <reference path="./root.d.ts">
export module One {
    export const THING = Symbol("a");

    export const THING1 = Symbol("a");
}

export namespace Models {
    export class Stuff {
       public static [One.THING]: String;
    }
}