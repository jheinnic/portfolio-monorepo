import {IContainerRegistryInstallerClient} from './module-installer-client.interface';
import {IContainerRegistryInternal} from '../container-registry-internal.interface';
import {ContainerRegistry} from '../..';
import {DI_TYPES} from '../../types';

const registry = ContainerRegistry.getInstance() as
   unknown as IContainerRegistryInternal;
const { lazyInject } = registry.getInternalLazyDecorators();

export abstract class InstallerService
{
   @lazyInject(DI_TYPES.InstallerClient)
   // @ts-ignore
   protected readonly client: IContainerRegistryInstallerClient;
}
