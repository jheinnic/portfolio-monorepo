import { transformAndValidateSync } from 'class-transformer-validator';
import { MetadataInspector, MetadataMap } from '@loopback/metadata';
import { ConstructorFor } from 'simplytyped';
import { DotenvConfigOptions } from 'dotenv';
import * as Immutable from 'immutable';

import { ProviderToken, Wild } from '@jchptf/api';

import {
   CONFIG_CLASS_MARKER_KEY, ConfigClassMarker,
} from './decorators/config-class-marker.interface';
import {
   CONFIG_PROPERTY_MARKER_KEY, ConfigPropertyMarker,
} from './decorators/config-property-marker.interface';
import { IConfigFileReader, IConfigLoader } from './interfaces';
import { illegalArgs } from '@thi.ng/errors';

export class ConfigLoader implements IConfigLoader
{
   private mapToDefaults: Immutable.Map<ConstructorFor<any>, any>;

   constructor()
   {
      // this.configFileReader.bootstrap();
      this.mapToDefaults = Immutable.Map.of();
   }

   public hasConfigMetadata<T extends object>(cons: Function): cons is ConstructorFor<T>
   {
      const configClassMeta: ConfigClassMarker<T> | undefined =
         MetadataInspector.getClassMetadata(CONFIG_CLASS_MARKER_KEY, cons);

      return !!configClassMeta;
   }

   public loadInstance<T extends object>(
      configClass: ConstructorFor<T>, configReader: IConfigFileReader): T
   {
      const configClassMeta: ConfigClassMarker<T> = this.getConfigClassMarker(configClass);

      let actualRoot = configClassMeta.defaultRoot;
      actualRoot = !actualRoot ? '' : `${actualRoot}.`;

      const propMap: MetadataMap<ConfigPropertyMarker> | undefined =
         MetadataInspector.getAllPropertyMetadata(
            CONFIG_PROPERTY_MARKER_KEY, configClass.prototype);
      const resolvedConfig: Wild = {};

      if (!!propMap) {
         let nextEntry: string;
         for (nextEntry in propMap) {
            const nextEntryMeta: ConfigPropertyMarker = propMap[nextEntry];
            const configKey = `${actualRoot}${nextEntryMeta.configKey}`;
            resolvedConfig[nextEntry] =
               configReader.readConfigKey(
                  configKey, nextEntryMeta.defaultValue);
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
               skipMissingProperties: false,
            },
         },
      );
   }

   public getProviderToken<T extends object>(configClass: ConstructorFor<T>): ProviderToken<T>
   {
      if (!configClass) {
         throw illegalArgs('configClass argument must be defined.');
      }

      const configClassMeta: ConfigClassMarker<T> | undefined =
         MetadataInspector.getClassMetadata(CONFIG_CLASS_MARKER_KEY, configClass);
      if (!configClassMeta) {
         throw new Error(`${configClass} has no @configClass decorator`);
      }
      if (!configClassMeta.providerToken) {
         throw new Error(`${configClass} is decorated by @configClass, but omits a provider token`);
      }

      return configClassMeta.providerToken;
   }

   public hasProviderToken<T extends object>(configClass: ConstructorFor<T>): boolean
   {
      if (!configClass) {
         throw illegalArgs('configClass argument must be defined.');
      }

      const configClassMeta: ConfigClassMarker<T> | undefined =
         MetadataInspector.getClassMetadata(CONFIG_CLASS_MARKER_KEY, configClass);
      if (!configClassMeta) {
         throw new Error(`Invalid request--${configClassMeta} has no @configClass decorator`);
      }

      return !!configClassMeta.providerToken;
   }

   protected getConfigClassMarker<T extends object>(
      configClass: ConstructorFor<T>): ConfigClassMarker<T>
   {
      const configClassMeta: ConfigClassMarker<T> | undefined =
         MetadataInspector.getClassMetadata(CONFIG_CLASS_MARKER_KEY, configClass);
      if (!configClassMeta) {
         throw new Error(`${configClass} has no @configClass decorator`);
      }

      return configClassMeta;
   }
}
