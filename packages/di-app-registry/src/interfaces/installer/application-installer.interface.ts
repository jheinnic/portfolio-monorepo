import {InstallerRegistryClient} from './installer-registry-client.interface';
import {IContainerRegistryInternal} from '../container-registry-internal.interface';
import {ContainerRegistry} from '../..';
import {DI_TYPES} from '../../types';

const registry = ContainerRegistry.getInstance() as
   unknown as IContainerRegistryInternal;
const { lazyInject } = registry.getInternalLazyDecorators();

export abstract class ApplicationInstaller
{
   @lazyInject(DI_TYPES.InstallerRegistryClient)
   // @ts-ignore
   protected readonly client: InstallerRegistryClient;
}
