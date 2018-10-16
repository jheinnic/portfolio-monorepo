import {interfaces} from 'inversify';
import {InstallerService} from './interfaces';

export interface ContainerRegistryInternal {
   beginNestedContainer(containerKey: PropertyKey): void;

   completeNestedContainer(
      containerKey: PropertyKey,
      containerContent: interfaces.ContainerModuleCallBack): void;

   installContainerModule(result: interfaces.ContainerModuleCallBack): void;

   scanForRegistryDecorators(argList: any|any[]): void;
}