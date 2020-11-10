import { Type } from '@nestjs/common';

import { IFactoryMethod } from '@jchptf/api';

import { IModule, IModuleRegistry, IToken, ITokenImportExportable, ITokenType } from '../module';

export interface IBoundDynamicModuleExport<Supplier extends IModule<IModuleRegistry>,
  Token extends IToken<Supplier>,
  Consumer extends IModule<IModuleRegistry>>
{
   exportTo: ITokenImportExportable<Supplier, Token, Consumer>;
}

export enum DynamicProviderBindingStyle
{
   VALUE,
   CLASS,
   EXISTING,
   INJECTED_FACTORY,
}

export type IBoundDynamicModuleImport<
  Supplier extends IModule<IModuleRegistry>,
  Token extends IToken<Supplier>,
  Origins extends IModule<IModuleRegistry>
> =
  IAsValue<Supplier, Token> |
  IAsClass<Supplier, Token> |
  IFromExisting<Supplier, Token, Origins> |
  IByFactoryCall<Supplier, Token, Origins>
;

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
  Token extends IToken<Supplier>, Origins extends IModule<IModuleRegistry>> =
{
   style: DynamicProviderBindingStyle.EXISTING;
   useExisting: ITokenImportExportable<Supplier, Token, Origins>;
};

export type IByFactoryCall<Supplier extends IModule<IModuleRegistry>,
  Token extends IToken<Supplier>, Origins extends IModule<IModuleRegistry>> =
{
   style: DynamicProviderBindingStyle.INJECTED_FACTORY;
   useFactory: IFactoryMethod<ITokenType<Supplier, Token>, any>;
   inject: IToken<Origins>[];
};

export type DynamicModuleConfig<
  Supplier extends IModule<IModuleRegistry>,
  Origins extends IModule<IModuleRegistry>,
  Consumer extends IModule<IModuleRegistry>,
  RequiredImports extends IToken<Supplier> = never,
  OptionalImports extends IToken<Supplier> = never,
  Exports extends IToken<Supplier> = never
> = {
   imports: {
      [K in RequiredImports]: IBoundDynamicModuleImport<Supplier, K, Origins>
   } & {
      [K in OptionalImports]?: IBoundDynamicModuleImport<Supplier, K, Origins>
   },
   exports: {
      [K in Exports]?: IBoundDynamicModuleExport<Supplier, K, Consumer>
   },
};
