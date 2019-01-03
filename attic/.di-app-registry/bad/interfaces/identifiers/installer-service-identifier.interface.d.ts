import { interfaces } from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;
import { InstallerService } from '..';
export declare type InstallerServiceIdentifier<I extends any, O extends any> = ServiceIdentifier<InstallerService<I, O>>;
