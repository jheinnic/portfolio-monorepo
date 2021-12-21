export const FOO: unique symbol = Symbol.keyFor("fff" );
export const GOO: unique symbol = Symbol.for("fsdf" );

export class Thing {
    [FOO]: number = 4;
    [GOO]: number = 42;
}

// import * from exploreSymbols.spec
