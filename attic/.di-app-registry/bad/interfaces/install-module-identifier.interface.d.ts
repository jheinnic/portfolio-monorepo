import { interfaces } from 'inversify';
import { InstallationActivityFactory } from './installation-activity-factory.interface';
import ServiceIdentifier = interfaces.ServiceIdentifier;
export declare type InstallModuleIdentifier<I, O> = ServiceIdentifier<InstallationActivityFactory<I, O>>;
