import {AsyncTx} from './async-tx.type';

export type SeededAsyncRepeat<S> = AsyncTx<[S], S|false>;

