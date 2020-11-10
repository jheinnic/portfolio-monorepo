// import {IModule, IModuleRegistry, IToken} from '../module';
// import {
//    DynamicModuleConfig, DynamicProviderBindingStyle, IBoundDynamicModuleImport
// } from './dynamic-module-config.type';
// import {IDynamicModuleBuilder} from './dynamic-module-builder.interface';
//
// export function applyDynamicModuleConfig<
//   Supplier extends IModule<IModuleRegistry>,
//   Origins extends IModule<IModuleRegistry>,
//   Consumer extends IModule<IModuleRegistry>,
//   RequiredImports extends IToken<Supplier> = never,
//   OptionalImports extends IToken<Supplier> = never,
//   Exports extends IToken<Supplier> = never
// >(config: DynamicModuleConfig<Supplier, Origins, Consumer, RequiredImports, OptionalImports, Exports>,
//   builder: IDynamicModuleBuilder<
//     Supplier extends IModule<IModuleRegistry>,
//     Origins extends IModule<IModuleRegistry>,
//     Consumer extends IModule<IModuleRegistry>
//   >,
//   importTokens: (RequiredImports | OptionalImports)[],
//   exportTokens: Exports[]) {
//    let importKey: RequiredImports | OptionalImports;
//    let importIndex = 0;
//    const importCount = importTokens.length;
//    let importItem: IBoundDynamicModuleImport<Supplier, IToken<Supplier>, Consumer>;
//    while(importIndex < importCount) {
//       importKey = importTokens[importIndex];
//       importItem = config.imports[importKey];
