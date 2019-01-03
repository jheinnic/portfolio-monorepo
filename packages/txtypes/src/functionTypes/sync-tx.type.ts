export type SyncTx<I extends any[], O> = O extends Promise<infer P>
   ? (...input: I) => P
   : (...input: I) => O;
