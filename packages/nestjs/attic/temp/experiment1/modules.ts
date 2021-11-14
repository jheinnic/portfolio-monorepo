import {DynamicModule, Module} from '@nestjs/common';
import {
   BLENDER, INJECTED_DEPENDENCY, LAMP, LIBRARY_CLASS, LOCAL_DEPENDENCY, POWER_CONTAINER, SOCKET,
} from './constants';
import {Application, UtilityContainer} from './classes';
import {Blender, Lamp, Socket} from './power_classes';

export class DynamicsModule
{
   static forFeature(message: any): DynamicModule
   {
      return {
         module: DynamicsModule,
         imports: [message[INJECTED_DEPENDENCY].fromModule],
         providers: [
            {
               provide: INJECTED_DEPENDENCY,
               useExisting: message[INJECTED_DEPENDENCY].useExisting,
            },
            {
               provide: LIBRARY_CLASS,
               useClass: UtilityContainer,
            },
            {
               provide: LOCAL_DEPENDENCY,
               useFactory: () => { return new Map(); },
            },
            {
               provide: message[LIBRARY_CLASS].exportAs,
               useExisting: LIBRARY_CLASS,
            },
         ],
         exports: [message[LIBRARY_CLASS].exportAs],
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
   imports: [],
   providers: [
      {
         provide: SOCKET,
         useClass: Socket,
      }
   ],
   exports: [SOCKET],
})
export class BarConfigModule
{}

@Module({
   imports: [
      BarConfigModule,
      DynamicsModule.forFeature({
         [INJECTED_DEPENDENCY]: {
            useExisting: SOCKET,
            fromModule: BarConfigModule,
         },
         [LIBRARY_CLASS]: {
            exportAs: POWER_CONTAINER,
         },
      }),
   ],
   providers: [
      {
         provide: 'SOCKET',
         useExisting: SOCKET,
      },
      {
         provide: BLENDER,
         useClass: Blender,
      }, {
         provide: LAMP,
         useClass: Lamp,
      },
   ],
   exports: ['SOCKET', BLENDER, LAMP, DynamicsModule],
})
export class BarModule
{}

@Module({
   imports: [BarModule],
   providers: [Application, {provide: SOCKET, useExisting: 'SOCKET'}],
   exports: [Application],
})
export class ApplicationModule
{}
