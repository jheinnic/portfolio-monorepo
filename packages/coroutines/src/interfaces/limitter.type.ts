import {WrappableCoRoutineGenerator, WrappedCoRoutine} from 'co';

export interface Limiter<F extends WrappableCoRoutineGenerator = WrappableCoRoutineGenerator, R = any>{
   (coWrappable: F, priority: number): WrappedCoRoutine<F, R>
}