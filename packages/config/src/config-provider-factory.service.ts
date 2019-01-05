import {MetadataInspector} from '@loopback/metadata';
import {ConstructorFor} from 'simplytyped';
import {illegalArgs} from '@thi.ng/errors';

import {ProviderToken} from '@jchptf/api';
import {CONFIG_CLASS_MARKER_KEY, ConfigClassMarker} from './decorators/config-class-marker.interface';
import {IConfigFileReader} from './interfaces/config-file-reader.interface';
import {IConfigProviderFactory} from './interfaces';
import {ConfigLoader} from './config-loader.service';

export class ConfigProviderFactoryService extends ConfigLoader implements IConfigProviderFactory {
   constructor(fileReader: IConfigFileReader)
   {
      super(fileReader);
   }

   public getProviderToken<T extends object>(configClass: ConstructorFor<T>): ProviderToken<T>
   {
      if (! configClass) {
         throw illegalArgs('configClass argument must be defined.');
      }

      const configClassMeta: ConfigClassMarker<T> | undefined =
         MetadataInspector.getClassMetadata(CONFIG_CLASS_MARKER_KEY, configClass);
      if (! configClassMeta) {
         throw new Error(`${configClass} has no @configClass decorator`);
      }
      if (! configClassMeta.providerToken) {
         throw new Error(`${configClass} is decorated by @configClass, but omits a provider token`);
      }

      return configClassMeta.providerToken;
   }

   public hasProviderToken<T extends object>(configClass: ConstructorFor<T>): boolean
   {
      if (! configClass) {
         throw illegalArgs('configClass argument must be defined.');
      }

      const configClassMeta: ConfigClassMarker<T> | undefined =
         MetadataInspector.getClassMetadata(CONFIG_CLASS_MARKER_KEY, configClass);
      if (! configClassMeta) {
         throw new Error(`Invalid request--${configClassMeta} has no @configClass decorator`);
      }

      return !! configClassMeta.providerToken;
   }
}