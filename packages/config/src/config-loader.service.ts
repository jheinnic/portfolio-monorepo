import {transformAndValidateSync} from 'class-transformer-validator';
import {MetadataInspector, MetadataMap} from '@loopback/metadata';
import {ConstructorFor} from 'simplytyped';
import {DotenvConfigOptions} from 'dotenv';
import * as Immutable from 'immutable';

import {Wild} from '@jchptf/api';

import {CONFIG_CLASS_MARKER_KEY, ConfigClassMarker} from './decorators/config-class-marker.interface';
import {CONFIG_PROPERTY_MARKER_KEY, ConfigPropertyMarker} from './decorators/config-property-marker.interface';
import {ConfigFileReaderService} from './config-file-reader.service';
import {IConfigFileReader} from './interfaces/config-file-reader.interface';
import {IConfigLoader} from './interfaces/config-loader.interface';


export class ConfigLoader implements IConfigLoader
{
   private static INSTANCE: ConfigLoader;

   private static READER: IConfigFileReader;

   public static getInstance(): IConfigLoader
   {
      if (!ConfigLoader.INSTANCE) {
         ConfigLoader.setDotEnvOptions();
      }

      return ConfigLoader.INSTANCE;
   }

   public static getFileReader(): IConfigFileReader
   {
      if (! ConfigLoader.INSTANCE) {
         ConfigLoader.setDotEnvOptions();
      }

      return ConfigLoader.READER;
   }
   /**
    * Call this once before the first call to {@link IConfigLoader.getInstance()} to override any of
    * dotenv's default configuration options before they are used to bootstrap the location of
    * IConfigLoader's bootstrap data location.
    *
    * @param options
    */
   public static setDotEnvOptions(options?: DotenvConfigOptions)
   {
      if (!! ConfigLoader.INSTANCE) {
         throw new Error('Dotenv options must be set before the configuration library is bootstrapped');
      }

      // TODO: Multiple calls?  Deep clone?
      const dotenvOptions: DotenvConfigOptions = (! options) ? {} : {...options};
      const reader: IConfigFileReader = new ConfigFileReaderService(dotenvOptions);

      ConfigLoader.INSTANCE = new ConfigLoader(reader);
      ConfigLoader.READER = reader;
   }

   private mapToDefaults: Immutable.Map<ConstructorFor<any>, any>;

   constructor(protected readonly configFileReader: IConfigFileReader)
   {
      this.configFileReader.bootstrap();
      this.mapToDefaults = Immutable.Map.of();
   }

   /**
    * A public name alias for {@link #loadInstance(cons)}.
    *
    * @param cons
    */
   public get<T extends object>(cons: ConstructorFor<T>): T | undefined {
      return this.loadInstance(cons);
   }

   public hasConfigMetadata<T extends object>(cons: Function): cons is ConstructorFor<T>
   {
      const configClassMeta: ConfigClassMarker<T> | undefined =
         MetadataInspector.getClassMetadata(CONFIG_CLASS_MARKER_KEY, cons);

      return !! configClassMeta;
   }

   public loadInstance<T extends object>(configClass: ConstructorFor<T>, rootProperty?: string): T
   {
      console.log('load instance!');
      console.log(configClass);

      const configClassMeta: ConfigClassMarker<T> = this.getConfigClassMarker(configClass);

      let actualRoot = (! rootProperty) ? configClassMeta.defaultRoot : rootProperty;
      if (!! actualRoot) {
         actualRoot = `${actualRoot}.`;
      } else {
         actualRoot = '';
      }

      const propMap: MetadataMap<ConfigPropertyMarker> | undefined =
         MetadataInspector.getAllPropertyMetadata(
            CONFIG_PROPERTY_MARKER_KEY, configClass.prototype);
      const resolvedConfig: Wild = {};

      if (!! propMap) {
         let nextEntry: string;
         for (nextEntry in propMap) {
            const nextEntryMeta: ConfigPropertyMarker = propMap[nextEntry];
            const configKey = `${actualRoot}${nextEntryMeta.configKey}`;
            resolvedConfig[nextEntry] =
               this.configFileReader.readConfigKey(
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
               skipMissingProperties: false
            }
         }
      );
   }

   protected getConfigClassMarker<T extends object>(configClass: ConstructorFor<T>): ConfigClassMarker<T>
   {
      const configClassMeta: ConfigClassMarker<T> | undefined =
         MetadataInspector.getClassMetadata(CONFIG_CLASS_MARKER_KEY, configClass);
      if (! configClassMeta) {
         throw new Error(`${configClass} has no @configClass decorator`);
      }

      return configClassMeta;
   }
}