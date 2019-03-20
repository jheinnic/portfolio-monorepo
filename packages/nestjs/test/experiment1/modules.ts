import { DynamicModule, Module } from '@nestjs/common';
import {
   BLENDER, INJECTED_DEPENDENCY, LAMP, LIBRARY_CLASS, LOCAL_DEPENDENCY, POWER_CONTAINER, SOCKET,
} from './constants';
import { Application, UtilityContainer } from './classes';
import { Blender, Lamp, Socket } from './power_classes';

export class DynamicsModule
{
   static forFeature(dependency: symbol, exportAs: symbol, selfMod: any): DynamicModule
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
   imports: [DynamicsModule.forFeature(SOCKET, POWER_CONTAINER, BarModule)],
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
{ }

@Module({
   imports: [BarModule],
   providers: [Application],
   exports: [Application],
})
export class ApplicationModule
{}
