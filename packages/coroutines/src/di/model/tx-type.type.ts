export type TxType<T extends any[]> = T extends [any, any] ? T : never;
