import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import { toArray } from 'rxjs/operators';
import { DotenvConfigOptions } from 'dotenv';

import {
   asyncBuildDynamicModule, buildDynamicModule, IDynamicModuleBuilder, InputProviderParam,
   ModuleIdentifier, NestFactory,
} from '@jchptf/nestjs';

import { IConfigClassFinder } from '../interfaces';
import { ConfigClassFinder } from '../config-class-finder.class';
import { CONFIG_METADATA_HELPER } from '../config-metadata-helper.const';
import {
   CONFIG_LOADER_PROVIDER, CONFIG_METADATA_HELPER_PROVIDER, CONFIG_READER_PROVIDER,
   DOTENV_CONFIG_OPTIONS,
} from './config.constants';
import { ConfigLoader } from '../config-loader.service';
import { ConfigReader } from '../config-reader.service';
import { DotEnvConfigParam } from './dot-env-config-param.type';

@Global()
@Module({})
export class ConfigModule
{
   // public static readonly [MODULE_IDENTIFIER]: ModuleIdentifier = CONFIG_MODULE_ID;

   protected static readonly defaultGlob: string = 'config/**/!(*.d).{ts,js}';

   static forRoot(
      rootModule: Type<any>,
      dotenvConfig: false|DotenvConfigOptions,
   ): DynamicModule
   {
      return ConfigModule.forRootByProvider(
         rootModule,
         {
            provide: DOTENV_CONFIG_OPTIONS,
            useValue: dotenvConfig,
         },
      );
   }

   static forRootByProvider<Factory extends NestFactory<false|DotenvConfigOptions>>(
      rootModule: Type<any>,
      dotEnvParam: DotEnvConfigParam<Factory>,
   ): DynamicModule
   {
      return buildDynamicModule(
         ConfigModule,
         rootModule,
         (builder: IDynamicModuleBuilder) => {
            builder.bindInputProvider(dotEnvParam);

            ConfigModule.withRootProviders(builder);
         },
      );
   }

   static async forRootWithFeature(
      rootFeatureModule: Type<any>,
      featureModuleId: ModuleIdentifier,
      dotenvConfig: false|DotenvConfigOptions,
      loadConfigGlob: string,
      resolveGlobRoot?: string): Promise<DynamicModule>
   {
      return ConfigModule.forRootByProviderWithFeature(
         rootFeatureModule,
         featureModuleId,
         {
            provide: DOTENV_CONFIG_OPTIONS,
            useValue: dotenvConfig,
         },
         loadConfigGlob,
         resolveGlobRoot,
      );
   }

   static async forRootByProviderWithFeature(
      rootFeatureModule: Type<any>,
      featureModuleId: ModuleIdentifier,
      dotEnvParam:
         InputProviderParam<typeof DOTENV_CONFIG_OPTIONS, false|DotenvConfigOptions>,
      loadConfigGlob: string,
      resolveGlobRoot?: string,
   ): Promise<DynamicModule>
   {
      return asyncBuildDynamicModule(
         ConfigModule,
         rootFeatureModule,
         async (builder: IDynamicModuleBuilder) => {
            builder.bindInputProvider(dotEnvParam);
            ConfigModule.withRootProviders(builder);
            await ConfigModule.withFeatureProviders(
               builder, featureModuleId, loadConfigGlob, resolveGlobRoot);
         },
      );
   }

   public static async forFeature(
      featureModule: Type<any>, featureModuleId: ModuleIdentifier,
      loadConfigGlob: string, resolveGlobRoot?: string,
   ): Promise<DynamicModule>
   {
      return asyncBuildDynamicModule(
         ConfigModule,
         featureModule,
         async (builder: IDynamicModuleBuilder) => {
            await ConfigModule.withFeatureProviders(
               builder, featureModuleId, loadConfigGlob, resolveGlobRoot);
         },
      );
   }

   private static withRootProviders(builder: IDynamicModuleBuilder): void
   {
      for (const nextFeature of STANDARD_PROVIDERS) {
         builder.bindProvider(nextFeature, false);
      }
   }

   private static async withFeatureProviders(
      builder: IDynamicModuleBuilder,
      featureModuleId: ModuleIdentifier,
      loadConfigGlob: string,
      resolveGlobRoot?: string): Promise<void>
   {
      const configClassFinder: IConfigClassFinder =
         new ConfigClassFinder(featureModuleId, loadConfigGlob, resolveGlobRoot);

      // These are the per-configuration object providers that
      const featureProviders: Provider[] =
         await configClassFinder.loadConfigAsync()
            .pipe(
               toArray(),
            )
            .toPromise();

      console.log(featureProviders);

      for (const nextFeature of featureProviders) {
         builder.bindProvider(nextFeature, true);
      }
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
