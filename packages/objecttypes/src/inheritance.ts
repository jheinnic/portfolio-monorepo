// Conditional on Inheritance
/**
 * If T extends B, then the use the positive match type, P, otherwise the negative match type, N.
 *
 * Only T and B are required.  By default, P is T and N is never.  The default allow this type to be
 * used with just T and B to express "T if T extends B".
 */
export type IfExtends<T, B, P = T, N = never> = T extends B ? P : N;

/**
 * If T extends B, then the use the positive match type, P, otherwise the negative match type, N.
 *
 * Only T and B are required.  By default, P is T and N is never.  The default allow this type to be
 * used with just T and B to express "T if T extends B".
 */
export type IfNotExtends<T, B, P = T, N = never> = T extends B ? N : P;

// Conditional on Inheritance, excluding any/never extremes
export type IfStrictlyExtends<T, B, P = T, N = never> = IfExtends<T, Exclude<IfExtends<T, B>, IfNotExtends<T, B>>, P, N>;
export type IfStrictlyNotExtends<T, B, P = T, N = never> = IfExtends<T, Exclude<IfNotExtends<T, B>, IfExtends<T, B>>, P, N>;

