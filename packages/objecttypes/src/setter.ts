// import { IfStrictlyExtends } from './inheritance';

import { IsExactType } from 'conditional-type-checks';

export interface ISetter<P extends any[] = any[]> extends Function
{
   (...args: P): void;
}

export type SetterParamTypes<S extends ISetter> =
   S extends (...args: infer P) => void ? P : never;

// export type IfSetter<T, P = T, N = never> = IfStrictlyExtends<ISetter, T, P, N>;
export type IfSetter<T, P = T, N = never> = IsExactType<ISetter, T> extends true ? P : N;
