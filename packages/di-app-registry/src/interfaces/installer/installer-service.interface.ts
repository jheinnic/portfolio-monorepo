import {ConcreteFactoryService} from './concrete-factory-service.interface';
import {IContainerRegistryInstallerClient} from './container-registry-installer.interface';

export interface InstallerService<In, Out>
{
   install(client: IContainerRegistryInstallerClient, imports: In): Out;
}
