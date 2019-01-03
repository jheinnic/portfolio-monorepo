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

