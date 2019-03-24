import {
   getLocalProviderSymbol, getModuleIdentifier, getLocalProviderToken,
   ProviderToken, ModuleIdentifier,
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

export const DYNAMO: ProviderToken<Dynamo> =
   getLocalProviderToken(DYNAMICS_MODULE, 'Dynamo');

export const SOCKET: ProviderToken<Socket> =
   getLocalProviderSymbol<Socket>(BAR_MODULE, 'Socket');
export const LAMP: ProviderToken<Lamp> =
   getLocalProviderSymbol<Lamp>(BAR_MODULE, 'Lamp');
export const BLENDER: ProviderToken<Blender> =
   getLocalProviderSymbol<Blender>(BAR_MODULE, 'Blender');
export const POWER_CONTAINER: ProviderToken<UtilityContainer<Socket>> =
   getLocalProviderSymbol(BAR_MODULE, 'PowerUtilityContainer');

export const FRUIT_BOX = 'FruitBox';
export const APPLE = 'Apple';
export const ORANGE = 'Orange';
export const FRUIT_CONTAINER = 'FruitUtilityContainer';

export const LIBRARY_CLASS: ProviderToken<UtilityContainer<any>> =
   getLocalProviderSymbol<UtilityContainer<any>>(DYNAMICS_MODULE, 'UtilityContainer');
export const INJECTED_DEPENDENCY: ProviderToken<IConnectable<any>> =
   getLocalProviderSymbol<IConnectable<any>>(DYNAMICS_MODULE, 'InjectedDependency');
export const LOCAL_DEPENDENCY: ProviderToken<Map<string, any>> =
   getLocalProviderSymbol<Map<string, any>>(DYNAMICS_MODULE, 'LocalDependency');

// import { NestModules } from '@jchptf/nestjs/token/nest-modules.interface';
