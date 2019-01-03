export type AsyncTx<I extends any[], O> = O extends Promise<any>
   ? (...input: I) => O
   : (...input: I) => Promise<O>;
