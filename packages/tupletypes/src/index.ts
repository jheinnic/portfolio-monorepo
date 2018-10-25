import {AnyFunc, Keys} from 'simplytyped';

export type LengthIndexTypes = [never, 0, 0 | 1, 0 | 1 | 2, 0 | 1 | 2 | 3, 0 | 1 | 2 | 3 | 4];
export type IndexTypeFor<N extends number> = LengthIndexTypes[N];

export type LengthIndexTuples = [[], [0], [0, 1], [0, 1, 2], [0, 1, 2, 3], [0, 1, 2, 3, 4]];
export type IndexTupleFor<N extends number> = LengthIndexTuples[N]

export type LastNFor<T extends any[], N extends number> = {
   [K in IndexTypeFor<N>]: K extends number ? T[MPlusN<MMinusN<LengthOf<T>, N>, K>] : never
}
export type LastOneFor<T extends any[]> = LastNFor<T, 1>;
export type LastExceptNFor<T extends any[], N extends number> = LastNFor<T, MMinusN<LengthOf<T>, N>>
export type LastExceptOneFor<T extends any[]> = LastExceptNFor<T, 1>;

/*
export type Fourple = [boolean, string, number, object]
export type Triple = LastSizeMinus1For<Fourple>;

// Bad
export const a:Triple = [true, 'd', 4, {}];
// Good
export const b:Triple = {
   0: 'd',
   1: 4,
   2: {}
};
// Good
export const c:Triple = ['d', 4, {}];
*/

// Addition and Subtraction for 0..11
export type MMinusN<M extends number, N extends number> = [
   [0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11],
   [1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10],
   [2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9],
   [3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8],
   [4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7],
   [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6],
   [6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5],
   [7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4],
   [8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3],
   [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2],
   [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1],
   [11, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
   ][M][N];
export type MPlusN<M extends number, N extends number> = [
   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
   [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
   [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
   [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
   [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
   [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
   [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
   [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
   [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
   [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
   [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
   ][M][N];
export type Prev<T extends number> = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][T]
export type Next<T extends number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12][T]

export type LengthOf<T extends any[]> = T extends { length: infer N } ? N : never

export type LastOf<T extends any[]> = NthOf<T, Prev<LengthOf<T>>>;
export type FirstOf<T extends any[]> = T[0];
export type NthOf<T extends any[], N extends number> = T[N];

/*
function someRandomFunction( r: boolean, t: number, z: string[] ): void {
   console.log(r, t, z);
}

type Params<T> = T extends (...args: infer P ) => any ? P : never

const weAreString: LastOf<Params<typeof someRandomFunction>> = [ "lllllfff", "fgsgs" ];

console.log(typeof weAreString);
*/

export type Fluently<T> = {
   [K in keyof T]: T[K] extends AnyFunc ? (...args: Parameters<T[K]>) => Fluently<T> : T[K]
}

export type IfExtends<T, B> = T extends B ? T : never;
export type IfNotExtends<T, B> = T extends B ? never : T;
export type IfStrictlyExtends<T, B> = Exclude<IfExtends<T,B>, IfNotExtends<T,B>>

export type Mutable<T> = { -readonly [P in keyof T]: T[P]; }
export type MutablePartial<T> = { -readonly [P in keyof T]+?: T[P] };  // Remove readonly and add ?
export type MutableRequired<T> = { -readonly [P in keyof T]-?: T[P] };  // Remove readonly and ?
export type ReadonlyPartial<T> = { +readonly [P in keyof T]+?: T[P] };  // Add readonly and ?
export type ReadonlyRequired<T> = { +readonly [P in keyof T]-?: T[P] };  // Add readonly and remove ?

export type TypeName<T> =
   T extends string ? 'string' :
      T extends number ? 'number' :
         T extends boolean ? 'boolean' :
            T extends undefined ? 'undefined' :
               T extends Function ? 'function' : 'object';

export interface Getter<T = any> extends Function
{
   (): T
}
export type GetterReturnType<G extends Getter> = ReturnType<G>;

export interface Setter<P extends any[] = any[]> extends Function
{
   (...args: P): void
}
export type SetterParamTypes<S extends Setter> = S extends (...args: infer P) => void ? P : never;

// export interface Operation<P extends any[] = any[], T extends any = any> extends Function
// {
//    (...args: P): Exclude<T, void>
// }

export type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
export type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

export type ValuePropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
export type ValueProperties<T> = Pick<T, ValuePropertyNames<T>>;

export type GetterPropertyNames<T> = {
   [K in FunctionPropertyNames<T>]: T[K] extends Getter ? K : never
}[FunctionPropertyNames<T>]
export type GetterProperties<T> = Pick<T, GetterPropertyNames<T>>

export type SetterPropertyNames<T> = {
   [K in FunctionPropertyNames<T>]: T[K] extends Setter ? K : never
}[FunctionPropertyNames<T>]
export type SetterProperties<T> = Pick<T, SetterPropertyNames<T>>


export type NoFunc<T> = TypeName<T> extends 'function' ? never : T;
export type OnlyNoFunc<T> = {
   [K in Keys<T>]: NoFunc<T[K]>
};
export type HasNoFunc<T> = T extends OnlyNoFunc<T> ? T : never;


export type Readable<T> = {
   [K in GetterPropertyNames<T> | ValuePropertyNames<T>]: T[K]
};
export type OnlyReadable<T> = {
   [K in keyof T]: T[K] extends Function ? (T[K] extends Getter ? T[K] : never) : T[K];
};
export type IfReadable<T> = IfExtends<T, OnlyReadable<T>>;


// export type OptionsBagInputPropertyNames<T> = ValuePropertyNames<T> | SetterPropertyNames<T>
// export type OptionsBagOutputPropertyNames<T> = ValuePropertyNames<T> | GetterPropertyNames<T>
export type OptionsBagPropertyNames<T> =
   ValuePropertyNames<T>
   | GetterPropertyNames<T>
   | SetterPropertyNames<T>;
export type OptionsBag<T> = Pick<T, OptionsBagPropertyNames<T>>
export type OnlyOptionsBag<T> = {
   [K in keyof T]: K extends OptionsBagPropertyNames<T> ? T[K] : never
}
export type IfOptionsBag<T> = IfExtends<T, OnlyOptionsBag<T>>;


export type KeysThatAre<T, C> = {
   [K in Keys<T>]: T[K] extends C ? K : never
}[Keys<T>];
export type KeysThatAreNot<T, C> = {
   [K in Keys<T>]: T[K] extends C ? never : K
}[Keys<T>];
export type StrictKeysThatAre<T, C> = Exclude<KeysThatAre<T, C>, KeysThatAreNot<T, C>>;
export type OnlyIfAllKeysAre<T, C> = Keys<T> extends StrictKeysThatAre<T, C> ? T : never;

