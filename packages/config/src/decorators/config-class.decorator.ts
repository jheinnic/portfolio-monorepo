import { ClassDecoratorFactory } from '@loopback/metadata';

import { CONFIG_CLASS_MARKER_KEY } from './config-class-marker.interface';

export function configClass(defaultRoot?: string) {
   return ClassDecoratorFactory.createDecorator(
      CONFIG_CLASS_MARKER_KEY,
      { defaultRoot },
   );
}
