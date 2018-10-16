import {interfaces} from 'inversify';
import {IDirector} from '@jchptf/api';
import {NestedContainerIdentifier} from '../index';
import {InstallerServiceIdentifier} from '../index';
import {IContainerAccessStrategy} from './container-access-strategy.interface';

export interface IContainerRegistryInstallerClient {
   createChild(
      id: NestedContainerIdentifier,
      allowExists?: boolean): IContainerRegistryInstallerClient;

   fromChildContext(
      id: NestedContainerIdentifier,
      director: IDirector<IContainerRegistryInstallerClient>,
      allowCreate?: boolean): IContainerRegistryInstallerClient;

   loadToCurrent(callback: interfaces.ContainerModuleCallBack): IContainerRegistryInstallerClient;

   loadToChild(
      id: NestedContainerIdentifier,
      callback: interfaces.ContainerModuleCallBack,
      allowCreate?: boolean): IContainerRegistryInstallerClient;

   installToCurrent<Import, Export>(
      installerId: InstallerServiceIdentifier<Import, Export>,
      requestMessage: Import): Export;

   installToChild<Import, Export>(
      childId: NestedContainerIdentifier,
      installerId: InstallerServiceIdentifier<Import, Export>,
      requestMessage: Import,
      allowCreate?: boolean): Export;

   adaptForCurrent<T>(
      childId: NestedContainerIdentifier,
      childAccess: IContainerAccessStrategy<T>,
      trustUntagged?: boolean
   ): IContainerAccessStrategy<T>;

   adaptForChild<T>(
      childId: NestedContainerIdentifier,
      grandChildId: NestedContainerIdentifier,
      grandChildAccess: IContainerAccessStrategy<T>,
      trustUntagged?: boolean
   ): IContainerAccessStrategy<T>;
}