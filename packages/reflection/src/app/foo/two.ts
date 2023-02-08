export module Two {
    export const THING = Symbol("a");
    export type THING = typeof THING;

    export const THING2 = Symbol("a");
    export type THING2 = typeof THING2;
}

declare namespace Models {
    export class Stuff {
        [Two.THING]: number;
        [Two.THING2]: String;
    }
}