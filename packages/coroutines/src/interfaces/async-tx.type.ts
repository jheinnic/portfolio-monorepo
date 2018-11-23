export type AsyncTx<I, O> = (input: I) => O|Promise<O>;

export type AsyncRepeat = () => Promise<void|false>;

export type SeededAsyncRepeat<S> = (seed: S) => Promise<S|false>;

export type AsyncRepeatTake<I> = (input: I) => Promise<void|false>;

export type SeededAsyncRepeatTake<I, S> = (input: I, seed: S) => Promise<S|false>;
