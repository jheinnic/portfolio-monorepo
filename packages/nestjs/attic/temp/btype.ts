export const bKey = Symbol('bKey');

declare module './global' {
   export interface IGlobal {
      [bKey]: number;
   }
}
