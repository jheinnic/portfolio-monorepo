import { IModule } from '../module';
import { IBoundDynamicModuleExport } from './bound-dynamic-module-export.type';
import { IBoundDynamicModuleImport } from './bound-dynamic-module-import.type';
import { InjectableKey } from '../provider';

export interface IBaseConfigProps<Consumer extends IModule>
{
   forModule: Consumer;
}

export type DynamicModuleConfig<
   Supplier extends IModule,
   Properties extends IBaseConfigProps<IModule>,
   Dependencies extends {} = {},
   Exports extends {} = {},
> =
   Properties extends IBaseConfigProps<infer Consumer>
      ? (Properties &
         {
            [K in keyof Dependencies]:
            IBoundDynamicModuleImport<Dependencies[K], Supplier, Consumer, K>
         } &
         { [K in keyof Exports]: IBoundDynamicModuleExport<Exports[K], Supplier, Consumer> })
      : never;

export type DynamicModuleConfigTwo<
   Supplier extends IModule,
   Properties extends IBaseConfigProps<IModule>,
   TokenTypes,
   RequiredImports extends keyof TokenTypes = never,
   OptionalImports extends keyof TokenTypes = never,
   Exports extends keyof TokenTypes = never,
> =
   Properties extends IBaseConfigProps<infer Consumer>
      ? (Properties &
         {
            [K in RequiredImports]: IBoundDynamicModuleImport<TokenTypes[K], Supplier, Consumer, K & symbol>
         } & {
            [K in OptionalImports]?: IBoundDynamicModuleImport<TokenTypes[K], Supplier, Consumer, K & symbol>
         } & {
            [K in Exports]?: InjectableKey<TokenTypes[K], Consumer>
         // IBoundDynamicModuleExport<TokenTypes[K], Supplier, Consumer, K>
         })
      : never;
