import {interfaces} from 'inversify';
import {InstallerFactory, InstallerService} from './installer-service.interface';
import ServiceIdentifier = interfaces.ServiceIdentifier;

export type InstallerIdentifier<I extends (InstallerFactory | InstallerService)> =
   ServiceIdentifier<
      Parameters<
         ReturnType<
            (I & InstallerFactory) | (I & InstallerService)['install']>>>

// I extends InstallerFactory ? ServiceIdentifier<Parameters<ReturnType<I>>> :
//    ServiceIdentifier<Parameters<ReturnType<(I&InstallerService)['install']>>>

