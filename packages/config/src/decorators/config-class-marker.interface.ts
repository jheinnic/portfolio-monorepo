import {MetadataAccessor} from '@loopback/metadata';
import {ProviderToken} from '../interfaces/injection-token.type';

export interface ConfigClassMarker {
   readonly defaultRoot?: string;
   readonly providerToken?: ProviderToken<any>
}

export const CONFIG_CLASS_MARKER_KEY =
   MetadataAccessor.create<ConfigClassMarker, ClassDecorator>(
      'config-class-marker-key');