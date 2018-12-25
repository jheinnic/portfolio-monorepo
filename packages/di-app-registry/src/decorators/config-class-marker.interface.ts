import {MetadataAccessor} from '@loopback/metadata';
import {IntentQualifier} from '../../../config/src/interfaces/injection-token.type';

export interface ConfigClassMarker {
   readonly defaultRoot?: string;
   readonly intentQualifier?: IntentQualifier
}

export const CONFIG_CLASS_MARKER_KEY =
   MetadataAccessor.create<ConfigClassMarker, ClassDecorator>(
      'config-class-marker-key');