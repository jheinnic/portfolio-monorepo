import {PropertyDecoratorFactory} from '@loopback/metadata';
import {CONFIG_PROPERTY_MARKER_KEY} from './config-property-marker.interface';

export function configProp(configKey: string, defaultValue?: any) {
   return PropertyDecoratorFactory.createDecorator(
      CONFIG_PROPERTY_MARKER_KEY, {configKey, defaultValue});
}