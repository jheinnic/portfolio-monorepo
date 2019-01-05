// Standard library provides Partial, Readonly, and Required, but omits
// Mutable.  It also lacks shorthand types for each of the four permutations
// possible by combining Partial or Required with Readonly or Mutable.
//
// It also does not prevent these types from applying to non-object types,
// such as strings and functions, leading to some quirky semantics...

export type SafePartial<T extends object> = Partial<T>;
export type SafeRequired<T extends object> = Required<T>;
export type SafeReadonly<T extends object> = Readonly<T>;

export type Mutable<T extends object> = {
   -readonly [P in keyof T]: T[P];
};

export type ReadonlyPartial<T extends object> = Partial<Readonly<T>>;
// export type ReadonlyPartial<T> = {
//    +readonly [P in keyof T]+?: T[P];
// };

/**
 * Returns an isomorphic interface for its generic type parameter where all
 * defined properties are required and immutable.
 */
export type ReadonlyRequired<T extends object> = Required<Readonly<T>>;
// export type ReadonlyRequired<T> = {
//    +readonly [P in keyof T]-?: T[P];
// };

export type MutablePartial<T extends object> = {
   -readonly [P in keyof T]+?: T[P];
};

export type MutableRequired<T extends object> = {
   -readonly [P in keyof T]-?: T[P];
};
