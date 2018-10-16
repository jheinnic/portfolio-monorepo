import {interfaces} from 'inversify';

export type IContainerAccessStrategy<T> = (context: interfaces.Container) => T;

export type IsContainerAccessStrategy<T> =
   T extends IContainerAccessStrategy<T> ? T : never;
