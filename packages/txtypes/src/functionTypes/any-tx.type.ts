export type AnyTx<I extends any[], O> = O extends Promise<infer P>
   ? (...input: I) => P|O
   : (...input: I) => O|Promise<O>;
