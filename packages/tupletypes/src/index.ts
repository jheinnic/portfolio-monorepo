
type LengthIndexTypes = [never, 0, 0 | 1, 0 | 1 | 2, 0 | 1 | 2 | 3, 0 | 1 | 2 | 3 | 4];
type IndexTypeFor<N extends number> = LengthIndexTypes[N];

type LengthIndexTuples = [[], [0], [0, 1], [0, 1, 2], [0, 1, 2, 3], [0, 1, 2, 3, 4]];
type IndexTupleFor<N extends number> = LengthIndexTuples[N]

type LastNFor<T extends any[], N extends number, O extends number = MMinusN<LengthOf<T>, N>> = {
   [K in IndexTypeFor<N>]: K extends number ? T[MPlusN<O, K>] : never
}
type LastSizeMinusNFor<T extends any[], N extends number> = LastNFor<T, MMinusN<LengthOf<T>, N>>

type LastSizeMinus1For<T extends any[]> = LastSizeMinusNFor<T, 1>;

/*
type Fourple = [boolean, string, number, object]
type Triple = LastSizeMinus1For<Fourple>;

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
type MMinusN<M extends number, N extends number> = [
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
type MPlusN<M extends number, N extends number> = [
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
type Prev<T extends number> = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][T]
type Next<T extends number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12][T]

type LengthOf<T extends any[]> = T extends { length: infer N } ? N : never

type LastOf<T extends any[]> = NthOf<T, Prev<LengthOf<T>>>;
type FirstOf<T extends any[]> = T[0];
type NthOf<T extends any[], N extends number> = T[N];

/*
function someRandomFunction( r: boolean, t: number, z: string[] ): void {
   console.log(r, t, z);
}

type Params<T> = T extends (...args: infer P ) => any ? P : never

const weAreString: LastOf<Params<typeof someRandomFunction>> = [ "lllllfff", "fgsgs" ];

console.log(typeof weAreString);
*/
