import {IResourceAdapter} from './resource-adapter.interface';
import {Chan} from 'medium';

export interface IResourceSemaphore<T extends object> {
   readonly name: string;

   borrowResource( callback: (param: T) => void): void;

   getReservationChan(): Chan<IResourceAdapter<T>, T>;

   getReturnChan(): Chan<T, IResourceAdapter<T>>;
}