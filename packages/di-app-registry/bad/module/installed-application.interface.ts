import {IContainerAccessStrategy} from './container-access-strategy.interface';
import {IApplicationLauncher} from '../../src/interfaces/composite/application-composite.interface';

export interface InstalledApplication<App extends IApplicationLauncher> {
   launcherAccess: IContainerAccessStrategy<App>;
}