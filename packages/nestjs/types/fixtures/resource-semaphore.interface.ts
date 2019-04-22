import { IResourceAdapter } from './resource-adapter.interface';

export interface IPair<A, B = A> {
   one: A;
   two: B;
}

export interface IResourceSemaphore<T>
{
   borrowResource<R = void>(callback: (param: T) => R | Promise<R>): Promise<R>;

   getReservationChan(): IPair<IResourceAdapter<T>, T>;

   getReturnChan(): IPair<T, IResourceAdapter<T>>;
}
