import {IfStrictlyExtends, IfStrictlyNotExtends} from './inheritance';

export type IfValueType<T, P = T, N = never> = IfStrictlyNotExtends<T, Function, P, N>
export type IfFunctionType<T, P = T, N = never> = IfStrictlyExtends<T, Function, P, N>

