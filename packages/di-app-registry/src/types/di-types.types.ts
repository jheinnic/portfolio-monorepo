import {IBagOf} from '@jchptf/api';

type DITypes = 'ContainerModuleCallBack'| 'ModuleRegistry' | 'ContainerModule' | 'Application';

export const DI_TYPES: IBagOf<symbol, DITypes> = {
   ContainerModuleCallBack: Symbol.for('ContainerModuleCallBack'),
   ModuleRegistry: Symbol.for('ModuleRegistry'),
   ContainerModule: Symbol.for('ContainerModule'),
   Application: Symbol.for('Application')
};
