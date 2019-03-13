export type AsyncProc<Params extends any[] = any[]> =
   (...input: Params) => Promise<void>;

export type NoArgsAsyncProc =
   () => Promise<void>;

export type AsyncFunc<Params extends any[] = any[], Output = any> =
   (...input: Params) => Promise<Output>;

export type AnyAsyncFunc<Output = any> =
   (...input: any[]) => Promise<Output>;

export type NoArgsAsyncFunc<Output = any> =
   () => Promise<Output>;

export type AsyncChain<Params extends any[] = any[], Output extends any[] = any[]> =
   (...input: Params) => Promise<Output>;

export type AnyAsyncChain<Output extends any[] = any[]> =
   (...input: any[]) => Promise<Output>;

export type NoArgsAsyncChain<Output extends any[] = any[]> =
   () => Promise<Output>;
