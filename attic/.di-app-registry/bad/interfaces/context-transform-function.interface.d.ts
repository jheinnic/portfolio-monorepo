import { interfaces } from 'inversify';
export declare type IContainerAccessStrategy<T> = (context: interfaces.Container) => T;
export declare type IsContainerAccessStrategy<T> = T extends IContainerAccessStrategy<T> ? T : never;
