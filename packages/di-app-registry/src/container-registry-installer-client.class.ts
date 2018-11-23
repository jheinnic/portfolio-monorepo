import {inject, injectable, interfaces} from 'inversify';

import {IDirector} from '@jchptf/api';
import {DI_TYPES} from './types';
import {IContainerRegistryInternal} from './interfaces/container-registry-internal.interface';
import {
   IContainerAccessStrategy, InstallerRegistryClient, InstallerServiceIdentifier,
   NestedContainerIdentifier
} from './interfaces';
import {IllegalArgumentError, IllegalStateError} from '@thi.ng/errors';
import {ClassType} from 'class-transformer-validator';

@injectable()
export class ContainerRegistryInstallerClient implements InstallerRegistryClient
{
   constructor(
      @inject(
         DI_TYPES.ContainerRegistryInternal) private readonly registryInternal: IContainerRegistryInternal
   )
   { }

   public getConfig<T extends object>(configClass: ClassType<T>, rootPath?: string): T {
      return this.registryInternal.getConfig(configClass, rootPath);
   }

   public createChild(
      childId: NestedContainerIdentifier,
      allowExists: boolean = false
   ): InstallerRegistryClient
   {
      if (!childId) {
         throw new IllegalArgumentError('childId is a mandatory argument');
      }
      if (this.registryInternal.hasNestedContainer(childId)) {
         if (!allowExists) {
            throw new IllegalArgumentError(
               `A child container already exists for ${childId.toString()}, and allowExists flag is not true.`);
         }
      } else {
         this.registryInternal.createNestedContainer(childId);
      }

      return this;
   }

   public fromChild(
      childId: NestedContainerIdentifier,
      director: IDirector<InstallerRegistryClient>): InstallerRegistryClient
   {
      this.registryInternal.enterNestedContainer(childId);
      try {
         director(this);
      } finally {
         this.registryInternal.exitNestedContainer(childId);
      }

      return this;
   }

   public load(
      callback: interfaces.ContainerModuleCallBack): InstallerRegistryClient
   {
      if (! callback) {
         throw new IllegalArgumentError('callback must be defined');
      }

      this.registryInternal.loadModule(callback);

      return this;
   }

   public loadFromChild(
      childId: NestedContainerIdentifier,
      callback: interfaces.ContainerModuleCallBack,
      allowCreate: boolean = false): InstallerRegistryClient
   {
      if (!childId || !callback) {
         throw new IllegalArgumentError('childId and callback are both mandatory arguments');
      }

      this.validateChildId(childId, allowCreate);

      this.registryInternal.enterNestedContainer(childId);
      try {
         this.registryInternal.loadModule(callback);
      } finally {
         this.registryInternal.exitNestedContainer(childId);
      }

      return this;
   }

   public install<Import, Export>(
      installerId: InstallerServiceIdentifier<Import, Export>, requestBody: Import): Export
   {
      if (!installerId || !requestBody) {
         throw new IllegalArgumentError(
            'installerId and requestBody are both mandatory arguments');
      }

      const retVal: Export =
         this.registryInternal
            .runInstaller<Import, Export>(
               installerId, requestBody);
      return this.registryInternal
         .scanExports(retVal);
   }

   public installFromChild<Import, Export>(
      childId: NestedContainerIdentifier,
      installerId: InstallerServiceIdentifier<Import, Export>,
      requestBody: Import,
      allowCreate: boolean = false): Export
   {
      if (!childId || !installerId || !requestBody) {
         throw new IllegalArgumentError(
            'childId, installerId, and requestBody are all mandatory arguments');
      }

      this.validateChildId(childId, allowCreate);

      let retVal: Export;
      this.registryInternal.enterNestedContainer(childId);
      try {
          retVal = this.registryInternal
             .runInstaller<Import, Export>(
                installerId, requestBody);
      } finally {
         this.registryInternal.exitNestedContainer(childId);
      }

      return this.registryInternal
         .scanExports(retVal);
   }

   public adaptFromChild<T>(
      childId: NestedContainerIdentifier,
      accessStrategy: IContainerAccessStrategy<T>,
      trustUntagged: boolean = false): IContainerAccessStrategy<T>
   {
      if (!childId || !accessStrategy) {
         throw new IllegalArgumentError(
            'childId and accessStrategy are both mandatory arguments');
      }

      if (! this.registryInternal.hasNestedContainer(childId)) {
         throw new IllegalArgumentError(
            `Cannot adapt access strategy.  ${childId.toString()} has no child container.`);
      }

      if ((accessStrategy.containerId === childId) ||
         (trustUntagged && (accessStrategy.containerId === undefined)))
      {
         // TODO: Provide a containerId for the current container, including root!
         const retVal: IContainerAccessStrategy<T> =
            (container: interfaces.Container): T => {
               const childContainer: interfaces.Container = container.get(childId);
               return accessStrategy(childContainer);
            };
         retVal.containerId = undefined;

         return retVal;
      } else if (accessStrategy.containerId === undefined) {
         throw new IllegalArgumentError(
            'Untagged access strategy and trustUntagged flag not true');
      }

      throw new IllegalArgumentError(
         `Access strategy, ${accessStrategy.containerId.toString()}, does not match ${childId.toString()}`);
   }

   public adaptForChild<T>(
      childId: NestedContainerIdentifier,
      grandChildId: NestedContainerIdentifier,
      grandChildAccessStrategy: IContainerAccessStrategy<T>,
      trustUntagged?: boolean): IContainerAccessStrategy<T>
   {
      if (!childId || !grandChildId || !grandChildAccessStrategy) {
         throw new IllegalArgumentError(
            'childId, grandChildId, and grandChildAccessStrategy are all mandatory arguments');
      }

      if (! this.registryInternal.hasNestedContainer(childId)) {
         throw new IllegalArgumentError(
            `Cannot adapt access strategy.  ${childId.toString()} has no child container.`);
      }

      this.registryInternal.enterNestedContainer(childId);
      try {
         if (! this.registryInternal.hasNestedContainer(grandChildId)) {
            throw new IllegalArgumentError(
               `Cannot adapt access strategy.  ${childId.toString()} has no grandchild container.`);
         }

         return this.adaptFromChild(grandChildId, grandChildAccessStrategy, trustUntagged);
      } finally {
         this.registryInternal.exitNestedContainer(childId);
      }
   }

   /**
    *
    * Note that:
    * -- If allowCreate is false, this method will either return true or throw, but will
    *    never return false.
    * -- If allowCreate is true, this method will either return true or return false, but
    *    will never throw.
    *
    * @param childId Identifier to check for
    * @param allowCreate True if container may be created if it does not exist, false if
    * non-existence calls for a thrown error.
    * @returns True if the child container already exists, false if it did not exist but
    * was created by this call.
    */
   private validateChildId(
      childId: NestedContainerIdentifier,
      allowCreate: boolean): boolean
   {
      let retVal: boolean = true;
      if (! this.registryInternal.hasNestedContainer(childId)) {
         if (allowCreate) {
            this.registryInternal.createNestedContainer(childId);

            retVal = false;
         } else {
            throw new IllegalStateError(
               `No child container for ${childId.toString()}, and allowCreate flag not true.`);
         }
      }

      return retVal;
   }
}