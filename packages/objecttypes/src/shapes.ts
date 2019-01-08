// Conditional on Inheritance
import {
   FunctionProperties, GetterProperties, OptionsBag, ReadableProperties, SetterProperties, ValueProperties
} from './partitions';
import { IsExactType } from 'conditional-type-checks';
/**
 * Conditional type that passes through its generic type if and only if
 * none of its properties have a function type.
 */
export type IfValueProperties<T, P = T, N = never> =
   IsExactType<ValueProperties<T>, T> extends true ? P : N;

/**
 * Conditional type that passes through its generic type if and only if
 * all its properties have a function type.
 */
export type IfFunctionProperties<T, P = T, N = never> =
   IsExactType<FunctionProperties<T>, T> extends true ? P : N;

/**
 * Conditional type that passes through its generic type if and only if
 * all its properties are getters.
 */
export type IfGetterProperties<T, P = T, N = never> =
   IsExactType<GetterProperties<T>, T> extends true ? P : N;

/**
 * Conditional type that passes through its generic type if and only if
 * all its properties are setters.
 */
export type IfSetterProperties<T, P = T, N = never> =
   IsExactType<SetterProperties<T>, T> extends true ? P : N;

/**
 * Conditional type that passes through its generic type if and only if
 * all its properties are values or getters.
 */
export type IfReadable<T, P = T, N = never> =
   IsExactType<ReadableProperties<T>, T> extends true ? P : N;

/**
 * Conditional type that passes through its generic type if and only if
 * all its properties are values, getters, or setters.
 */
export type IfOptionsBag<T, P = T, N = never> =
   IsExactType<OptionsBag<T>, T> extends true ? P : N;

// export type IsValueProperties<T> = IfExtends<T, OnlyValueProperties<T>>
// export type HasNoFunctions<T> = IsValueProperties<T>;
