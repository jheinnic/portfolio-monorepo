export interface Limiter {
   (
      asyncFunction: (...args: any[]) => Promise<any>, priority?: number
   ): typeof asyncFunction
}