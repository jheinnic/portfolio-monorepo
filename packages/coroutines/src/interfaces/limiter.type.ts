export interface ILimiter {
   (
      asyncFunction: (...args: any[]) => Promise<any>, priority?: number
   ): typeof asyncFunction
}