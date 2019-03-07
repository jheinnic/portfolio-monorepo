export type MultiSyncTx<Params extends any[], Output> =
   Output extends Promise<infer P>
      ? (...input: Params) => P|Output
      : (...input: Params) => Output|Promise<Output>;
