export interface CallForReply<R> {
   resolve: (value: R) => void;
   reject: (err: any) => void;
}