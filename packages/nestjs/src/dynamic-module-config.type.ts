
import { IFactoryMethod } from '@jchptf/api';

import { IHaveRegistries, IModule, IToken, ITokenProvidingTokens, ITokenType } from './module';
import { ArgsAsInjectableKeys } from "./injectable-key";

export interface IBoundDynamicModuleExport<
    Supplier extends IModule<never>, Token extends IToken<Supplier>, Origins extends IHaveRegistries
> {
   exportTo: ITokenProvidingTokens<Token, Origins>;
}

export enum DynamicProviderBindingStyle
{
   VALUE= 0,
   CLASS= 1,
   EXISTING = 2,
   INJECTED_FACTORY = 3,
}

// export type IBoundDynamicModuleImport<
//   Supplier extends IHasRegistry,
//   Token extends IToken<Supplier>,
//   Origins extends [...IHasRegistry[]]
// > =
//   IAsValue<Supplier, Token> |
//   IAsClass<Supplier, Token> |
//   IFromExisting<Supplier, Token, Origins> |
//   IByFactoryCall<Supplier, Token, Origins>
// ;

export type IAsValue<Supplier extends IModule<never>, Token extends IToken<Supplier>> =
{
   style: DynamicProviderBindingStyle.VALUE;
   useValue: ITokenType<Token>;
};

export type IAsClass<Supplier extends IModule<never>, Token extends IToken<Supplier>> =
{
   style: DynamicProviderBindingStyle.CLASS;
   useClass: ITokenType<Token>;
};

export type IFromExisting<Supplier extends IModule<never>,
  Token extends IToken<Supplier>, Origins extends IHaveRegistries> = {
   style: DynamicProviderBindingStyle.EXISTING;
   useExisting: ITokenProvidingTokens<Token, Origins>
};

export type IByFactoryCall<Supplier extends IModule<never>,
  Token extends IToken<Supplier>,
  Factory extends IFactoryMethod<ITokenType<Token>, any[]>,
  Origins extends IHaveRegistries> = {
   style: DynamicProviderBindingStyle.INJECTED_FACTORY;
   useFactory: Factory
   inject: ArgsAsInjectableKeys<Factory, Origins>
};

// export type DynamicModuleConfig<
//   Supplier extends IHasRegistry,
//   Origins extends IHasRegistry,
//   Consumer extends IHasRegistry,
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
