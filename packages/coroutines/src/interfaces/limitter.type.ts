import {WrappableCoRoutineGenerator, WrappedCoRoutineGenerator} from 'co';

export interface Limiter {
   <F extends WrappableCoRoutineGenerator<R, P> = WrappableCoRoutineGenerator<R, P>,
    R extends any = any,
    P extends any[] = any[]>
   (coWrappable: F, priority?: number): WrappedCoRoutineGenerator<F, R, P>
}