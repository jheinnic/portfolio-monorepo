import {interfaces} from 'inversify';
import ContainerModuleCallBack = interfaces.ContainerModuleCallBack;

import {ConcreteFactoryService} from './concrete-factory-service.interface';

export type ApplicationInstaller = ConcreteFactoryService<'install', ContainerModuleCallBack, [ContainerModuleCallBack]>;
