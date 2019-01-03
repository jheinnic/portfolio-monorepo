import {AsyncTx} from './async-tx.type';

export type SeededAsyncRepeatTake<I, S> = AsyncTx<[I, S], S|false>;
