import { MetadataInspector, MetadataMap } from '@loopback/metadata';
import { ConstructorFor } from 'simplytyped';

import { ProviderToken } from '@jchptf/api';

import {
   CONFIG_CLASS_MARKER_KEY, ConfigClassMarker,
} from './decorators/config-class-marker.interface';
import {
   CONFIG_PROPERTY_MARKER_KEY, ConfigPropertyMarker,
} from './decorators/config-property-marker.interface';
import { illegalArgs } from '@thi.ng/errors';
import { IConfigMetadataHelper } from './interfaces';

export function hasConfigMetadata<T extends object>(configClass: ConstructorFor<T>): boolean
{
   const configClassMeta: ConfigClassMarker<T> | undefined =
      MetadataInspector.getClassMetadata(CONFIG_CLASS_MARKER_KEY, configClass);

   return !!configClassMeta;
}

export function hasProviderToken<T extends object>(configClass: ConstructorFor<T>): boolean
{
   if (!configClass) {
      throw illegalArgs('configClass argument must be defined.');
   }

   try {
      const configClassMeta: ConfigClassMarker<T> =
         getConfigClassMarker(configClass);

      return !!configClassMeta.providerToken;
   } catch {
      return false;
   }
}

export function getProviderToken<T extends object>(configClass: ConstructorFor<T>): ProviderToken<T>
{
   if (!configClass) {
      throw illegalArgs('configClass argument must be defined.');
   }

   const configClassMeta: ConfigClassMarker<T> =
      getConfigClassMarker(configClass);
   if (!configClassMeta.providerToken) {
      throw new Error(`${configClass} is decorated by @configClass, but omits a provider token`);
   }

   return configClassMeta.providerToken;
}

export function getPropertyMetadata<T extends object>(
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

export function getPropertyRoot<T extends object>(configClass: ConstructorFor<T>): string
{
   const configClassMeta = getConfigClassMarker(configClass);

   return !configClassMeta.defaultRoot ? '' : `${configClassMeta.defaultRoot}`;
}

export function getPropertyDesignType<T extends object>(sampleInst: T, propName: string): any
{
   return MetadataInspector.getDesignTypeForProperty(sampleInst, propName);
}

export function getConfigClassMarker<T extends object>(
   configClass: ConstructorFor<T>): ConfigClassMarker<T>
{
   const configClassMeta: ConfigClassMarker<T> | undefined =
      MetadataInspector.getClassMetadata(CONFIG_CLASS_MARKER_KEY, configClass);
   if (!configClassMeta) {
      throw new Error(`${configClass} has no @configClass decorator`);
   }

   return configClassMeta;
}

export const configMetadataHelper: IConfigMetadataHelper = {
   hasConfigMetadata,
   hasProviderToken,
   getProviderToken,
   getPropertyRoot,
   getPropertyMetadata,
   getPropertyDesignType,
};
