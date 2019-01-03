import { interfaces } from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;
import { InstallerService } from './installer-service.interface';
export declare type InstallerServiceIdentifier<I, O> = ServiceIdentifier<InstallerService<I, O>>;
