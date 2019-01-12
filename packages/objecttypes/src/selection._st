// Conditional on Inheritance
import {
   IsNixable, IsNullable, IsUndefinable, Extends, Intersects, StronglyExtends, IsExactly
} from './classification';
import { If, Not } from './boolean';

/**
 * True iff every value of type U is also a value of type T and vice-versa, otherwise false.
 */
export type IfIsExactly<T, U, Then = T, Else = never> = If<IsExactly<T, U>, Then, Else>;

/**
 * If T extends B, then the use the positive match type, P, otherwise the negative match type, N.
 *
 * Only T and B are required.  By default, P is T and N is never.  The default allow this type to be
 * used with just T and B to express "T if T extends B".
 */
export type IfExcludes<T, U, Then = T, Else = never> = If<Not<Intersects<T, U>>, Then, Else>;

/**
 * Iff type T has at least one value of type B, then use Then type, otherwise use Else type.
 *
 * Only T and B are required.  By default, Then is T and Else is never.  Defaults allow this
 * type to serve as shorthand for If<Extends<T, B>, T, never>.
 */
export type IfIntersects<T, U, Then = T, Else = never> = If<Intersects<T, U>, Then, Else>;

/**
 * If T extends B, then the use the positive match type, P, otherwise the negative match type, N.
 *
 * Only T and B are required.  By default, P is T and N is never.  The default allow this type to be
 * used with just T and B to express "T if T extends B".
 */
export type IfExtends<T, U, Then = T, Else = never> = If<Extends<T, U>, Then, Else>;

/**
 * If T extends B, then the use the positive match type, P, otherwise the negative match type, N.
 *
 * Only T and B are required.  By default, P is T and N is never.  The default allow this type to be
 * used with just T and B to express "T if T extends B".
 */
export type IfNotExtends<T, B, Then = T, Else = never> = If<Not<Extends<T, B>>, Then, Else>;

/**
 * Similar to IfExtends, but refuses to match under two where IfExtends does scenarios:
 * -- If T is any unless U is also any.
 * -- If U is never, unless T is also never.
 */
export type IfStronglyExtends<T, U, Then, Else> = If<StronglyExtends<T, U>, Then, Else>;

export type IfNotStronglyExtends<T, U, Then, Else> = If<Not<StronglyExtends<T, U>>, Then, Else>;

/**
 * If T extends B, then the use the positive match type, P, otherwise the negative match type, N.
 *
 * Only T and B are required.  By default, P is T and N is never.  The default allow this type to be
 * used with just T and B to express "T if T extends B".
 */
export type IfExtendedBy<T, U, Then = T, Else = never> = If<Extends<U, T>, Then, Else>;

/**
 * If T extends B, then the use the positive match type, P, otherwise the negative match type, N.
 *
 * Only T and B are required.  By default, P is T and N is never.  The default allow this type to be
 * used with just T and B to express "T if T extends B".
 */
export type IfNotExtendedBy<T, U, Then = T, Else = never> = If<Not<Extends<U, T>>, Then, Else>;

export type IfStronglyExtendedBy<T, U, Then, Else> = If<StronglyExtends<U, T>, Then, Else>;

export type IfNotStronglyExtendedBy<T, U, Then, Else> = If<Not<StronglyExtends<U, T>>, Then, Else>;

/**
 * If null is a possible value of type T, use Then, otherwise use Else.  By default, Then is T, allowing
 * IfNullable<T> to serve as shorthand for If<IsNullable<T>, T, never>
 */
export type IfNullable<T, Then = T, Else = never> = If<IsNullable<T>, Then, Else>;

/**
 * If undefined is a possible value of type T, use Then, otherwise use Else.  By default, Then is T,
 * allowing IfNullable<T> to serve as shorthand for If<IsNullable<T>, T, never>
 */
export type IfUndefinable<T, Then = T, Else = never> = If<IsUndefinable<T>, Then, Else>;

/**
 * If undefined and null are both possible values of type T, use Then, otherwise use Else.  By default,
 * Then is T, allowing IfNullable<T> to serve as shorthand for If<IsNullable<T>, T, never>.
 */
export type IfNixable<T, Then = T, Else = never> = If<IsNixable<T>, Then, Else>;
