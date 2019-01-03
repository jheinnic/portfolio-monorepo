import { interfaces } from 'inversify';
import { InstallationActivityFactory } from './installation-activity-factory.interface';
import ServiceIdentifier = interfaces.ServiceIdentifier;
export declare type InstallationModuleIdentifier<I, O, S extends InstallationActivityFactory<I, O>> = ServiceIdentifier<S>;
