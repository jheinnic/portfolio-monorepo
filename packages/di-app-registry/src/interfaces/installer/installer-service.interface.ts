import {IContainerRegistryInstallerClient} from './container-registry-installer-client.interface';

export interface InstallerService<In, Out>
{
   install(client: IContainerRegistryInstallerClient, imports: In): Out;
}
