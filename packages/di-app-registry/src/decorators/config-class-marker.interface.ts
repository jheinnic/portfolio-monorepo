import {MetadataAccessor} from '@loopback/metadata';
import {interfaces} from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;

export interface ConfigClassMarker {
   readonly defaultRoot?: string;
   readonly diType?: ServiceIdentifier<any>
}

export const CONFIG_CLASS_MARKER_KEY =
   MetadataAccessor.create<ConfigClassMarker, ClassDecorator>(
      'config-class-marker-key');