export interface MessageForReply<P extends any, R extends any> {
   args: P;
   resolve: (value: R) => void;
   reject: (err: any) => void;
}