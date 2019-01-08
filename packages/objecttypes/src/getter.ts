import { IsExactType } from 'conditional-type-checks';

export interface IGetter<T = any> extends Function
{
   (): T;
}

export type GetterReturnType<G extends IGetter> = ReturnType<G>;

// export type IfGetter<T, P = T, N = never> = IfStrictlyExtends<IGetter, T, P, N>;
export type IfGetter<T, P = T, N = never> = IsExactType<IGetter, T> extends true ? P : N;
