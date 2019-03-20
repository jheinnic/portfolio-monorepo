
export type A = 1 | 2 | 3;
export type B = A extends 2 ? 'a' : 'b';
export type C<T> = T extends 2 ? 'a' : 'b';

export const ba: B = 'a';
export const bb: B = 'b';
export const bc: B = 'c';

export const c1a:C<1 | 2 | 3> = 'a'; // !!!!
export const c1b:C<1 | 2 | 3> = 'b';
export const c1c:C<1 | 2 | 3> = 'c';

export const da: C<B|B> = 'a';
export const db: C<B|B> = 'b';
export const dc: C<B|B> = 'c';

export const c2a:C<B> = 'a';
export const c2b:C<B> = 'b';
export const c2c:C<B> = 'c';

export interface IE {
   all: 1 | 2 | 3;
   b: B;
   c: 1 | B;
}

export const eaa: C<IE['all']> = 'a';
export const eab: C<IE['all']> = 'b';
export const eac: C<IE['all']> = 'c';

export const eba: C<IE['b']> = 'a';
export const ebb: C<IE['b']> = 'b';
export const ebc: C<IE['b']> = 'c';

export type D = 'all' | 'c';
export type E = Pick<IE, D>;
export type F = Pick<IE, 'all'> | Pick<IE, 'c'>;
export type G<X> = X extends { all: any } ? 'a' : 'b';

export type H = Pick<IE, 'all'>;
export type I = Pick<IE, 'c'>;
export type J = H | I;

export interface IK {
   all: 1;
   s: 1;
}
export interface IL {
   c: 1;
   s: 2;
}
export type M = IK | IL;

export const de: E = 7;
export const de2: E = {
   all: 1,
   b: 1,
   c: 1,
};
export const de3: E = {
   all: 1,
};
export const df: F = 7;
export const df2: F = {
   all: 1,
   b: 1,
   c: 1,
};
export const df3: F = {
   all: 1,
   c: 1,
};
export const df4: H = df3;
export const df5: I = df3;
export const df6: J = df3;

export const dj: J = {
   all: 1,
   c: 1,
};

export const ik : IK = {
   all: 1,
   s: 1,
};

export const il : IL = {
   c: 1,
   s: 2,
};

export const m: M = {
   all: 1,
   c: 1,
   s: 2,
};

export const gea: G<E> = 'a';
export const geb: G<E> = 'b';
export const gec: G<E> = 'c';

export const gfa: G<F> = 'a';
export const gfb: G<F> = 'b';
export const gfc: G<F> = 'c';