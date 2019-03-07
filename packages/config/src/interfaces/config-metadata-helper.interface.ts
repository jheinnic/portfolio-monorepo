import {ConstructorFor} from 'simplytyped';
import { MetadataMap } from '@loopback/metadata';

import { ConfigPropertyMarker } from '../decorators/config-property-marker.interface';

export interface IConfigMetadataHelper
{
   hasConfigMetadata<T extends object>(configClass: ConstructorFor<T>): boolean;

   // hasProviderToken<T extends object>(configClass: ConstructorFor<T>): boolean;

   // getProviderToken<T extends object>(configClass: ConstructorFor<T>): ProviderToken<T>;

   getPropertyRoot<T extends object>(configClass: ConstructorFor<T>): string;

   getPropertyMetadata<T extends object>(
      configClass: ConstructorFor<T>): MetadataMap<ConfigPropertyMarker>;

   getPropertyDesignType<T extends object>(sampleInst: T, propName: string): any;
}
