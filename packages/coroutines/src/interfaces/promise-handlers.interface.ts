export interface PromiseHandlers<Msg> {
   resolve(msg: Msg): void;
   reject(err: any): void;
}
