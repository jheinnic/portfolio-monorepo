export type AsyncTx<Params extends any[], Output> =
   (...input: Params) => Promise<Output>;
