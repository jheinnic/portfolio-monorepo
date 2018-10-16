import {NestedContainerIdentifier} from './nested-container-identifier.interface';
import {InstallerServiceIdentifier} from './installer-service-identifier.interface';
import {IContainerAccessStrategy} from './container-access-strategy.interface';

export interface IContainerRegistryInstallerClient {
   toChildContainer(id: NestedContainerIdentifier, director: IDirectorFunction<IContainerRegistryInstallerClient>);

   injectContainerModule(callback: interfaces.ContainerModuleCallBack): void;

   requestInstallerModule<Imports, Exports>(
      id: InstallerServiceIdentifier<Imports, Exports>, requestBody: Imports): Exports;

   adaptAccessFromChild<T>(
      id: NestedContainerIdentifier,
      strategy: IContainerAccessStrategy<T>
   ): IContainerAccessStrategy<T>;


}