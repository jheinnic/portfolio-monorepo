import {IBagOf} from '@jchptf/api';

type DITypes = 'ConfigLoader' | 'NestedContainer' | 'InstallationActivityFactory' | 'InstallServiceAdapter' | 'ContainerRegistryInternal' | 'ContainerAccessFactory'; // |
// 'ContainerModuleCallBack'|
// 'ModuleRegistry' |
// 'ContainerModule' |
// 'Application';

export const DI_TYPES: IBagOf<symbol, DITypes> = {
   // ContainerModuleCallBack: Symbol.for('ContainerModuleCallBack'),
   // ModuleRegistry: Symbol.for('ModuleRegistry'),
   // ContainerModule: Symbol.for('ContainerModule'),
   // Application: Symbol.for('Application'),
   ConfigLoader: Symbol.for('ConfigLoader'),
   InstallationActivityFactory: Symbol.for('InstallationActivityFactory'),
   InstallServiceAdapter: Symbol.for('InstallServiceAdapter'),
   ContainerRegistryInternal: Symbol.for('ContainerRegistryInternal'),
   ContainerAccessFactory: Symbol.for('ContainerAccessFactory'),
   NestedContainer: Symbol.for('NestedContainer')
};
