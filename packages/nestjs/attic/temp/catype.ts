export const aKey = Symbol('aKey');

declare module './global' {
   export interface IGlobal {
      [aKey]: number;
   }
}
