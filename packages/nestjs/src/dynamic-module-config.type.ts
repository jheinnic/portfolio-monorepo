import { Type } from '@nestjs/common';

import { IFactoryMethod } from '@jchptf/api';

import {IHasRegistry, IModule, IModuleRegistry, IToken, ITokenImportExportable, ITokenType} from './module';
import {ArgsAsInjectableKeys} from "./injectable-key";

export interface IBoundDynamicModuleExport<Supplier extends IModule<IModuleRegistry>,
  Token extends IToken<Supplier>,
  Origins extends [...IHasRegistry[]]>
{
   exportTo: ITokenImportExportable<Supplier, Token, Origins>;
}

export enum DynamicProviderBindingStyle
{
   VALUE= 0,
   CLASS= 1,
   EXISTING = 2,
   INJECTED_FACTORY = 3,
}

// export type IBoundDynamicModuleImport<
//   Supplier extends IModule<IModuleRegistry>,
//   Token extends IToken<Supplier>,
//   Origins extends [...IHasRegistry[]]
// > =
//   IAsValue<Supplier, Token> |
//   IAsClass<Supplier, Token> |
//   IFromExisting<Supplier, Token, Origins> |
//   IByFactoryCall<Supplier, Token, Origins>
// ;

export type IAsValue<Supplier extends IModule<IModuleRegistry>, Token extends IToken<Supplier>> =
{
   style: DynamicProviderBindingStyle.VALUE;
   useValue: ITokenType<Supplier, Token>;
};

export type IAsClass<Supplier extends IModule<IModuleRegistry>, Token extends IToken<Supplier>> =
{
   style: DynamicProviderBindingStyle.CLASS;
   useClass: Type<ITokenType<Supplier, Token>>;
};

export type IFromExisting<Supplier extends IModule<IModuleRegistry>,
  Token extends IToken<Supplier>, Origins extends [...IHasRegistry[]]> = {
   style: DynamicProviderBindingStyle.EXISTING;
   useExisting: ITokenImportExportable<Supplier, Token, Origins>
};

export type IByFactoryCall<Supplier extends IModule<IModuleRegistry>,
  Token extends IToken<Supplier>,
  Factory extends IFactoryMethod<ITokenType<Supplier, Token>, any[]>,
  Origins extends [...IHasRegistry[]]> = {
   style: DynamicProviderBindingStyle.INJECTED_FACTORY;
   useFactory: Factory
   inject: ArgsAsInjectableKeys<Factory, Origins>
};

// export type DynamicModuleConfig<
//   Supplier extends IModule<IModuleRegistry>,
//   Origins extends IModule<IModuleRegistry>,
//   Consumer extends IModule<IModuleRegistry>,
//   RequiredImports extends IToken<Supplier> = never,
//   OptionalImports extends IToken<Supplier> = never,
//   Exports extends IToken<Supplier> = never
// > = {
//    imports: {
//       [K in RequiredImports]: IBoundDynamicModuleImport<Supplier, K, Origins>
//    } & {
//       [K in OptionalImports]?: IBoundDynamicModuleImport<Supplier, K, Origins>
//    },
//    exports: {
//       [K in Exports]?: IBoundDynamicModuleExport<Supplier, K, Consumer>
//    },
// };
