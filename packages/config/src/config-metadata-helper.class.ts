import { MetadataInspector, MetadataMap } from '@loopback/metadata';
import { ConstructorFor } from 'simplytyped';

import { ProviderToken } from '@jchptf/api';

import {
   CONFIG_CLASS_MARKER_KEY, ConfigClassMarker,
} from './decorators/config-class-marker.interface';
import {
   CONFIG_PROPERTY_MARKER_KEY, ConfigPropertyMarker,
} from './decorators/config-property-marker.interface';
import { IConfigMetadataHelper } from './interfaces';
import { illegalArgs } from '@thi.ng/errors';

export class ConfigMetadataHelper implements IConfigMetadataHelper
{
   private constructor() { }

   private static INSTANCE: ConfigMetadataHelper = new ConfigMetadataHelper();

   public static getInstance()
   {
      return ConfigMetadataHelper.INSTANCE;
   }

   public static isConfigConstructor<T extends object>(cons: Function): cons is ConstructorFor<T>
   {
      const configClassMeta: ConfigClassMarker<T> | undefined =
         MetadataInspector.getClassMetadata(CONFIG_CLASS_MARKER_KEY, cons);

      return !!configClassMeta;
   }

   public hasConfigMetadata<T extends object>(configClass: ConstructorFor<T>): boolean
   {
      return ConfigMetadataHelper.isConfigConstructor(configClass);
   }

   public hasProviderToken<T extends object>(configClass: ConstructorFor<T>): boolean
   {
      if (!configClass) {
         throw illegalArgs('configClass argument must be defined.');
      }

      try {
         const configClassMeta: ConfigClassMarker<T> =
            ConfigMetadataHelper.getConfigClassMarker(configClass);

         return !!configClassMeta.providerToken;
      } catch {
         return false;
      }
   }

   public getProviderToken<T extends object>(configClass: ConstructorFor<T>): ProviderToken<T>
   {
      if (!configClass) {
         throw illegalArgs('configClass argument must be defined.');
      }

      const configClassMeta: ConfigClassMarker<T> =
         ConfigMetadataHelper.getConfigClassMarker(configClass);
      if (!configClassMeta.providerToken) {
         throw new Error(`${configClass} is decorated by @configClass, but omits a provider token`);
      }

      return configClassMeta.providerToken;
   }

   public getPropertyMetadata<T extends object>(
      configClass: ConstructorFor<T>): MetadataMap<ConfigPropertyMarker>
   {
      const propMap: MetadataMap<ConfigPropertyMarker> | undefined =
         MetadataInspector.getAllPropertyMetadata(
            CONFIG_PROPERTY_MARKER_KEY, configClass.prototype);

      if (!propMap) {
         throw new Error(`${configClass} has no @configProperty decorators`);
      }

      return propMap;
   }

   public getPropertyRoot<T extends object>(configClass: ConstructorFor<T>): string
   {
      const configClassMeta = ConfigMetadataHelper.getConfigClassMarker(configClass);

      return !configClassMeta.defaultRoot ? '' : `${configClassMeta.defaultRoot}`;
   }

   public getPropertyDesignType<T extends object>(sampleInst: T, propName: string): any {
      return MetadataInspector.getDesignTypeForProperty(sampleInst, propName);
   }

   private static getConfigClassMarker<T extends object>(
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
