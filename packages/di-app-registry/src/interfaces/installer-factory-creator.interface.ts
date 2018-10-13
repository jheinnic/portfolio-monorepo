import {interfaces} from 'inversify';
import Context = interfaces.Context;
import ContainerModuleCallBack = interfaces.ContainerModuleCallBack;
import FactoryCreator = interfaces.FactoryCreator;

import {InstallerFactory} from './installer-factory.interface';

export interface InstallerFactoryCreator<Args extends any[] = []> extends FactoryCreator<ContainerModuleCallBack> {
   (context: Context): InstallerFactory<Args>;
}
