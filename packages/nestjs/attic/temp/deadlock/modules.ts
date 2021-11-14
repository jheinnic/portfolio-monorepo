import { Module, DynamicModule } from '@nestjs/common';
import { DynamicModuleInput, SingletonHelper } from './di';
import { MY_PROTO, FRAMEWORK, SOCKET, PLUG, APPLE, ORANGE } from './constants';
import { Application, Framework, Plug, Socket } from './classes';

export class DynamicsModule
{
   static forFeature(config: DynamicModuleInput): DynamicModule {
      return {
         module: DynamicsModule,
         providers: [
            {
               provide: MY_PROTO,
               useFactory: () => config.activate(),
            },
            {
               provide: FRAMEWORK,
               useClass: Framework,
            },
         ],
         exports: [FRAMEWORK],
      };
   }
}

@Module({
   imports: [DynamicsModule.forFeature(
      SingletonHelper.getInstance().bindDynamicInput(APPLE),
   )],
   providers: [{
      provide: APPLE,
      useClass: Socket,
   }, {
      provide: ORANGE,
      useClass: Plug,
   }],
   exports: [ORANGE],
})
export class FooModule
{ }

@Module({
   imports: [DynamicsModule.forFeature(
      SingletonHelper.getInstance().bindDynamicInput(SOCKET),
   )],
   providers: [{
      provide: SOCKET,
      useClass: Socket,
   }, {
      provide: PLUG,
      useClass: Plug,
   }],
   exports: [PLUG],
})
export class BarModule
{

}

@Module({
   imports: [FooModule, BarModule],
   providers: [],
   exports: [],
})
export class HiccupModule
{ }

@Module({
   imports: [FooModule, BarModule, HiccupModule],
   providers: [Application],
   exports: [Application],
})
export class ApplicationModule
{ }
