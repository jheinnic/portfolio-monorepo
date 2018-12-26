import {MetadataAccessor} from '@loopback/metadata';
import {ProviderToken} from '@jchptf/api';

export interface ConfigClassMarker<T extends object> {
   readonly defaultRoot?: string;
   readonly providerToken?: ProviderToken<T>
}

export const CONFIG_CLASS_MARKER_KEY =
   MetadataAccessor.create<ConfigClassMarker<any>, ClassDecorator>(
      'config-class-marker-key');