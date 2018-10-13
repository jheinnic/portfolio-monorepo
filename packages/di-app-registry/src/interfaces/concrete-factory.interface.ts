import {interfaces} from 'inversify';
import Factory = interfaces.Factory;

export interface ConcreteFactory<T, P extends any[] = any[]> extends Factory<T> {
   (...args: P): T;
}

export type IfConcreteFactory<F extends Function, T, P extends any[] = any[]> =
   F extends ConcreteFactory<T, P> ? F : never;

