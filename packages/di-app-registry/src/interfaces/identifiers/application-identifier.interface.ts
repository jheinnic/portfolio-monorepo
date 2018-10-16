import {interfaces} from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;

import {ApplicationInstaller} from '../installer/application-installer.interface';

export type ApplicationIdentifier<A extends ApplicationInstaller> = ServiceIdentifier<A>;
