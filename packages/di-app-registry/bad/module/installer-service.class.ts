import {ContainerRegistry, IContainerAccessFactory, InstallerRegistryClient} from '../../index';
import {IContainerRegistryInternal} from '../container-registry-internal.interface';
import {DI_TYPES} from '../../di/index';
import {IBagOf, IMapTo, IObjectOf} from '@jchptf/api';
import {interfaces} from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;

const registry = ContainerRegistry.getInstance() as
   unknown as IContainerRegistryInternal;
const { lazyInject } = registry.getInternalLazyDecorators();

export abstract class ResourceBundle<C extends any, I extends any = {}, E extends any = {}, P extends any = {}>
   implements ResourceBundleRef<C, I, E>
{
   @lazyInject(DI_TYPES.InstallerRegistryClient)
   protected readonly installerClient?: InstallerRegistryClient;

   @lazyInject(DI_TYPES.ContainerAccessFactory)
   protected readonly accessFactory?: IContainerAccessFactory;

   abstract importReferences(): IMapTo<ServiceIdentifier<any>, I>

   abstract exportServices(): IMapTo<ServiceIdentifier<any>, E>

   abstract pluginPoints(): IMapTo<ServiceIdentifier<any>, P>

   
}
