import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { toArray } from 'rxjs/operators';
import { DotenvConfigOptions } from 'dotenv';

import { AsyncModuleParam, asyncProviderFromParam, ModuleIdentifier } from '@jchptf/api';

import { IConfigClassFinder } from '../interfaces';
import { ConfigClassFinder } from '../config-class-finder.class';
import { CONFIG_METADATA_HELPER } from '../config-metadata-helper.const';
import {
   CONFIG_READER_PROVIDER, CONFIG_LOADER_PROVIDER, DOTENV_CONFIG_OPTIONS,
   CONFIG_METADATA_HELPER_PROVIDER,
} from './config.constants';
import { ConfigLoader } from '../config-loader.service';
import { ConfigReader } from '../config-reader.service';

@Global()
@Module({})
export class ConfigModule
{
   protected static defaultGlob: string = 'config/**/!(*.d).{ts,js}';

   static forRoot(dotenvConfig: DotenvConfigOptions): DynamicModule
   {
      return ConfigModule.withDotenvProvider(
         [{
            provide: DOTENV_CONFIG_OPTIONS,
            useValue: dotenvConfig,
         }]
      );
   }

   static forRootAsync(
      asyncDotenvConfig: AsyncModuleParam<DotenvConfigOptions>): DynamicModule
   {
      const dotenvProviders =
         asyncProviderFromParam(DOTENV_CONFIG_OPTIONS, asyncDotenvConfig);

      return ConfigModule.withDotenvProvider(dotenvProviders);
   }

   static async forRootWithFeature(
      dotenvConfig: DotenvConfigOptions,
      moduleId: ModuleIdentifier,
      loadConfigGlob: string,
      resolveGlobRoot?: string): Promise<DynamicModule>
   {
      const featureProviders = await ConfigModule.fromFeature(
         moduleId, loadConfigGlob, resolveGlobRoot
      );

      return ConfigModule.withDotenvProvider(
         [{
            provide: DOTENV_CONFIG_OPTIONS,
            useValue: dotenvConfig,
         }],
         featureProviders
      );
   }

   static async forRootWithFeatureAsync(
      asyncDotenvConfig: AsyncModuleParam<DotenvConfigOptions>,
      moduleId: ModuleIdentifier,
      loadConfigGlob: string,
      resolveGlobRoot?: string): Promise<DynamicModule>
   {
      const dotenvProviders =
         asyncProviderFromParam(DOTENV_CONFIG_OPTIONS, asyncDotenvConfig);
      const featureProviders = await ConfigModule.fromFeature(
         moduleId, loadConfigGlob, resolveGlobRoot
      );

      return ConfigModule.withDotenvProvider(
         dotenvProviders, featureProviders
      );
   }

   public static async forFeature(
      moduleId: ModuleIdentifier,
      loadConfigGlob: string,
      resolveGlobRoot?: string): Promise<DynamicModule>
   {
      const featureProviders = await ConfigModule.fromFeature(
         moduleId, loadConfigGlob, resolveGlobRoot
      );

      return {
         module: ConfigModule,
         providers: featureProviders,
         exports: featureProviders
      };
   }

   private static withDotenvProvider(
      dotenvProviders: Provider[], featureProviders: Provider[] = []
   ): DynamicModule
   {
      return {
         module: ConfigModule,
         imports: [],
         providers: [
            ...dotenvProviders,
            ...STANDARD_PROVIDERS,
            ...featureProviders,
         ],
         exports: [
            ...featureProviders,
         ],
      };
   }

   private static async fromFeature(
      moduleId: ModuleIdentifier,
      loadConfigGlob: string,
      resolveGlobRoot?: string): Promise<Provider[]>
   {
      const configClassFinder: IConfigClassFinder =
         new ConfigClassFinder(moduleId, loadConfigGlob, resolveGlobRoot);

      // These are the per-configuration object providers that
      const configProviders: Provider[] =
         await configClassFinder.loadConfigAsync()
            .pipe(
               toArray(),
            )
            .toPromise();

      console.log(configProviders);
      return configProviders;
   }

}

const STANDARD_PROVIDERS = [
   {
      provide: CONFIG_METADATA_HELPER_PROVIDER,
      useValue: CONFIG_METADATA_HELPER,
   },
   {
      provide: CONFIG_READER_PROVIDER,
      useFactory: async (dotEnvConfig?: (DotenvConfigOptions | false)) => {
         const retVal = new ConfigReader(dotEnvConfig);
         retVal.bootstrap();
         return retVal;
      },
      inject: [DOTENV_CONFIG_OPTIONS],
   },
   {
      provide: CONFIG_LOADER_PROVIDER,
      useClass: ConfigLoader,
   },
];
