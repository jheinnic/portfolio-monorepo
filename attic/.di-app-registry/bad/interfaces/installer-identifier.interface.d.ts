import { interfaces } from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;
import { InstallerService } from './installer-service.interface';
export declare type InstallerIdentifier<I, O, S extends InstallerService<I, O>> = ServiceIdentifier<S>;
