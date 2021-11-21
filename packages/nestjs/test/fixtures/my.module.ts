import { Module } from '@nestjs/common';
import { REGISTRY } from '@jchptf/nestjs';

export class MyModuleRegistry {
   public static readonly [REGISTRY] = MyModuleRegistry;
}

@Module({
   providers: [
   ],
})
export class MyModule
{
   public static readonly [REGISTRY] =  MyModuleRegistry;
}
