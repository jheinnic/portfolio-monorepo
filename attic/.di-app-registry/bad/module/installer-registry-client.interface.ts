import {interfaces} from 'inversify';
import {IDirector} from '@jchptf/api';
import {NestedContainerIdentifier, IContainerAccessStrategy} from '../../src/interfaces/index';
import {ClassType} from 'class-transformer-validator';

export interface InstallerRegistryClient {
   // TODO: Only expose this on the installer client for a top-most Application.
   getConfig<T extends object>(configClass: ClassType<T>, rootPath?: string): T;

   // createChild(
   //    id: NestedContainerIdentifier,
   //    allowExists?: boolean): InstallerRegistryClient;

   createChild( ): NestedContainerIdentifier;

   fromChild(
      id: NestedContainerIdentifier,
      director: IDirector<InstallerRegistryClient> /*,
      allowCreate?: boolean*/): InstallerRegistryClient;

   load(callback: interfaces.ContainerModuleCallBack): InstallerRegistryClient;

   // loadFromChild(
   //    id: NestedContainerIdentifier,
   //    callback: interfaces.ContainerModuleCallBack,
   //    allowCreate?: boolean): InstallerRegistryClient;

   // install<Import, Export>(
   //    installerId: InstallerServiceIdentifier<Import, Export>,
   //    requestMessage: Import): Export;

   // installFromChild<Import, Export>(
   //    childId: NestedContainerIdentifier,
   //    installerId: InstallerServiceIdentifier<Import, Export>,
   //    requestMessage: Import,
   //    allowCreate?: boolean): Export;

   adaptFromChild<T>(
      childId: NestedContainerIdentifier,
      childAccess: IContainerAccessStrategy<T>,
      trustUntagged?: boolean
   ): IContainerAccessStrategy<T>;

   // adaptForChild<T>(
   //    childId: NestedContainerIdentifier,
   //    grandChildId: NestedContainerIdentifier,
   //    grandChildAccess: IContainerAccessStrategy<T>,
   //    trustUntagged?: boolean
   // ): IContainerAccessStrategy<T>;
}