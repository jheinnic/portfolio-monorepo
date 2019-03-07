import { IndexTypeFor, LengthOf } from './length';
import { Next } from './math';
import { LastOf, NthOf } from './nth';

type _Replace<T extends any[], M extends number, N extends number, S> =
[
   [
   ], [
      [S]
   ], [
      [S, T[1]],
      [T[0], S]
   ], [
      [S, T[1], T[2]],
      [T[0], S, T[2]],
      [T[0], T[1], S]
   ], [
      [S, T[1], T[2], T[3]],
      [T[0], S, T[2], T[3]],
      [T[0], T[1], S, T[3]],
      [T[0], T[1], T[2], S]
   ], [
      [S, T[1], T[2], T[3], T[4]],
      [T[0], S, T[2], T[3], T[4]],
      [T[0], T[1], S, T[3], T[4]],
      [T[0], T[1], T[2], S, T[4]],
      [T[0], T[1], T[2], T[3], S]
   ], [
      [S, T[1], T[2], T[3], T[4], T[5]],
      [T[0], S, T[2], T[3], T[4], T[5]],
      [T[0], T[1], S, T[3], T[4], T[5]],
      [T[0], T[1], T[2], S, T[4], T[5]],
      [T[0], T[1], T[2], T[3], S, T[5]],
      [T[0], T[1], T[2], T[3], T[4], S]
   ], [
      [S, T[1], T[2], T[3], T[4], T[5], T[6]],
      [T[0], S, T[2], T[3], T[4], T[5], T[6]],
      [T[0], T[1], S, T[3], T[4], T[5], T[6]],
      [T[0], T[1], T[2], S, T[4], T[5], T[6]],
      [T[0], T[1], T[2], T[3], S, T[5], T[6]],
      [T[0], T[1], T[2], T[3], T[4], S, T[6]],
      [T[0], T[1], T[2], T[3], T[4], T[5], S]
   ], [
      [S, T[1], T[2], T[3], T[4], T[5], T[6], T[7]],
      [T[0], S, T[2], T[3], T[4], T[5], T[6], T[7]],
      [T[0], T[1], S, T[3], T[4], T[5], T[6], T[7]],
      [T[0], T[1], T[2], S, T[4], T[5], T[6], T[7]],
      [T[0], T[1], T[2], T[3], S, T[5], T[6], T[7]],
      [T[0], T[1], T[2], T[3], T[4], S, T[6], T[7]],
      [T[0], T[1], T[2], T[3], T[4], T[5], S, T[7]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], S]
   ], [
      [S, T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8]],
      [T[0], S, T[2], T[3], T[4], T[5], T[6], T[7], T[8]],
      [T[0], T[1], S, T[3], T[4], T[5], T[6], T[7], T[8]],
      [T[0], T[1], T[2], S, T[4], T[5], T[6], T[7], T[8]],
      [T[0], T[1], T[2], T[3], S, T[5], T[6], T[7], T[8]],
      [T[0], T[1], T[2], T[3], T[4], S, T[6], T[7], T[8]],
      [T[0], T[1], T[2], T[3], T[4], T[5], S, T[7], T[8]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], S, T[8]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], S]
   ], [
      [S, T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9]],
      [T[0], S, T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9]],
      [T[0], T[1], S, T[3], T[4], T[5], T[6], T[7], T[8], T[9]],
      [T[0], T[1], T[2], S, T[4], T[5], T[6], T[7], T[8], T[9]],
      [T[0], T[1], T[2], T[3], S, T[5], T[6], T[7], T[8], T[9]],
      [T[0], T[1], T[2], T[3], T[4], S, T[6], T[7], T[8], T[9]],
      [T[0], T[1], T[2], T[3], T[4], T[5], S, T[7], T[8], T[9]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], S, T[8], T[9]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], S, T[9]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], S]
   ], [
      [S, T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9], T[10]],
      [T[0], S, T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9], T[10]],
      [T[0], T[1], S, T[3], T[4], T[5], T[6], T[7], T[8], T[9], T[10]],
      [T[0], T[1], T[2], S, T[4], T[5], T[6], T[7], T[8], T[9], T[10]],
      [T[0], T[1], T[2], T[3], S, T[5], T[6], T[7], T[8], T[9], T[10]],
      [T[0], T[1], T[2], T[3], T[4], S, T[6], T[7], T[8], T[9], T[10]],
      [T[0], T[1], T[2], T[3], T[4], T[5], S, T[7], T[8], T[9], T[10]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], S, T[8], T[9], T[10]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], S, T[9], T[10]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], S, T[10]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9], S]
   ]
][M][N];

export type Replace<T extends any[], N extends IndexTypeFor<T>, S> =
   _Replace<T, LengthOf<T>, N, S>
export type Append<T extends any[], S> =
   _Replace<T, Next<LengthOf<T>>, LengthOf<T>, S>

type _Unshift<T extends any[], U extends any[], N extends number, S> =
   LengthOf<U> extends N
      ? LengthOf<U> extends LengthOf<T>
         ? Append<U, S>
         : _UnshiftTwo<T, Append<U, S>, N, S>
      : LengthOf<U> extends LengthOf<T>
         ? "a"
         : _Unshift<T, Append<U, NthOf<T, LengthOf<U>>>, N, S>

type _UnshiftTwo<T extends any[], U extends any[]> =
   LengthOf<U> extends LengthOf<T>
      ? Append<U, LastOf<T>>
      : _UnshiftTwo<T, Append<U, LastOf<T>>>;

type Unshift<T extends any[]> =
   LengthOf<T>
