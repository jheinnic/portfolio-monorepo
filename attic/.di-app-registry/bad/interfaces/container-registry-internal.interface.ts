import {interfaces} from 'inversify';
import {InstallerServiceIdentifier, NestedContainerIdentifier} from '../../src/index';
import {ClassType} from 'class-transformer-validator';
import {InjectDecorators} from '../../src/interfaces/inject-decorators.type';

export interface IContainerRegistryInternal {
   getInternalLazyDecorators(): InjectDecorators;

   createNestedContainer(containerKey: NestedContainerIdentifier): void;

   hasNestedContainer(containerKey: NestedContainerIdentifier): boolean;

   enterNestedContainer(containerKey: NestedContainerIdentifier ): void;

   exitNestedContainer(containerKey: NestedContainerIdentifier): void;

   loadModule(result: interfaces.ContainerModuleCallBack): void;

   runInstaller<Import, Export>(
      serviceId: InstallerServiceIdentifier<Import, Export>,
      requestMsg: Import): Export;

   scanExports<Export>(responseMsg: Export): Export;

   getConfig<T extends object>(configClass: ClassType<T>, rootPath?: string): T;

   registerConfig<T extends object>(
      configClass: ClassType<T>, serviceIdentifier: interfaces.ServiceIdentifier<T>): void;

   // scanForDecorators(argList: any|any[]): void;

   // scanForImportDecorators(argList: any|any[]): void;

   // scanForExportDecorators(retVal: any): void;
}