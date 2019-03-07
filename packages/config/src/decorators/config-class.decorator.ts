import {ClassDecoratorFactory} from '@loopback/metadata';

import {CONFIG_CLASS_MARKER_KEY} from './config-class-marker.interface';

export function configClass( defaultRoot?: string ) {
   return ClassDecoratorFactory.createDecorator(
      CONFIG_CLASS_MARKER_KEY,
      { defaultRoot }
   );
   // if (! providerToken) {
   //    return delegate;
   // }
   //
   // return <TFunction extends ConstructorFunction<any>>(target: TFunction): void => {
   //    delegate(target);
   //    const registry = ContainerRegistry.getInstance() as
   //       unknown as IContainerRegistryInternal;
   //    registry.registerConfig(target, diType);
   // }
}
