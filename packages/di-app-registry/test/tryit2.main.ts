import 'reflect-metadata';
import {ContainerRegistry} from '../src';
import {registerLibraryModule} from './fixtures/di/installers/library-module.installer';
import {registerTwoLibApp} from './fixtures/di/applications/two-lib-app.installer';
import {APP_DI_TYPES, TwoLibsApp} from './fixtures/apps/two-libs.app';
import {FIXTURE_DI_TYPES, FIXTURE_TYPES} from './fixtures/di/types';

const registry = ContainerRegistry.getInstance();
registry.registerInstallers(registerLibraryModule);
registry.registerInstallers(registerTwoLibApp);
registry.installApplication(FIXTURE_DI_TYPES.ApplicationInstaller);

const app: TwoLibsApp = registry.get(FIXTURE_TYPES.Application);
app.doStuff();
app.doStuff();

