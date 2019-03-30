import { Inject, Injectable } from '@nestjs/common';

import { CONCURRENT_WORK_FACTORY_PROVIDER_TOKEN, IConcurrentWorkFactory } from '@jchptf/coroutines';
import { ResourceSemaphore } from './resource-semaphore.class';
import { IResourceSemaphore, IResourceSemaphoreFactory } from './interfaces';

@Injectable()
export class ResourceSemaphoreFactory implements IResourceSemaphoreFactory
{
   constructor(
      @Inject(CONCURRENT_WORK_FACTORY_PROVIDER_TOKEN) private readonly concurrentWorkFactory: IConcurrentWorkFactory)
   { }

   async createSemaphore<T extends object>(resourcePool: Iterable<T>|AsyncIterable<T>):
      Promise<IResourceSemaphore<T>>
   {
      const resources: T[] = [];
      let nextResource: T;
      for await (nextResource of resourcePool) {
         resources.push(nextResource);
      }

      return new ResourceSemaphore<T>(resources, this.concurrentWorkFactory);
   }
}