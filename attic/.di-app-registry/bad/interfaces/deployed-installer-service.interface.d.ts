import { ConcreteFactoryService } from './concrete-factory-service.interface';
export declare type DeployedInstallerService<Imports, Exports> = ConcreteFactoryService<'install', Exports, [Imports]>;
