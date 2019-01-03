import { interfaces } from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;
import { ApplicationInstaller } from './installer/application-installer.interface';
export declare type ApplicationIdentifier<A extends ApplicationInstaller> = ServiceIdentifier<A>;
