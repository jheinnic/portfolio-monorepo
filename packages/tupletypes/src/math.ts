// Addition and Subtraction for 0..11
import { LengthUpTo, SupportedIndex, SupportedLength } from './length';

export type MMinusN<M extends SupportedLength, N extends SupportedLength> = [
   [0, never, never, never, never, never, never, never, never, never, never, never, never],
   [1, 0, never, never, never, never, never, never, never, never, never, never, never],
   [2, 1, 0, never, never, never, never, never, never, never, never, never, never],
   [3, 2, 1, 0, never, never, never, never, never, never, never, never, never],
   [4, 3, 2, 1, 0, never, never, never, never, never, never, never, never],
   [5, 4, 3, 2, 1, 0, never, never, never, never, never, never, never],
   [6, 5, 4, 3, 2, 1, 0, never, never, never, never, never, never],
   [7, 6, 5, 4, 3, 2, 1, 0, never, never, never, never, never],
   [8, 7, 6, 5, 4, 3, 2, 1, 0, never, never, never, never],
   [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, never, never, never],
   [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, never, never],
   [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, never],
   [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
][M][N] & LengthUpTo<M>;
export type MPlusN<M extends SupportedLength, N extends SupportedLength> = [
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
   ][M][N] & SupportedLength;

export type Prev<T extends SupportedLength> =
   [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][T];
export type Next<T extends SupportedIndex> =
   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12][T];
