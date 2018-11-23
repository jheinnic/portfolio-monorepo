import {interfaces} from 'inversify';
import {IDirector} from '@jchptf/api';
import {NestedContainerIdentifier, InstallerServiceIdentifier, IContainerAccessStrategy} from '..';
import {ClassType} from 'class-transformer-validator';

export interface InstallerModuleClient {
   // TODO: Only expose this on the installer client for a top-most Application.
   getConfig<T extends object>(configClass: ClassType<T>, rootPath?: string): T;

   createChild(
      id: NestedContainerIdentifier,
      allowExists?: boolean): InstallerModuleClient;

   fromChild(
      id: NestedContainerIdentifier,
      director: IDirector<InstallerModuleClient>,
      allowCreate?: boolean): InstallerModuleClient;

   load(callback: interfaces.ContainerModuleCallBack): InstallerModuleClient;

   loadFromChild(
      id: NestedContainerIdentifier,
      callback: interfaces.ContainerModuleCallBack,
      allowCreate?: boolean): InstallerModuleClient;

   install<Import, Export>(
      installerId: InstallerServiceIdentifier<Import, Export>,
      requestMessage: Import): Export;

   installFromChild<Import, Export>(
      childId: NestedContainerIdentifier,
      installerId: InstallerServiceIdentifier<Import, Export>,
      requestMessage: Import,
      allowCreate?: boolean): Export;

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