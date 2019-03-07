type IndexTypesByLength =
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
export type IndexTypeFor<N extends number> = IndexTypesByLength[N];

type IndexTuplesByLength = [
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
export type IndexTupleFor<N extends number> = IndexTuplesByLength[N]

