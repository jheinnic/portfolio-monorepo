import { Module } from '@nestjs/common';
import { REGISTRY } from '@jchptf/nestjs';

export class MyModuleRegistry {
   static readonly [REGISTRY] = MyModuleRegistry;
   readonly [REGISTRY] = MyModuleRegistry;
}

@Module({
   providers: [
   ],
})
export class MyModule
{
   readonly [REGISTRY]: () => MyModuleRegistry;
}
