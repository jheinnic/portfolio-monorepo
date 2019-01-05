import {IfStrictlyExtends} from './inheritance';

export interface Setter<P extends any[] = any[]> extends Function {
   (...args: P): void;
}

export type SetterParamTypes<S extends Setter> =
   S extends (...args: infer P) => void ? P : never;

export type IfSetter<T, P = T, N = never> = IfStrictlyExtends<Setter, T, P, N>
