import { And, If, Not, Or, StrictIf, WeakIf } from './boolean';

// export type IsNever<S extends string> = Not<(Record<S, true> & Record<string, false>)[S]>;

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

type InternalExtends<T, U, Then = true, Else = false> = T extends U ? Then : Else;

// export type IsSuperTypeOf<T, X> = InternalExtends<X, T>;
// export type IsSubTypeOf<T, X> = InternalExtends<T, X>;
export type IsArray<T, Then = true, Else = false> = InternalExtends<T, any[], Then, Else>;
export type IsNumber<T, Then = true, Else = false> = InternalExtends<T, number, Then, Else>;
export type IsString<T, Then = true, Else = false> = InternalExtends<T, string, Then, Else>;
export type IsFunction<T, Then = true, Else = false> =
   // Or<InternalExtends<T, { <R = any>(...args: any[]): R; }>, InternalExtends<T, Function>, Then, Else>;
   InternalExtends<T, { <R = any>(...args: any[]): R; }, Then, Else>;

// export type IsStringFunction<T extends string, Then = true, Else = false> = And<IsString<T>, IsNever<T>, Then, Else>;
// export type IsAny<T, Then = true, Else = false> =
// And<Not<IsArray<T>>, And<Not<IsBoolean<T>>, And<Not<IsNumber<T>>, And<Not<IsString<T>>, And<Not<IsFunction<T>>, And<Not<IsNil<T>>, Not<IsObject<T>>>>>>>, Then, Else>;

export type IsBoolean<T, Then = true, Else = false> = InternalExtends<T, boolean, Then, Else>;
export type IsNull<T, Then = true, Else = false> = InternalExtends<T, null, Then, Else>;
export type IsUndefined<T, Then = true, Else = false> = InternalExtends<T, undefined, Then, Else>;
// export type IsNix<T, Then = true, Else = false> = Or<IsNull<T>, IsUndefined<T>, Then, Else>;
export type IsNix<T, Then = true, Else = false> = IsNull<T, Then, IsUndefined<T, Then, Else>>;
export type IsObject<T, Then = true, Else = false> = InternalExtends<T, object, IsFunction<T, Else, IsArray<T, Else, Then>>, Else>;

/**
 * True iff T is any, otherwise false.
 *
 * This relies on the observation that any "T extends never" is "true" for T=never, "false" for
 * all other T except any, and boolean for T=any.  This is because any is the only type other
 * than never itself to include never, hence the only case for ambiguity (any includes the one
 * value where "any extends never" as well as infinite other types where "any extends never" is
 * false.)  Any is the only type that does not cancel out never in a union with never.
 *
 * So this alias works by testing for an ambiguous result from "T extends never" to detect any.
 */
export type IsAny<T, Then = true, Else = false> = If<InternalExtends<T, never>, Else, Else, Then>;

/**
 * True iff T is never, otherwise false.
 */
export type IsNever<T, Then = true, Else = false> = WeakIf<InternalExtends<[T], [never]>, Then, Else, Then>;

// These require If for the customization of ambiguous resolution, Then for Weak, Else for Strong
export type Extends<T, U, Then = true, Else = false> =
   If<IsAny<T>, IsNever<U, Else, Then>, StrictIf<InternalExtends<T, U>, Then, Else>, Then, Then>;
// If<Or<IsNever<T>, IsAny<U>>, Then, If<InternalExtends<T, U>, Then, IsAny<T, Then, Else>, IsAny<T, Then, Else>, IsAny<T, Then, Else>>, never, If<IsNever<U>, Else, Then, never, Else>>;

export type StronglyExtends<T, U, Then = true, Else = false> =
   StrictIf<InternalExtends<T, U>, Then, Else, Then>;
// If<Or<IsNever<T>, IsAny<U>>, Then, If<InternalExtends<T, U>, Then, Else, Else, Else>, never, If<IsNever<U>, Else, Then, never, Else>>;

/**
 * True iff every value of type U is also a value of type T and vice-versa, otherwise false.
 */
export type IsExactly<T, U, Then = true, Else = false> =
   IsNever<Exclude<U, T> | Exclude<T, U>, Then, Else>;
// IsNeverType<SetXor<U, T>, Then, Else>;
// IsNever<SetXor<U, T>, Then, Else>;
// And<Extends<U, T>, Extends<T, U>, Then, Else>;

export type Intersects<T, U, Then = true, Else = false> =
   Or<IsNever<T>, IsNever<U>, Else, Or<IsAny<T>, IsAny<U>, Then, WeakIf<Or<Extends<T, U>, Extends<U, T>>, Then, Else>>>;
// If<Or<IsAny<T>, IsAny<U>>, Then, If<Or<IsNever<T>, IsNever<U>>, Else, Not<IsNever<Extract<T, U>>>>>;
// Or<IsAny<T>, IsAny<U>, Then, Or<IsNever<T>, IsNever<U>, Else, Not<IsNever<Extract<T, U>>, Then, Else>>>;
// Or<IsAny<T>, IsAny<U>, Then, If<Or<IsNever<T>, IsNever<U>>, Else, Or<Extends<T, U>, Extends<U, T>, Then, Else>, never, Else>>;

export type HasAll<T, U> = StronglyExtends<U, T>;

export type HasAny<T, U> = Intersects<T, U>;
