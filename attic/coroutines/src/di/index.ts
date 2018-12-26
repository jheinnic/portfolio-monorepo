import {CO_INSTALLER_TYPES} from '../../../../src/di/types';
import {ContainerRegistry, IInstallerModuleBuilder} from '@jchptf/di-app-registry';

import {InstallChanRequest} from './install-chan-request.class';
import {InstallChanelRequest} from './install-chanel-request.class';
import {InstallQueueRequest} from './install-queue-request.class';
import {InstallFactoriesRequest} from './install-factories-request.class';
import {FactoriesInstaller} from './factories-installer.service';
import {ChanInstaller} from './chan-installer.service';
import {ChanelInstaller} from './chanel-installer.service';
import {QueueInstaller} from './queue-installer.service';

export * from './chan-installer.service'
export * from './chanel-installer.service'
export * from './queue-installer.service'
export * from './install-chan-request.class'
export * from './install-chanel-request.class'
export * from './install-queue-request.class'
export * from '../../../../src/di/types'

const installerRegistry = ContainerRegistry.getInstance();
installerRegistry.registerInstallers((bind: IInstallerModuleBuilder) => {
   bind.bindInstaller(
      CO_INSTALLER_TYPES.ChanRequest,
      InstallChanRequest,
      CO_INSTALLER_TYPES.ChanInstaller,
      ChanInstaller
   );
   bind.bindInstaller(
      CO_INSTALLER_TYPES.ChanelRequest,
      InstallChanelRequest,
      CO_INSTALLER_TYPES.ChanelInstaller,
      ChanelInstaller
   );
   bind.bindInstaller(
      CO_INSTALLER_TYPES.QueueRequest,
      InstallQueueRequest,
      CO_INSTALLER_TYPES.QueueInstaller,
      QueueInstaller
   );
   bind.bindInstaller(
      CO_INSTALLER_TYPES.FactoryServiceRequest,
      InstallFactoriesRequest,
      CO_INSTALLER_TYPES.FactoryInstaller,
      FactoriesInstaller
   );
});
