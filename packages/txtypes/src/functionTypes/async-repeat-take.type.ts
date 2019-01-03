import {AsyncTx} from './async-tx.type';

export type AsyncRepeatTake<I> = AsyncTx<[I], void|false>;
