import { MMinusN } from './math';

export type LengthOf<T extends any[]> = T extends { length: infer N } ? N : never
export type LengthMinus<T extends any[], N extends IndexTypeFor<T>> = MMinusN<LengthOf<T>, N>;
export type LengthPlus<T extends any[], N extends IndexTypeFor<T>> = MMinusN<LengthOf<T>, N>;

export type IndexTypesByLength =
   [never,
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
export type LengthIndexType<N extends number> = IndexTypesByLength[N];
export type IndexTypeFor<T extends any[]> = IndexTypesByLength[LengthOf<T>]

export type IndexTuplesByLength = [
   [],
   [0],
   [0, 1],
   [0, 1, 2],
   [0, 1, 2, 3],
   [0, 1, 2, 3, 4],
   [0, 1, 2, 3, 4, 5],
   [0, 1, 2, 3, 4, 5, 6],
   [0, 1, 2, 3, 4, 5, 6, 7],
   [0, 1, 2, 3, 4, 5, 6, 7, 8],
   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
];
export type LengthIndexTuple<N extends number> = IndexTuplesByLength[N]
export type IndexTupleFor<T extends any[]> = IndexTuplesByLength[LengthOf<T>]

