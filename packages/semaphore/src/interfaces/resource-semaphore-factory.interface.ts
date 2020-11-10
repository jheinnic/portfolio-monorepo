import { IResourceSemaphore } from './resource-semaphore.interface';

export interface IResourceSemaphoreFactory
{
   createSemaphore<T extends object>(
      resourcePool: Iterable<T>|AsyncIterable<T>): Promise<IResourceSemaphore<T>>;
}
