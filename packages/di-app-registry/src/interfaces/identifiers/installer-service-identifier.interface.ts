import {interfaces} from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;

import {InstallerService} from '..';

export type InstallerServiceIdentifier<I extends any, O extends any> = ServiceIdentifier<InstallerService<I, O>>

// I extends InstallerFactory ? ServiceIdentifier<Parameters<ReturnType<I>>> :
//    ServiceIdentifier<Parameters<ReturnType<(I&InstallerService)['install']>>>
