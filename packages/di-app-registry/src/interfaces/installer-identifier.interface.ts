import {interfaces} from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;
import {InstallerFactory} from './installer-factory.interface';

export type InstallerIdentifier<I extends InstallerFactory<any[]>> = ServiceIdentifier<Parameters<ReturnType<I>>>

