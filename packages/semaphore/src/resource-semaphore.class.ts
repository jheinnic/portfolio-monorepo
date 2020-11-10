import { Chan, CLOSED, go, put, take } from 'medium';
import { map as txMap } from 'transducers-js';

import { IWatch, iWatch, Watch } from '@jchptf/api';
import { ChanBufferType, IConcurrentWorkFactory } from '@jchptf/coroutines';
import { GET_LEASE_MANAGER } from './resource-semaphore.constants';
import { ResourceAdapter } from './resource-adapter.class';
import { IResourceAdapter, IResourceSemaphore, IManagedResource } from './interfaces';

interface PoolSizes
{
   readonly totalCount: number;
   readonly ready: number;
   readonly inUse: number;
   readonly recycling: number;
}

@iWatch<IWatch<PoolSizes>>()
export class ResourceSemaphore<T extends object> implements IResourceSemaphore<T>
{
   private channelOpen: boolean = true;

   private resources: Array<IResourceAdapter<T>>;

   private recycledResources: Chan<T, IResourceAdapter<T>>;

   private resourceRequests: Chan<IResourceAdapter<T>, T>;

   private poolSizes: PoolSizes = {
      totalCount: 0,
      ready: 0,
      inUse: 0,
      recycling: 0,
   };

   constructor(
      unwrappedResources: Array<T>,
      private readonly concurrentWorkFactory: IConcurrentWorkFactory)
   {
      const resourceCount = unwrappedResources.length;
      this.resources = unwrappedResources.map((item: T) => {
         return new ResourceAdapter<T>(this, item);
      });

      this.recycledResources =
         this.concurrentWorkFactory.createTxChan(
            txMap((resource: T): IResourceAdapter<T> => {
               if (this.isOwnedResource(resource)) {
                  const retVal: IResourceAdapter<T> = resource[GET_LEASE_MANAGER];
                  if (retVal.recycle()) {
                     this.notifyRecycled(retVal.wetArtifact);
                  } else {
                     this.notifyReturned(retVal.wetArtifact);
                  }

                  return retVal;
               }

               throw new Error(`Cannot recycle ${resource}.  It has not been registered as a dynamic resource accessor yet.`);
            }),
            resourceCount, ChanBufferType.fixed).unwrap();

      this.resourceRequests =
         this.concurrentWorkFactory.createTxChan(
            txMap((leaseMgr: IResourceAdapter<T>): T => {
               return leaseMgr.publish();
            }),
            resourceCount, ChanBufferType.fixed).unwrap();

      this.poolSizes = {
         totalCount: resourceCount,
         ready: 0,
         inUse: 0,
         recycling: resourceCount,
      };

      let ii;
      for (ii = 0; ii < resourceCount; ii++) {
         put(this.recycledResources, this.resources[ii].publish());
      }
      for (ii = 0; ii < resourceCount; ii++) {
         const managerId = ii;
         go(this.scanForRequests.bind(this))
            .then(() => {
               console.log(`Resource manager ${managerId} exited normally`);
            })
            .catch((err: any) => {
               console.error(`Resource manager ${managerId} exited exceptionally:`, err);
            });
      }
   }

   // public borrowSemaphore<P>(durationSelector: LeaseDurationSelector<T, P>): BorrowResourceOperator<T, P>
   // {
   //
   // }

   public async borrowResource<R>(
      callback: (param: T) => R | Promise<R>,
   ): Promise<R> {
      const resource: T|CLOSED = await take(this.resourceRequests!);
      if (resource !== CLOSED) {
         const retVal: R | Promise<R> = callback(resource as T);
         await put(this.recycledResources!, resource);
         return await retVal;
      } 
         throw new Error('Resource channel closed before API call could be made');
      
   }

   private async scanForRequests(): Promise<void>
   {
      while (this.channelOpen) {
         const nextMgr: IResourceAdapter<T> | CLOSED =
            await this.recycledResources!;

         if (nextMgr instanceof ResourceAdapter) {
            await put(this.resourceRequests!, nextMgr);

            this.notifyReady(nextMgr.wetArtifact);
         } else {
            this.channelOpen = false;

            console.error('Shutting down on a closed channel');
         }
      }

      console.log('Exit scanForRequests');
   }

   private isOwnedResource(resource: any): resource is IManagedResource<T>
   {
      return ((!!resource[GET_LEASE_MANAGER]) &&
         (resource[GET_LEASE_MANAGER]['parentSemaphore'] === this));
   }

   notifyInUse(_resource: T)
   {
      const oldPoolSizes = this.poolSizes;
      const newPoolSizes = {
         totalCount: oldPoolSizes.totalCount,
         ready: oldPoolSizes.ready - 1,
         inUse: oldPoolSizes.inUse + 1,
         recycling: oldPoolSizes.recycling,
      };
      this.poolSizes = newPoolSizes;
      this.notifyWatches(oldPoolSizes, newPoolSizes);
   }

   private notifyReturned(_resource: T)
   {
      // console.log(`Returned unused: ${util.inspect(resource, true, 5, true)}`)
   }

   private notifyRecycled(_resource: T)
   {
      const oldPoolSizes = this.poolSizes;
      const newPoolSizes = {
         totalCount: oldPoolSizes.totalCount,
         ready: oldPoolSizes.ready,
         inUse: oldPoolSizes.inUse - 1,
         recycling: oldPoolSizes.recycling + 1,
      };
      this.poolSizes = newPoolSizes;
      this.notifyWatches(oldPoolSizes, newPoolSizes);
   }

   private notifyReady(_resource: T)
   {
      const oldPoolSizes = this.poolSizes;
      const newPoolSizes = {
         totalCount: oldPoolSizes.totalCount,
         ready: oldPoolSizes.ready + 1,
         inUse: oldPoolSizes.inUse,
         recycling: oldPoolSizes.recycling - 1,
      };
      this.poolSizes = newPoolSizes;
      this.notifyWatches(oldPoolSizes, newPoolSizes);
   }

   public addWatch(_id: string, _fn: Watch<PoolSizes>): boolean
   {
      return false;
   }

   public notifyWatches(_oldState: PoolSizes, _newState: PoolSizes): void
   {
   }

   public removeWatch(_id: string): boolean
   {
      return false;
   }

   getReturnChan(): Chan<T, IResourceAdapter<T>>
   {
      return this.recycledResources;
   }

   getReservationChan(): Chan<IResourceAdapter<T>, T>
   {
      return this.resourceRequests;
   }
}
