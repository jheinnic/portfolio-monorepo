import 'reflect-metadata';
import {ContainerRegistry} from '../src';
import {TwoLibsApp} from './fixtures/apps/two-libs.app';
import {
   FIXTURE_DI_TYPES, FIXTURE_TYPES, registerLibraryModule, registerWidgetOneModule
} from './fixtures/di';
import {registerWidgetSharesLibOneApp} from './fixtures/di/applications/widget-shares-lib-one-app.installer';

const registry = ContainerRegistry.getInstance();
registry.registerInstallers(registerLibraryModule);
registry.registerInstallers(registerWidgetOneModule);
// registry.registerInstallers(registerTwoLibApp);
registry.registerInstallers(registerWidgetSharesLibOneApp);
registry.installApplication(FIXTURE_DI_TYPES.ApplicationInstaller);

const app: TwoLibsApp = registry.get(FIXTURE_TYPES.Application);
app.doStuff();
app.doStuff();

