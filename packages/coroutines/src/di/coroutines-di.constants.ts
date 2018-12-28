import {getLocalProviderToken/*, TokenDictionary*/} from '@jchptf/api';
import {IConcurrentWorkFactory} from '../interfaces/concurrent-work-factory.interface';

export const CONCURRENT_WORK_FACTORY =
   getLocalProviderToken<IConcurrentWorkFactory>("ConcurrentWorkFactory");

// type CoroutineTypeNames = typeof CONCURRENT_WORK_FACTORY;

export const CO_TYPES = { // : TokenDictionary<CoroutineTypeNames> = {
   ConcurrentWorkFactory: CONCURRENT_WORK_FACTORY
};

// type CoInstallerTypes = 'QueueRequest' | 'ChanelRequest' | 'ChanRequest' | 'QueueInstaller' | 'ChanelInstaller' | 'ChanInstaller' | 'FactoryServiceRequest' | 'FactoryInstaller'
// export const CO_INSTALLER_TYPES: IBagOf<symbol, CoInstallerTypes> = {
//    QueueRequest: Symbol.for('QueueRequest'),
//    ChanelRequest: Symbol.for('ChanelRequest'),
//    ChanRequest: Symbol.for('ChanRequest'),
//    QueueInstaller: Symbol.for('QueueInstaller'),
//    ChanelInstaller: Symbol.for('ChanelInstaller'),
//    ChanInstaller: Symbol.for('ChanInstaller'),
//    FactoryServiceRequest: Symbol.for('FactoryServiceRequest'),
//    FactoryInstaller: Symbol.for('FactoryInstaller')
// };