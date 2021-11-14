// Addition and Subtraction for 0..11
import { SupportedIndex, SupportedLength } from './length'


export type MMinusN<M extends SupportedLength, N extends SupportedLength> = [
   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, never],
   [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, never, never],
   [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, never, never, never],
   [4, 5, 6, 7, 8, 9, 10, 11, 12, never, never, never, never],
   [5, 6, 7, 8, 9, 10, 11, 12, never, never, never, never, never],
   [6, 7, 8, 9, 10, 11, 12, never, never, never, never, never, never],
   [7, 8, 9, 10, 11, 12, never, never, never, never, never, never, never],
   [8, 9, 10, 11, 12, never, never, never, never, never, never, never, never],
   [9, 10, 11, 12, never, never, never, never, never, never, never, never, never],
   [10, 11, 12, never, never, never, never, never, never, never, never, never, never],
   [11, 12, never, never, never, never, never, never, never, never, never, never, never],
   [12, never, never, never, never, never, never, never, never, never, never, never, never]
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

export type Prev<T extends SupportedLength> =
   [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][T];
export type Next<T extends SupportedIndex> =
   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, never][T];

export type TupleOfLength<Item, Count extends number> = [Item, ...Item[]] & {length: Count}
