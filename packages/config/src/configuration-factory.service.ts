import {transformAndValidateSync} from 'class-transformer-validator';
import {MetadataInspector, MetadataMap} from '@loopback/metadata';
import {Inject, Injectable} from '@nestjs/common';
import {ConstructorFor} from 'simplytyped';
import * as Immutable from 'immutable';

import {CONFIG_PROPERTY_MARKER_KEY, ConfigPropertyMarker} from './decorators/config-property-marker.interface';
import {CONFIG_CLASS_MARKER_KEY, ConfigClassMarker} from './decorators/config-class-marker.interface';
import {CONFIG_FILE_READER} from './di/config.constants';
import {IConfigurationFactory} from './interfaces/configuration-factory.interface';
import {IConfigFileReader} from './interfaces/config-file-reader.interface';
import {ProviderToken} from './interfaces/injection-token.type';
import {Wild} from '@jchptf/api';

@Injectable()
export class ConfigurationFactoryService implements IConfigurationFactory {
   private mapToDefaults: Immutable.Map<ConstructorFor<any>, any>;

   constructor(@Inject(CONFIG_FILE_READER) private readonly configReader: IConfigFileReader) {
      this.mapToDefaults = Immutable.Map.of();
   }

   public getProviderToken<T extends object>(configClass: ConstructorFor<T>): ProviderToken<T>|undefined
   {
      const configClassMeta: ConfigClassMarker | undefined =
         MetadataInspector.getClassMetadata(CONFIG_CLASS_MARKER_KEY, configClass);
      if (! configClassMeta) {
         throw new Error(`Invalid request--${configClassMeta} has no @configClass decorator`);
      }

      return configClassMeta.providerToken;
   }

   public hasProviderToken<T extends object>(configClass: ConstructorFor<T>): boolean
   {
      const configClassMeta: ConfigClassMarker | undefined =
         MetadataInspector.getClassMetadata(CONFIG_CLASS_MARKER_KEY, configClass);
      if (! configClassMeta) {
         throw new Error(`Invalid request--${configClassMeta} has no @configClass decorator`);
      }

      return (!! configClassMeta.providerToken);
   }

   public hasConfigMetadata <T extends object>(cons: Function): cons is ConstructorFor<T>
   {
      const configClassMeta: ConfigClassMarker | undefined =
         MetadataInspector.getClassMetadata(CONFIG_CLASS_MARKER_KEY, cons);
      return (!!configClassMeta);
   }

   public loadInstance<T extends object>(configClass: ConstructorFor<T>): T
   {
      console.log('load instance!');
      console.log(configClass);

      const configClassMeta: ConfigClassMarker | undefined =
         MetadataInspector.getClassMetadata(CONFIG_CLASS_MARKER_KEY, configClass);
      const actualRoot = (!!configClassMeta) ? configClassMeta.defaultRoot : undefined;

      const propMap: MetadataMap<ConfigPropertyMarker> | undefined =
         MetadataInspector.getAllPropertyMetadata(
            CONFIG_PROPERTY_MARKER_KEY, configClass.prototype);
      const resolvedConfig: Wild = {};

      if (!!propMap) {
         for (let nextEntry in propMap) {
            const configKey = `${actualRoot}.${propMap[nextEntry].configKey}`;
            resolvedConfig[nextEntry] =
               this.configReader.readConfigKey(configKey, propMap[nextEntry].defaultValue);
         }
      }

      let baseline: T = this.mapToDefaults.get(configClass);
      if (!baseline) {
         baseline = new configClass();
         this.mapToDefaults.set(configClass, baseline);
      }

      return transformAndValidateSync(
         configClass, Object.assign({}, baseline, resolvedConfig), {
            validator: {
               forbidUnknownValues: true,
               skipMissingProperties: false
            }
         });
   }
}