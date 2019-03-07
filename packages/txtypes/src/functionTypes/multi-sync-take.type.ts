export type MultiSyncTake<Params extends any[]> =
   (...input: Params) => void|Promise<void>;
