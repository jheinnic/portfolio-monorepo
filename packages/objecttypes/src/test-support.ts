import { TrueOrFalse } from './boolean';

/**
 * Always implements a no-op, and will not compile unless the boolean argument matches the boolean state
 * of the assert condition.
 *
 * If T is either true or false, then expectTrue must match as either true or false.
 *
 * If T is boolean, a.k.a (true | false), then expectTrue must be undefined.
 *
 * If T is paradoxical, a.k.a (true & false), then expectTrue must also be paradoxical, a.k.a. (never).
 *
 * @param _expectTrue true, false, undefined, or never, as prescribed by T, otherwise compilation fails,
 *                    effectively a compile-time assert clause.
 */
export function assert<T extends boolean>(_expectTrue: TrueOrFalse<T>): void { }

/**
 * Always of type never, and will not compile if the asserted generic does not resolve to true.
 */
export type AssertTrue<_T extends true> = never;

/**
 * Always of type never, and will not compile if the asserted generic does not resolve to false.
 */
export type AssertFalse<_T extends false> = never;
