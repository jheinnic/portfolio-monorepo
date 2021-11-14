import {LengthOf, InsertIndicesFor } from './length';

export type Insert<T extends any[], N extends InsertIndicesFor<T>, S> =
[
   [
      [S]
   ], [
      [S, T[0]],
      [T[0], S]
   ], [
      [S, T[0], T[1]],
      [T[0], S, T[1]],
      [T[0], T[1], S]
   ], [
      [S, T[0], T[1], T[2]],
      [T[0], S, T[1], T[2]],
      [T[0], T[1], S, T[2]],
      [T[0], T[1], T[2], S]
   ], [
      [S, T[0], T[1], T[2], T[3]],
      [T[0], S, T[1], T[2], T[3]],
      [T[0], T[1], S, T[2], T[3]],
      [T[0], T[1], T[2], S, T[3]],
      [T[0], T[1], T[2], T[3], S]
   ], [
      [S, T[0], T[1], T[2], T[3], T[4]],
      [T[0], S, T[1], T[2], T[3], T[4]],
      [T[0], T[1], S, T[2], T[3], T[4]],
      [T[0], T[1], T[2], S, T[3], T[4]],
      [T[0], T[1], T[2], T[3], S, T[4]],
      [T[0], T[1], T[2], T[3], T[4], S]
   ], [
      [S, T[0], T[1], T[2], T[3], T[4], T[5]],
      [T[0], S, T[1], T[2], T[3], T[4], T[5]],
      [T[0], T[1], S, T[2], T[3], T[4], T[5]],
      [T[0], T[1], T[2], S, T[3], T[4], T[5]],
      [T[0], T[1], T[2], T[3], S, T[4], T[5]],
      [T[0], T[1], T[2], T[3], T[4], S, T[5]],
      [T[0], T[1], T[2], T[3], T[4], T[5], S]
   ], [
      [S, T[0], T[1], T[2], T[3], T[4], T[5], T[6]],
      [T[0], S, T[1], T[2], T[3], T[4], T[5], T[6]],
      [T[0], T[1], S, T[2], T[3], T[4], T[5], T[6]],
      [T[0], T[1], T[2], S, T[3], T[4], T[5], T[6]],
      [T[0], T[1], T[2], T[3], S, T[4], T[5], T[6]],
      [T[0], T[1], T[2], T[3], T[4], S, T[5], T[6]],
      [T[0], T[1], T[2], T[3], T[4], T[5], S, T[6]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], S]
   ], [
      [S, T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7]],
      [T[0], S, T[1], T[2], T[3], T[4], T[5], T[6], T[7]],
      [T[0], T[1], S, T[2], T[3], T[4], T[5], T[6], T[7]],
      [T[0], T[1], T[2], S, T[3], T[4], T[5], T[6], T[7]],
      [T[0], T[1], T[2], T[3], S, T[4], T[5], T[6], T[7]],
      [T[0], T[1], T[2], T[3], T[4], S, T[5], T[6], T[7]],
      [T[0], T[1], T[2], T[3], T[4], T[5], S, T[6], T[7]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], S, T[7]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], S]
   ], [
      [S, T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8]],
      [T[0], S, T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8]],
      [T[0], T[1], S, T[2], T[3], T[4], T[5], T[6], T[7], T[8]],
      [T[0], T[1], T[2], S, T[3], T[4], T[5], T[6], T[7], T[8]],
      [T[0], T[1], T[2], T[3], S, T[4], T[5], T[6], T[7], T[8]],
      [T[0], T[1], T[2], T[3], T[4], S, T[5], T[6], T[7], T[8]],
      [T[0], T[1], T[2], T[3], T[4], T[5], S, T[6], T[7], T[8]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], S, T[7], T[8]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], S, T[8]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], S]
   ], [
      [S, T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9]],
      [T[0], S, T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9]],
      [T[0], T[1], S, T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9]],
      [T[0], T[1], T[2], S, T[3], T[4], T[5], T[6], T[7], T[8], T[9]],
      [T[0], T[1], T[2], T[3], S, T[4], T[5], T[6], T[7], T[8], T[9]],
      [T[0], T[1], T[2], T[3], T[4], S, T[5], T[6], T[7], T[8], T[9]],
      [T[0], T[1], T[2], T[3], T[4], T[5], S, T[6], T[7], T[8], T[9]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], S, T[7], T[8], T[9]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[6], S, T[8], T[9]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], S, T[9]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9], S]
   ], [
      [S, T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9], T[10]],
      [T[0], S, T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9], T[10]],
      [T[0], T[1], S, T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9], T[10]],
      [T[0], T[1], T[2], S, T[3], T[4], T[5], T[6], T[7], T[8], T[9], T[10]],
      [T[0], T[1], T[2], T[3], S, T[4], T[5], T[6], T[7], T[8], T[9], T[10]],
      [T[0], T[1], T[2], T[3], T[4], S, T[5], T[6], T[7], T[8], T[9], T[10]],
      [T[0], T[1], T[2], T[3], T[4], T[5], S, T[6], T[7], T[8], T[9], T[10]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], S, T[7], T[8], T[9], T[10]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[6], S, T[8], T[9], T[10]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], S, T[9], T[10]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9], S, T[10]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9], T[10], S]
   ], [
      [S, T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9], T[10], T[11]],
      [T[0], S, T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9], T[10], T[11]],
      [T[0], T[1], S, T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9], T[10], T[11]],
      [T[0], T[1], T[2], S, T[3], T[4], T[5], T[6], T[7], T[8], T[9], T[10], T[11]],
      [T[0], T[1], T[2], T[3], S, T[4], T[5], T[6], T[7], T[8], T[9], T[10], T[11]],
      [T[0], T[1], T[2], T[3], T[4], S, T[5], T[6], T[7], T[8], T[9], T[10], T[11]],
      [T[0], T[1], T[2], T[3], T[4], T[5], S, T[6], T[7], T[8], T[9], T[10], T[11]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], S, T[7], T[8], T[9], T[10], T[11]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[6], S, T[8], T[9], T[10], T[11]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], S, T[9], T[10], T[11]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9], S, T[10], T[11]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9], T[10], S, T[11]],
      [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9], T[10], T[11], S]
   ]
][LengthOf<T>][N];

export type Prepend<T extends any[], S> =
    0 extends InsertIndicesFor<T> ? Insert<T, 0, S> : never;

export type Append<T extends any[], S> =
    LengthOf<T> extends InsertIndicesFor<T>
        ? Insert<T, LengthOf<T>, S> : never;