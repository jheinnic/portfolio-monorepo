// Conditional on Inheritance
import {
   FunctionProperties, GetterProperties, OptionsBag, ReadableProperties, SetterProperties, ValueProperties
} from './partitions';
import {IfStrictlyExtends} from './inheritance';

/ Conditional on all properties matching a partitioning shape (see partitions.ts)
export type IfValueProperties<T> = IfStrictlyExtends<ValueProperties<T>, T>
export type IfFunctionProperties<T> = IfStrictlyExtends<FunctionProperties<T>, T>
export type IfGetterProperties<T> = IfStrictlyExtends<GetterProperties<T>, T>
export type IfSetterProperties<T> = IfStrictlyExtends<SetterProperties<T>, T>

export type IfReadable<T> = IfStrictlyExtends<ReadableProperties<T>, T>;
export type IfOptionsBag<T> = IfStrictlyExtends<OptionsBag<T>, T>;
// export type IsValueProperties<T> = IfExtends<T, OnlyValueProperties<T>>
// export type HasNoFunctions<T> = IsValueProperties<T>;

