import {IfStrictlyExtends} from './inheritance';

export interface Getter<T = any> extends Function {
   (): T;
}

export type GetterReturnType<G extends Getter> = ReturnType<G>;

export type IfGetter<T extends Function, P = T, N = never> = IfStrictlyExtends<Getter, T, P, N>
