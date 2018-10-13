import {IBagOf} from '@jchptf/api';

type DITypes = 'ModuleRegistry' | 'ContainerModule' | 'Application';

export const DI_TYPES: IBagOf<symbol, DITypes> = {
   ModuleRegistry: Symbol.for('ModuleRegistry'),
   ContainerModule: Symbol.for('ContainerModule'),
   Application: Symbol.for('Application')
};
