import { MMinusN, MPlusN } from './math';

export type SupportedLength = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type SupportedIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type LengthOf<T extends any[]> =
   T extends { length: infer N } ? N & SupportedLength : never;

export type IndexTypes = [
   never,
   0,
   0 | 1,
   0 | 1 | 2,
   0 | 1 | 2 | 3,
   0 | 1 | 2 | 3 | 4,
   0 | 1 | 2 | 3 | 4 | 5,
   0 | 1 | 2 | 3 | 4 | 5 | 6,
   0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,
   0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
   0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
   0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
   0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
];

export type IndicesByLength<N extends SupportedLength> = IndexTypes[N];
export type IndicesFor<T extends any[]> = IndexTypes[LengthOf<T>];

type ExcludeEachFrom<T, Origin> = {
   [K in keyof T]: Exclude<Origin, T[K]>
};
type ExcludedIndexTypes = ExcludeEachFrom<IndexTypes, SupportedIndex>;
type ExcludedIndicesFor<T extends any[]> = ExcludedIndexTypes[LengthOf<T>];

export type NthOf<T extends any[], N extends IndicesFor<T>> = T[N];
export type LengthMinus<T extends any[], N extends IndicesFor<T>> = MMinusN<LengthOf<T>, N>;
export type LengthPlus<T extends any[], N extends ExcludedIndicesFor<T>> = MPlusN<LengthOf<T>, N>;

export type LengthThatFits<T extends any[]> = IndicesFor<T> | LengthOf<T>;
export type LengthUpTo<N extends SupportedLength> = IndicesByLength<N> | N;

// export type IndexTuplesByLength = [
//    [],
//    [0],
//    [0, 1],
//    [0, 1, 2],
//    [0, 1, 2, 3],
//    [0, 1, 2, 3, 4],
//    [0, 1, 2, 3, 4, 5],
//    [0, 1, 2, 3, 4, 5, 6],
//    [0, 1, 2, 3, 4, 5, 6, 7],
//    [0, 1, 2, 3, 4, 5, 6, 7, 8],
//    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
// ];
// export type LengthIndexTuple<N extends number> = IndexTuplesByLength[N];
// export type IndexTupleFor<T extends any[]> = IndexTuplesByLength[LengthOf<T>];
