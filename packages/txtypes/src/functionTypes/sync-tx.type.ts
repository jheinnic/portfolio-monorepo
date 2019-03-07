export type SyncTx<Params extends any[], Output> =
   Output extends Promise<any> ? never : (...input: Params) => Output;
