import {ICompositionRootClient} from './composition-root-client.interface';
import {ContainerRegistry, DI_TYPES} from '../..';

export abstract class CompositionRoot
{
   @ContainerRegistry.getLazyInjectors().lazyInject(DI_TYPES.InstallerRegistryClient)
   // @ts-ignore
   protected readonly registry: ICompositionRootClient;

   abstract initialize(): void;

   abstract registerComponents(): void
}