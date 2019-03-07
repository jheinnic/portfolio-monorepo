import { AsyncTx, AsyncTake, SyncTx, SyncTake, MultiSyncTx, MultiSyncTake } from '@jchptf/txtypes';
import {
   sumTx, twiddle, asyncSumTx, asyncTwiddle, multiSyncSumTx, multiSyncTwiddle
} from './fixtures';

// $ExpectType (_a: number, _b: number) => number
export type Test001 = typeof sumTx;

// $ExpectType (_a: number, _b: number) => void
export type Test002 = typeof twiddle;

// $ExpectType (_a: number, _b: number) => Promise<number>
export type Test003 = typeof asyncSumTx;

// $ExpectType (_a: number, _b: number) => Promise<void>
export type Test004 = typeof asyncTwiddle;

// $ExpectType (_a: number, _b: number) => number
export const Test005 = sumTx;

// $ExpectType (_a: number, _b: number) => number
export const Test006: SyncTx<[number, number], number> = sumTx;

// $ExpectType (_a: number, _b: number) => number
export const Test007: SyncTx<[number, number], number> = Test005;

// $ExpectType (_a: number, _b: number) => void
export const Test008 = twiddle;

// $ExpectType (_a: number, _b: number) => void
export const Test009: SyncTake<[number, number]> = twiddle;

// $ExpectType (_a: number, _b: number) => void
export const Test010: SyncTake<[number, number]> = Test008;

// $ExpectType (_a: number, _b: number) => Promise<number>
export const Test011 = asyncSumTx;

// $ExpectType (_a: number, _b: number) => Promise<number>
export const Test012: AsyncTx<[number, number], number> = asyncSumTx;

// $ExpectType (_a: number, _b: number) => Promise<number>
export const Test013: AsyncTx<[number, number], number> = Test011;

// $ExpectType (_a: number, _b: number) => Promise<void>
export const Test014 = asyncTwiddle;

// $ExpectType (_a: number, _b: number) => Promise<void>
export const Test015: AsyncTake<[number, number]> = asyncTwiddle;

// $ExpectType (_a: number, _b: number) => Promise<void>
export const Test016: AsyncTake<[number, number]> = Test014;

// $ExpectType (_a: number, _b: number) => number | Promise<number>
export type Test017 = typeof multiSyncSumTx;

// $ExpectType (_a: number, _b: number) => void | Promise<void>
export type Test018 = typeof multiSyncTwiddle;

// $ExpectType (_a: number, _b: number) => number | Promise<number>
export const Test019 = multiSyncSumTx;

// $ExpectType (_a: number, _b: number) => number | Promise<number>
export const Test020: MultiSyncTx<[number, number], number> = multiSyncSumTx;

// $ExpectType (_a: number, _b: number) => number | Promise<number>
export const Test021: MultiSyncTx<[number, number], number> = Test019;

// $ExpectType (_a: number, _b: number) => void | Promise<void>
export const Test022 = multiSyncTwiddle;

// $ExpectType (_a: number, _b: number) => void | Promise<void>
export const Test023: MultiSyncTake<[number, number]> = multiSyncTwiddle;

// $ExpectType (_a: number, _b: number) => void | Promise<void>
export const Test024: MultiSyncTake<[number, number]> = Test022;
