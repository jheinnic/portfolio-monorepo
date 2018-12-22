import {SymbolEnum} from '@jchptf/api';

type DITypes = 'ConfigLoader' | 'NestedContainer' | 'InstallerRegistryClient' |  'ResourceBundle' | 'ExecutableExtension' | 'ContainerRegistryInternal' | 'ContainerAccessFactory'; // |
// 'ContainerModuleCallBack'|
// 'ModuleRegistry' |
// 'ContainerModule' |
// 'Application';

export const DI_TYPES: SymbolEnum<DITypes> = {
   // ContainerModuleCallBack: Symbol.for('ContainerModuleCallBack'),
   // ModuleRegistry: Symbol.for('ModuleRegistry'),
   // ContainerModule: Symbol.for('ContainerModule'),
   // Application: Symbol.for('Application'),
   ConfigLoader: Symbol.for('ConfigLoader'),
   // InstallationActivityFactory: Symbol.for('InstallationActivityFactory'),
   ResourceBundle: Symbol.for('ResourceBundle'),
   ExecutableExtension: Symbol('ExecutableExtension'),
   ContainerRegistryInternal: Symbol.for('ContainerRegistryInternal'),
   ContainerAccessFactory: Symbol.for('ContainerAccessFactory'),
   InstallerRegistryClient: Symbol.for('InstallerRegistryClient'),
   NestedContainer: Symbol.for('NestedContainer')
};
