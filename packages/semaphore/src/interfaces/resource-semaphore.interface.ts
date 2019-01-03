import {Chan} from 'medium';

import {IWatch} from '@jchptf/api';

import {PoolSizes} from './pool-sizes.interface';
import {IResourceAdapter} from './resource-adapter.interface';

export interface IResourceSemaphore<T extends object> extends IWatch<PoolSizes> {
   readonly name: string;

   borrowResource<R = void>( callback: (param: T) => R | Promise<R>): Promise<R>;

   getReservationChan(): Chan<IResourceAdapter<T>, T>;

   getReturnChan(): Chan<T, IResourceAdapter<T>>;
}