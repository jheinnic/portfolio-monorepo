import {
   APPLE, APPLICATION_MODULE, BAR_MODULE, BLENDER, DYNAMICS_MODULE, FRUIT_BOX, FRUIT_CONTAINER,
   INJECTED_DEPENDENCY, LAMP, LIBRARY_CLASS, LOCAL_DEPENDENCY, ORANGE, POWER_CONTAINER, SOCKET,
   FOO_MODULE,
} from './constants';
import { Blender, Lamp, Socket } from './power_classes';
import { IConnectable, UtilityContainer } from './classes';
import { Apple, FruitBox, Orange } from './fruit_classes';

export interface IApplicationModuleTypes<_X = any, _C = any>
{ }

export interface IFooModuleTypes<_X = any, _C = any>
{
   [FRUIT_CONTAINER]: UtilityContainer<FruitBox>;
   [FRUIT_BOX]: FruitBox;
   [APPLE]: Apple;
   [ORANGE]: Orange;
}

export interface IBarModuleTypes<_X = any, _C = any>
{
   [POWER_CONTAINER]: UtilityContainer<Socket>;
   [SOCKET]: Socket;
   [LAMP]: Lamp;
   [BLENDER]: Blender;
}

export interface IDynamicsModuleTypes<X = any, C = any>
{
   [LIBRARY_CLASS]: X extends IConnectable<C> ? UtilityContainer<X> : never;
   [INJECTED_DEPENDENCY]: X;
   [LOCAL_DEPENDENCY]: Map<string, X>;
}

declare module '@jchptf/nestjs'
{
   export interface IComponentTypes<X = any, C = any>
   {
      [APPLICATION_MODULE]: IApplicationModuleTypes<X, C>;
      [BAR_MODULE]: IBarModuleTypes<X, C>;
      [FOO_MODULE]: IFooModuleTypes<X, C>;
      [DYNAMICS_MODULE]: IDynamicsModuleTypes<X, C>;
   }
}

export * from './constants';
export * from './classes';
export * from './fruit_classes';
export * from './modules';
export * from './power_classes';

// export const foo: ITypeMap = {
//    [LAMP]: new Lamp(new UtilityContainer<Socket>(
//       new Socket(), new Map(),
//    )),
//    [LIBRARY_CLASS]: new UtilityContainer<Socket>(
//       new Socket(), new Map(),
//    ),
// };
