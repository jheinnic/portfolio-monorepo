import {ClassDecoratorFactory} from '@loopback/metadata';
import {interfaces} from 'inversify';

import {CONFIG_CLASS_MARKER_KEY} from './config-class-marker.interface';
import {ContainerRegistry} from '../services/container-registry.service';
import {ConstructorFunction} from 'simplytyped';

export function configClass(defaultRoot?: string, diType?: interfaces.ServiceIdentifier<any>) {
   const delegate = ClassDecoratorFactory.createDecorator(
      CONFIG_CLASS_MARKER_KEY, {defaultRoot, diType});
   if (!diType) {
      return delegate;
   }

   return <TFunction extends ConstructorFunction<any>>(target: TFunction): void => {
      delegate(target);
      const registry = ContainerRegistry.getInstance() as
         unknown as IContainerRegistryInternal;
      registry.registerConfig(target, diType);
   }
}
