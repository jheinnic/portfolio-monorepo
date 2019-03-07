// Addition and Subtraction for 0..11
export type MMinusN<M extends number, N extends number> = [
   [0, never, never, never, never, never, never, never, never, never, never, never],
   [1, 0, never, never, never, never, never, never, never, never, never, never],
   [2, 1, 0, never, never, never, never, never, never, never, never, never],
   [3, 2, 1, 0, never, never, never, never, never, never, never, never],
   [4, 3, 2, 1, 0, never, never, never, never, never, never, never],
   [5, 4, 3, 2, 1, 0, never, never, never, never, never, never],
   [6, 5, 4, 3, 2, 1, 0, never, never, never, never, never],
   [7, 6, 5, 4, 3, 2, 1, 0, never, never, never, never],
   [8, 7, 6, 5, 4, 3, 2, 1, 0, never, never, never],
   [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, never, never],
   [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, never],
   [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
   // [never, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
   // [never, never, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
   // [never, never, never, 11, 10, 9, 8, 7, 6, 5, 4, 3],
   // [never, never, never, never, 11, 10, 9, 8, 7, 6, 5, 4],
   // [never, never, never, never, never, 11, 10, 9, 8, 7, 6, 5],
   // [never, never, never, never, never, never, 11, 10, 9, 8, 7, 6],
   // [never, never, never, never, never, never, never, 11, 10, 9, 8, 7],
   // [never, never, never, never, never, never, never, never, 11, 10, 9, 8],
   // [never, never, never, never, never, never, never, never, never, 11, 10, 9],
   // [never, never, never, never, never, never, never, never, never, never, 11, 10],
   // [never, never, never, never, never, never, never, never, never, never, never, 11]
   ][M][N];
export type MPlusN<M extends number, N extends number> = [
   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, never],
   [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, never, never],
   [3, 4, 5, 6, 7, 8, 9, 10, 11, never, never, never],
   [4, 5, 6, 7, 8, 9, 10, 11, never, never, never, never],
   [5, 6, 7, 8, 9, 10, 11, never, never, never, never, never],
   [6, 7, 8, 9, 10, 11, never, never, never, never, never, never],
   [7, 8, 9, 10, 11, never, never, never, never, never, never, never],
   [8, 9, 10, 11, never, never, never, never, never, never, never, never],
   [9, 10, 11, never, never, never, never, never, never, never, never, never],
   [10, 11, never, never, never, never, never, never, never, never, never, never],
   [11, never, never, never, never, never, never, never, never, never, never, never]
   ][M][N];

export type Prev<T extends number> =
   [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][T];
export type Next<T extends number> =
   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, never][T];
