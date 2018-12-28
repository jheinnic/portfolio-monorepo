import {WrappableCoRoutineGenerator, WrappedCoRoutineGenerator} from 'co';

export interface Limiter {
   <R extends any = any, P extends any[] = any[]> (
      coWrappable: WrappableCoRoutineGenerator<R, P>, priority?: number
   ): WrappedCoRoutineGenerator<R, P>
}