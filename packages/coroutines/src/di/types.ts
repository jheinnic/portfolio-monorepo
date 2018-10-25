import {IBagOf} from '@jchptf/api';

type CoTypes = 'Queue' | 'Chanel' | 'Chan' | 'ConcurrentWorkFactory'

export const CO_TYPES: IBagOf<symbol, CoTypes> = {
   Queue: Symbol.for('Queue'),
   Chanel: Symbol.for('Chanel'),
   Chan: Symbol.for('Chan'),
   ConcurrentWorkFactory: Symbol.for('ConcurrentWorkFactory')
};

type CoInstallerTypes = 'QueueRequest' | 'ChanelRequest' | 'ChanRequest' | 'QueueInstaller' | 'ChanelInstaller' | 'ChanInstaller' | 'FactoryServiceRequest' | 'FactoryInstaller'
export const CO_INSTALLER_TYPES: IBagOf<symbol, CoInstallerTypes> = {
   QueueRequest: Symbol.for('QueueRequest'),
   ChanelRequest: Symbol.for('ChanelRequest'),
   ChanRequest: Symbol.for('ChanRequest'),
   QueueInstaller: Symbol.for('QueueInstaller'),
   ChanelInstaller: Symbol.for('ChanelInstaller'),
   ChanInstaller: Symbol.for('ChanInstaller'),
   FactoryServiceRequest: Symbol.for('FactoryServiceRequest'),
   FactoryInstaller: Symbol.for('FactoryInstaller')
};