import {MetadataAccessor} from '@loopback/metadata';

export interface ConfigPropertyMarker {
   readonly configKey: string;
}

export const CONFIG_PROPERTY_MARKER_KEY =
   MetadataAccessor.create<ConfigPropertyMarker, PropertyDecorator>(
      'config-property-marker-key');