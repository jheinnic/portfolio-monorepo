import { interfaces } from 'inversify';
export declare type ContextTransformer<T> = (context: interfaces.Context) => T;
export declare type IsContextTransformer<T> = T extends ContextTransformer<T> ? T : never;
