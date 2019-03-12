import { IResourceAdapter } from './interfaces';
import { ResourceSemaphore } from './resource-semaphore.class';
import { GET_LEASE_MANAGER } from './resource-semaphore.constants';

export class ResourceAdapter<T extends object> implements IResourceAdapter<T>, ProxyHandler<T> {
   private inUse: boolean;
   private dryAdapter?: { proxy: T, revoke(): void };

   constructor(
      readonly parentSemaphore: ResourceSemaphore<T>,
      readonly wetArtifact: T) {
      this.inUse = false;
      this.dryAdapter = undefined;
   }

   public publish(): T {
      if (this.dryAdapter !== undefined) {
         throw new Error(`Already published: ${this.wetArtifact}`);
      }

      this.dryAdapter = Proxy.revocable(this.wetArtifact, this);
      this.inUse = false;

      return this.dryAdapter.proxy;
   }

   public recycle(): boolean {
      if (this.dryAdapter === undefined) {
         throw new Error(`Not published: ${this.wetArtifact}`);
      }

      this.dryAdapter.revoke();
      this.dryAdapter = undefined;

      return this.inUse;
   }

   public get(target: T, prop: PropertyKey, _receiver: any) {
      if (prop === GET_LEASE_MANAGER) {
         return this;
      }

      if (! this.inUse) {
         this.inUse = true;
         this.parentSemaphore.notifyInUse(this.wetArtifact);
      }

      return Reflect.get(target, prop, this.wetArtifact);
   }

   public has(_target: T, prop: PropertyKey) {
      if (prop === GET_LEASE_MANAGER) {
         return true;
      }

      return Reflect.has(this.wetArtifact, prop);
   }
}
