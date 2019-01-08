import { IsExactType } from 'conditional-type-checks';

export type IfFunctionType<T, Positive = T, Negative = never> =
   IsExactType<T, (...args: any[]) => any> extends true ? Positive : Negative;

export type IfValueType<T, Positive = T, Negative = never> =
   IfFunctionType<T, Negative, Positive>;
