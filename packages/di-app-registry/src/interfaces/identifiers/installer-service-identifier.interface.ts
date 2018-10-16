import {interfaces} from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;

import {InstallerService} from '../installer/installer-service.interface';

export type InstallerServiceIdentifier<I, O> = ServiceIdentifier<InstallerService<I, O>>

// I extends InstallerFactory ? ServiceIdentifier<Parameters<ReturnType<I>>> :
//    ServiceIdentifier<Parameters<ReturnType<(I&InstallerService)['install']>>>
