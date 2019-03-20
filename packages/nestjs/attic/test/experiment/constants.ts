import {
   getLocalProviderSymbol, getModuleIdentifier, getLocalProviderToken, LocalProviderToken,
   ModuleIdentifier,
} from '@jchptf/nestjs';
import { Dynamo, IConnectable, UtilityContainer } from './classes';
import { Blender, Lamp, Socket } from './power_classes';

export const DYNAMICS_MODULE: ModuleIdentifier =
   getModuleIdentifier('DynamicsModule');
export const BAR_MODULE: ModuleIdentifier =
   getModuleIdentifier('BarModule');
export const FOO_MODULE: ModuleIdentifier =
   getModuleIdentifier('FooModule');
export const APPLICATION_MODULE: ModuleIdentifier =
   getModuleIdentifier('ApplicationModule');

export const DYNAMO: LocalProviderToken<Dynamo> =
   getLocalProviderToken(DYNAMICS_MODULE, 'Dynamo');

export const SOCKET: LocalProviderToken<Socket> =
   getLocalProviderSymbol<Socket>(BAR_MODULE, 'Socket');
export const LAMP: LocalProviderToken<Lamp> =
   getLocalProviderSymbol<Lamp>(BAR_MODULE, 'Lamp');
export const BLENDER: LocalProviderToken<Blender> =
   getLocalProviderSymbol<Blender>(BAR_MODULE, 'Blender');
export const POWER_CONTAINER: LocalProviderToken<UtilityContainer<Socket>> =
   getLocalProviderSymbol(BAR_MODULE, 'PowerUtilityContainer');

export const FRUIT_BOX = 'FruitBox';
export const APPLE = 'Apple';
export const ORANGE = 'Orange';
export const FRUIT_CONTAINER = 'FruitUtilityContainer';

export const LIBRARY_CLASS =
   getLocalProviderSymbol<UtilityContainer<any>>(DYNAMICS_MODULE, 'UtilityContainer');
// export const LIBRARY_CLASS: LocalProviderToken<UtilityContainer<any>> =
//    getLocalProviderSymbol<UtilityContainer<any>>('UtilityContainer';
export const INJECTED_DEPENDENCY =
   getLocalProviderSymbol<IConnectable<any>>(BAR_MODULE, 'InjectedDependency');
export const LOCAL_DEPENDENCY =
   getLocalProviderSymbol<Map<string, any>>(BAR_MODULE, 'LocalDependency');

// import { NestModules } from '@jchptf/nestjs/token/nest-modules.interface';
