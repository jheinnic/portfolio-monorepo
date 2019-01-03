import { ConcreteFactoryService } from './concrete-factory-service.interface';
export declare type InstallerService<In, Out> = ConcreteFactoryService<'install', Out, [In]>;
