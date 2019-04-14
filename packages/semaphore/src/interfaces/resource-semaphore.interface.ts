import { Chan } from 'medium';

import { IWatch } from '@jchptf/api';

import { PoolSizes } from './pool-sizes.interface';
import { IResourceAdapter } from './resource-adapter.interface';

export interface IResourceSemaphore<T> extends IWatch<PoolSizes>
{
   borrowResource<R = void>(callback: (param: T) => R | Promise<R>): Promise<R>;

   getReservationChan(): Chan<IResourceAdapter<T>, T>;

   getReturnChan(): Chan<T, IResourceAdapter<T>>;
}
