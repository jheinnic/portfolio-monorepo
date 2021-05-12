export interface IPromiseHandlers<Msg> {
   resolve(msg: Msg): void;
   reject(err: any): void;
}


export function foo(arg: unknown) {
   if ( arg === arg ) {
      console.log('Equal');
   } else {
      console.log('Inequal');
   }
}