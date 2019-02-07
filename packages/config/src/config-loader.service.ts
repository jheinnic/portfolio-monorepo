import { Inject, Injectable } from '@nestjs/common';
import { transformAndValidateSync } from 'class-transformer-validator';
import { defaultMetadataStorage } from 'class-transformer/storage';
import { MetadataMap } from '@loopback/metadata';
import { ConstructorFor } from 'simplytyped';

import { Wild } from '@jchptf/api';
import { ConfigPropertyMarker } from './decorators/config-property-marker.interface';
import { IConfigReader, IConfigLoader, IConfigMetadataHelper } from './interfaces';
import { CONFIG_METADATA_HELPER_PROVIDER } from './di';
import { illegalState } from '@thi.ng/errors';

@Injectable()
export class ConfigLoader implements IConfigLoader
{
   // private mapToDefaults: Immutable.Map<ConstructorFor<any>, any>;

   constructor(
      @Inject(CONFIG_METADATA_HELPER_PROVIDER)
      private readonly configMetaHelper: IConfigMetadataHelper)
   {
      // this.mapToDefaults = Immutable.Map.of();
   }

   public loadInstance<T extends object>(
      configClass: ConstructorFor<T>,
      configReader: IConfigReader,
      fromRoot?: string,
   ): T|undefined
   {
      const propMap: MetadataMap<ConfigPropertyMarker> =
         this.configMetaHelper.getPropertyMetadata(configClass);
      const actualRoot =
         !!fromRoot ? fromRoot : this.configMetaHelper.getPropertyRoot(configClass);
      const configRoot: any = configReader.readConfigKey(actualRoot, undefined);

      if (! configRoot) {
         console.warn(
            `Skipping node with no loadable content: ${configRoot}: ${configClass.name}`);
         return undefined;
      }

      const resolvedConfig: Wild = {};
      let nextEntry;
      for (nextEntry in propMap) {
         const nextEntryPropMeta = propMap[nextEntry];
         const configKey = nextEntryPropMeta.configKey;
         let readConfig = configRoot[configKey];

         const nextEntryTypeMeta =
            defaultMetadataStorage.findTypeMetadata(configClass, nextEntry);
         if (!! nextEntryTypeMeta) {
            if (!(readConfig instanceof Array))
            {
               const childClass = nextEntryTypeMeta.reflectedType;

               readConfig =
                  this.loadInstance(
                     childClass, configReader, ConfigLoader.appendToRootKey(actualRoot, configKey));
            } else {
               const arrayRootKey = ConfigLoader.appendToRootKey(actualRoot, configKey);
               const arrayClass = nextEntryTypeMeta.typeFunction() as ConstructorFor<any>;

               readConfig =
                  readConfig.map(
                     (_: any, index: number) => {
                        return this.loadInstance(
                           arrayClass, configReader,
                           ConfigLoader.appendToRootKey(arrayRootKey, `${index}`));
                     },
                  );
            }
         }

         resolvedConfig[nextEntry] =
            readConfig === undefined
               ? (
                  nextEntryPropMeta.defaultValue === undefined
                     ? readConfig : nextEntryPropMeta.defaultValue
               )
               : readConfig;
      }

      let retVal: T;
      try {
         retVal = transformAndValidateSync(
            configClass, resolvedConfig, {
               validator: {
                  forbidUnknownValues: true,
                  skipMissingProperties: false,
               },
            },
         );
      } catch (err) {
         console.error(
            `Failed to transform and validate ${configClass.name} instance from ${fromRoot}: `
            + `${JSON.stringify(err)}`);
         throw illegalState(
            `Failed to transform and validate ${configClass.name} instance from ${fromRoot}: `
            + `${JSON.stringify(err)}`);
      }

      return retVal;
   }

   private static appendToRootKey(rootKey: string, suffix: string): string
   {
      if (!rootKey) {
         return suffix;
      }

      return `${rootKey}.${suffix}`;
   }
}
