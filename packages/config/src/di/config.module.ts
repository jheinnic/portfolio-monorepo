import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import { toArray } from 'rxjs/operators';
import { DotenvConfigOptions } from 'dotenv';

import {
   DynamicModuleParam, MODULE_IDENTIFIER, ModuleIdentifier,
   BoundDynamicModuleParam, compileDynamicModuleMetadata,
} from '@jchptf/nestjs';

import { IConfigClassFinder } from '../interfaces';
import { ConfigClassFinder } from '../config-class-finder.class';
import { CONFIG_METADATA_HELPER } from '../config-metadata-helper.const';
import {
   CONFIG_READER_PROVIDER, CONFIG_LOADER_PROVIDER, DOTENV_CONFIG_OPTIONS,
   CONFIG_METADATA_HELPER_PROVIDER, CONFIG_MODULE_ID,
} from './config.constants';
import { ConfigLoader } from '../config-loader.service';
import { ConfigReader } from '../config-reader.service';

@Global()
@Module({})
export class ConfigModule
{
   public static readonly [MODULE_IDENTIFIER]: ModuleIdentifier = CONFIG_MODULE_ID;

   protected static readonly defaultGlob: string = 'config/**/!(*.d).{ts,js}';

   static forRoot(rootModule: Type<any>, dotenvConfig: DotenvConfigOptions): DynamicModule
   {
      return ConfigModule.withDotenvProvider(
         rootModule,
         {
            useValue: dotenvConfig,
            bindTo: DOTENV_CONFIG_OPTIONS,
         },
      );
   }

   static forRootAsync(
      rootModule: Type<any>,
      dotenvInputParam: DynamicModuleParam<false|DotenvConfigOptions>): DynamicModule
   {
      const dotenvBinding: BoundDynamicModuleParam<false|DotenvConfigOptions> = {
         ...dotenvInputParam,
         bindTo: DOTENV_CONFIG_OPTIONS,
      };

      return ConfigModule.withDotenvProvider(rootModule, dotenvBinding);
   }

   static async forRootWithFeature(
      rootModule: Type<any>,
      dotenvConfig: DotenvConfigOptions,
      loadConfigGlob: string,
      resolveGlobRoot?: string): Promise<DynamicModule>
   {
      const featureProviders = await ConfigModule.fromFeature(loadConfigGlob, resolveGlobRoot);

      return ConfigModule.withDotenvProvider(
         rootModule,
         {
            bindTo: DOTENV_CONFIG_OPTIONS,
            useValue: dotenvConfig,
         },
         featureProviders,
      );
   }

   static async forRootWithFeatureAsync(
      rootModule: Type<any>,
      asyncDotenvConfig: DynamicModuleParam<DotenvConfigOptions>,
      loadConfigGlob: string,
      resolveGlobRoot?: string,
   ): Promise<DynamicModule>
   {
      const dotenvBinding = {
         ...asyncDotenvConfig,
         bindTo: DOTENV_CONFIG_OPTIONS,
      };
      const featureProviders = await ConfigModule.fromFeature(loadConfigGlob, resolveGlobRoot);

      return ConfigModule.withDotenvProvider(
         rootModule, dotenvBinding, featureProviders,
      );
   }

   public static async forFeature(
      loadConfigGlob: string, resolveGlobRoot?: string): Promise<DynamicModule>
   {
      const featureProviders = await ConfigModule.fromFeature(loadConfigGlob, resolveGlobRoot);

      return {
         module: ConfigModule,
         providers: featureProviders,
         exports: featureProviders,
      };
   }

   private static withDotenvProvider(
      rootModule: Type<any>,
      dotenvProviders: BoundDynamicModuleParam<false|DotenvConfigOptions>,
      featureProviders: Provider[] = [],
   ): DynamicModule
   {
      console.log('Featuring:', featureProviders);
      return compileDynamicModuleMetadata(
         {
            module: ConfigModule,
            imports: [],
            providers: [
               ...STANDARD_PROVIDERS,
               ...featureProviders,
            ],
            exports: [
               ...featureProviders,
            ],
         },
         [dotenvProviders],
         [],
         rootModule,
      );
   }

   private static async fromFeature(
      loadConfigGlob: string, resolveGlobRoot?: string): Promise<Provider[]>
   {
      const configClassFinder: IConfigClassFinder =
         new ConfigClassFinder(loadConfigGlob, resolveGlobRoot);

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
