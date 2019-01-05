/**
 * Type for objects that must not define any properties whatsoever.
 */
import {AnyFunc} from 'simplytyped';

export type BlankObject = Object & object;

// Typeof Type
export type TypeName<T> =
   T extends string ? 'string' : T extends number
      ? 'number' : T extends boolean
         ? 'boolean' : T extends undefined
            ? 'undefined' : T extends Function
               ? 'function' : 'object';

/**
 * Isomorphic variant that turns all value properties to fluent methods
 * that return Fluently<T>, and changes the return type of all other
 * function properties to Fluently<T>, but leaves their input parameters
 * otherwise intact.
 */
export type Fluently<T> = {
   [K in keyof T]: T[K] extends AnyFunc
      ? (...args: Parameters<T[K]>) => Fluently<T>
      : (arg: T[K]) => Fluently<T>;
};