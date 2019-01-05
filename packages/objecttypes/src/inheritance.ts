// Conditional on Inheritance
import {
   FunctionProperties, GetterProperties, OptionsBag, ReadableProperties, SetterProperties, ValueProperties
} from './partitions';

export type IfExtends<T, B> = T extends B ? T : never;
export type IfNotExtends<T, B> = T extends B ? never : T;

// Conditional on Inheritance, excluding any/never extremes
export type IfStrictlyExtends<T, B> = Exclude<IfExtends<T, B>, IfNotExtends<T, B>>;
export type IfStrictlyNotExtends<T, B> = Exclude<IfNotExtends<T, B>, IfExtends<T, B>>;

/ Conditional on all properties matching a partitioning shape (see partitions.ts)
export type IfValueProperties<T> = IfStrictlyExtends<ValueProperties<T>, T>
export type IfFunctionProperties<T> = IfStrictlyExtends<FunctionProperties<T>, T>
export type IfGetterProperties<T> = IfStrictlyExtends<GetterProperties<T>, T>
export type IfSetterProperties<T> = IfStrictlyExtends<SetterProperties<T>, T>

export type IfReadable<T> = IfStrictlyExtends<ReadableProperties<T>, T>;
export type IfOptionsBag<T> = IfStrictlyExtends<OptionsBag<T>, T>;
// export type IsValueProperties<T> = IfExtends<T, OnlyValueProperties<T>>
// export type HasNoFunctions<T> = IsValueProperties<T>;

