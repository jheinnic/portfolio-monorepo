import {MetadataAccessor} from '@loopback/metadata';

export interface ConfigClassMarker {
   readonly defaultRoot?: string;
}

export const CONFIG_CLASS_MARKER_KEY =
   MetadataAccessor.create<ConfigClassMarker, ClassDecorator>(
      'config-class-marker-key');