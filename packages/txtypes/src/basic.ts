export type Proc<Params extends any[] = any[]> =
   (...input: Params) => void;

export type NoArgsProc =
   () => void;

export type Func<Params extends any[] = any[], Output = any> =
   (...input: Params) => Output;

export type AnyFunc<Output = any> =
   (...input: any[]) => Output;

export type NoArgsFunc<Output = any> =
   () => Output;

export type Chain<Params extends any[] = any[], Output extends any[] = any[]> =
   (...input: Params) => Output;

export type AnyChain<Output extends any[] = any[]> =
   (...input: any[]) => Output;

export type NoArgsChain<Output extends any[] = any[]> =
   () => Output;
