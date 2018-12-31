import {IResourceAdapter} from './resource-adapter.interface';
import {Chan} from 'medium';
import {IWatch} from '@jchptf/api';
import {PoolSizes} from './pool-sizes.interface';

export interface IResourceSemaphore<T extends object> extends IWatch<PoolSizes> {
   readonly name: string;

   borrowResource( callback: (param: T) => void): void;

   getReservationChan(): Chan<IResourceAdapter<T>, T>;

   getReturnChan(): Chan<T, IResourceAdapter<T>>;
}