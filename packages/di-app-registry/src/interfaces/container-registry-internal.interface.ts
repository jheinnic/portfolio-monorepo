import {interfaces} from 'inversify';
import {InstallerServiceIdentifier, NestedContainerIdentifier} from '..';

export interface ContainerRegistryInternal {
   createNestedContainer(containerKey: NestedContainerIdentifier): void;

   hasNestedContainer(containerKey: NestedContainerIdentifier): boolean;

   enterNestedContainer(containerKey: NestedContainerIdentifier ): void;

   exitNestedContainer(containerKey: NestedContainerIdentifier): void;

   loadModule(result: interfaces.ContainerModuleCallBack): void;

   runInstaller<Import, Export>(
      serviceId: InstallerServiceIdentifier<Import, Export>,
      requestMsg: Import): Export;

   scanExports<Export>(responseMsg: Export): Export;

   // scanForDecorators(argList: any|any[]): void;

   // scanForImportDecorators(argList: any|any[]): void;

   // scanForExportDecorators(retVal: any): void;
}