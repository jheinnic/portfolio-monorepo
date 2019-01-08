import { And, If, Not, Or, StrictIf } from './boolean';

// export type IsNever<S extends string> = Not<(Record<S, true> & Record<string, false>)[S]>;

/**
 * True iff T is never, otherwise false.
 */
export type IsNever<T> = [T] extends [never] ? true : false;

/**
 * True if null is a possible value of type T, otherwise false.
 */
export type IsNullable<T> = Not<IsNever<Extract<T, null>>>;

/**
 * True if undefinable is a possible value of type T, otherwise false.
 */
export type IsUndefinable<T> = Not<IsNever<Extract<T, undefined>>>;

/**
 * True if the type is possibly null or undefined, otherwise false.
 *
 * Note that a type that can either be null but not undefined or undefined but not null is not nixable.
 * A nixable type must allow both null and undefined.
 */
export type IsNixable<T> = And<IsNullable<T>, IsUndefinable<T>>;

type InternalExtends<T, U> = T extends U ? true : false;

// export type IsSuperTypeOf<T, X> = InternalExtends<X, T>;
// export type IsSubTypeOf<T, X> = InternalExtends<T, X>;
export type IsArray<T> = InternalExtends<T, any[]>;
export type IsNumber<T> = InternalExtends<T, number>;
export type IsString<T> = InternalExtends<T, string>;
export type IsFunction<T> = Or<InternalExtends<T, { <R = any>(...args: any[]): R; }>, InternalExtends<T, Function>>;

// export type IsStringFunction<T extends string> = And<IsString<T>, IsNever<T>>;
// export type IsAny<T> = And<Not<IsArray<T>>, And<Not<IsBoolean<T>>, And<Not<IsNumber<T>>, And<Not<IsString<T>>, And<Not<IsFunction<T>>, And<Not<IsNil<T>>, Not<IsObject<T>>>>>>>>;

export type IsBoolean<T> = InternalExtends<T, boolean>;
export type IsNull<T> = InternalExtends<T, null>;
export type IsUndefined<T> = InternalExtends<T, undefined>;
export type IsNix<T> = Or<IsNull<T>, IsUndefined<T>>;
export type IsObject<T> = And<InternalExtends<T, object>, Not<Or<IsFunction<T>, IsArray<T>>>>;
export type IsAny<T> = Not<Or<IsArray<T>, Or<IsBoolean<T>, Or<IsNumber<T>, Or<IsString<T>, Or<IsFunction<T>, Or<IsNix<T>, IsObject<T>>>>>>>>;

export type Extends<T, U> = StrictIf<Or<IsAny<T>, IsNever<U>>, true, StrictIf<Or<IsAny<U>, IsNever<T>>, false, T extends U ? true : false, true>, true>;

export type StronglyExtends<T, U> = StrictIf<Or<IsAny<T>, IsNever<U>>, Or<IsAny<U>, IsNever<T>>, Extends<T, U>, false>;

/**
 * True iff every value of type U is also a value of type T and vice-versa, otherwise false.
 */
// export type IsExactly<T, U> = IsNeverType<SetXor<U, T>>;
// export type IsExactly<T, U> = IsNever<SetXor<U, T>>;
// export type IsExactly<T, U> = And<Extends<U, T>, Extends<T, U>>;
export type IsExactly<T, U> = IsNever<Exclude<U, T> | Exclude<T, U>>;

export type Intersects<T, U> = If<Or<IsAny<T>, IsAny<U>>, true, If<Or<IsNever<T>, IsNever<U>>, false, Not<IsNever<Extract<T, U>>>>>;
