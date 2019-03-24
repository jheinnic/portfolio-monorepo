import { LIBRARY_MODULE_ID } from 'lib';

declare module '@jchptf/nestjs' {
   interface ModuleRegistry {
      [LIBRARY_MODULE_ID] = typeof LibraryModule
   }
}