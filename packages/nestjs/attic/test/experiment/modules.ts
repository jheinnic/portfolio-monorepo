import { DynamicModule, Module, Type } from '@nestjs/common';

import { InjectableKey, buildDynamicModule, IDynamicModuleBuilder } from '@jchptf/nestjs';
import {
   BLENDER, INJECTED_DEPENDENCY, LAMP, LIBRARY_CLASS,
   LOCAL_DEPENDENCY, POWER_CONTAINER, SOCKET,
} from './constants';
import { Blender, IPluggable, Lamp, Socket } from './power_classes';
import { Application, IConnectable, UtilityContainer } from './classes';

// export interface IApplicationModuleTypes<_X = any, _C = any>
// {}
//
// export interface IFooModuleTypes<_X = any, _C = any>
// {
//    [FRUIT_CONTAINER]: UtilityContainer<FruitBox>;
//    [FRUIT_BOX]: FruitBox;
//    [APPLE]: Apple;
//    [ORANGE]: Orange;
// }
//
// export interface IBarModuleTypes<_X = any, _C = any>
// {
//    [POWER_CONTAINER]: UtilityContainer<Socket>;
//    [SOCKET]: Socket;
//    [LAMP]: Lamp;
//    [BLENDER]: Blender;
// }
//
// export interface IDynamicsModuleTypes<X = any, C = any>
// {
//    [LIBRARY_CLASS]: X extends IConnectable<C> ? UtilityContainer<X> : never;
//    [INJECTED_DEPENDENCY]: X;
//    [LOCAL_DEPENDENCY]: Map<string, X>;
// }
//
// export const foo: IComponentTypes = {
//    [BAR_MODULE]: {
//       [LAMP]: new Lamp(new UtilityContainer<Socket>(
//          new Socket(), new Map(),
//       )),
//       [POWER_CONTAINER]: new UtilityContainer<Socket>(
//          new Socket(), new Map(),
//       ),
//       [SOCKET]: new Socket(),
//       [BLENDER]: new Blender(new UtilityContainer<Socket>(
//          new Socket(), new Map(),
//       )),
//    },
//    [GLOBAL_MODULE_ID]: {},
//    [DYNAMICS_MODULE]: {
//       [LIBRARY_CLASS]: new UtilityContainer<Socket>(
//          new Socket(), new Map(),
//       ),
//       [INJECTED_DEPENDENCY]: 6,
//       [LOCAL_DEPENDENCY]: new Map(),
//    },
// };

export class DynamicsModule
{
   static forFeatureTwo<X extends IConnectable<Y>, Y = any>(
      consumerModule: Type<any>,
      dependency: InjectableKey<X>,
      exportAs: InjectableKey<UtilityContainer<X>>,
   ): DynamicModule
   {
      return buildDynamicModule(
         DynamicsModule,
         consumerModule,
         (builder: IDynamicModuleBuilder) => {
            builder.bindInputProvider({
               provide: INJECTED_DEPENDENCY,
               useExisting: dependency,
            }).bindProvider(
               {
                  provide: LIBRARY_CLASS,
                  useClass: UtilityContainer,
               },
               exportAs,
            ).bindProvider(
               {
                  provide: LOCAL_DEPENDENCY,
                  useFactory: () => { return new Map<string, any>(); },
               },
               false,
            );
         },
      );
   }

   static forFeature(dependency: symbol, exportAs: symbol, selfMod: Type<any>): DynamicModule
   {
      return {
         module: DynamicsModule,
         imports: [
            {
               module: selfMod,
               providers: [
                  {
                     provide: INJECTED_DEPENDENCY,
                     useFactory: obj => obj,
                     inject: [dependency],
                  },
               ],
               exports: [INJECTED_DEPENDENCY],
            },
         ],
         providers: [
            {
               provide: LIBRARY_CLASS,
               useClass: UtilityContainer,
            },
            {
               provide: LOCAL_DEPENDENCY,
               useFactory: () => { return new Map(); },
            },
            {
               provide: exportAs,
               useFactory: obj => obj,
               inject: [LIBRARY_CLASS],
            },
         ],
         exports: [exportAs],
      };
   }
}

/*
@Module({
   imports: [DynamicsModule.forFeature(APPLE, FRUIT_CONTAINER, FooModule)],
   providers: [
      {
         provide: APPLE,
         useClass: Apple,
      }, {
         provide: ORANGE,
         useClass: Orange,
      },
   ],
   exports: [ORANGE, APPLE],
})
export class FooModule
{}
*/

@Module({
   imports: [DynamicsModule.forFeatureTwo<Socket, IPluggable>(BarModule, SOCKET, POWER_CONTAINER)],
   providers: [
      {
         provide: SOCKET,
         useClass: Socket,
      }, {
         provide: BLENDER,
         useClass: Blender,
      }, {
         provide: LAMP,
         useClass: Lamp,
      },
   ],
   exports: [SOCKET, BLENDER, LAMP, DynamicsModule],
})
export class BarModule
{
}

@Module({
   imports: [BarModule],
   providers: [Application],
   exports: [Application],
})
export class ApplicationModule
{
}
