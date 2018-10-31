export interface MessageForAck<P extends any> {
   args: P;
   resolve: () => void;
   reject: (err: any) => void;
}