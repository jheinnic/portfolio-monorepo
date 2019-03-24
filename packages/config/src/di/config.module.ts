import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import { toArray } from 'rxjs/operators';
import { DotenvConfigOptions } from 'dotenv';

import {
   applyDynamicModuleParam, asyncBuildDynamicModule, buildDynamicModule,
   IDynamicModuleBuilder, ModuleIdentifier,
} from '@jchptf/nestjs';

import { IConfigClassFinder } from '../interfaces';
import { ConfigClassFinder } from '../config-class-finder.class';
import { CONFIG_METADATA_HELPER } from '../config-metadata-helper.const';
import {
   CONFIG_LOADER_PROVIDER_TOKEN, CONFIG_METADATA_HELPER_PROVIDER_TOKEN, CONFIG_MODULE_ID,
   CONFIG_READER_PROVIDER_TOKEN, DOTENV_CONFIG_OPTIONS_PROVIDER_TOKEN,
} from './config.constants';
import { ConfigLoader } from '../config-loader.service';
import { ConfigReader } from '../config-reader.service';
import { DotenvConfigParam }  from './dot-env-config-param.type';

@Global()
@Module({})
export class ConfigModule
{
   protected static readonly defaultGlob: string = 'config/**/!(*.d).{ts,js}';

   static forRoot<ConsumerId extends ModuleIdentifier>(
      rootModule: Type<any>,
      dotEnvParam: DotenvConfigParam<ConsumerId>,
   ): DynamicModule
   {
      return buildDynamicModule(
         ConfigModule,
         rootModule,
         (builder: IDynamicModuleBuilder<CONFIG_MODULE_ID, ConsumerId>) => {
            applyDynamicModuleParam(builder, dotEnvParam);

            ConfigModule.withRootProviders(builder);
         },
      );
   }

   static async forRootWithFeature<ConsumerId extends ModuleIdentifier>(
      rootFeatureModule: Type<any>,
      featureModuleId: ConsumerId,
      dotEnvParam: DotenvConfigParam<ConsumerId>,
      loadConfigGlob: string,
      resolveGlobRoot?: string): Promise<DynamicModule>
   {
      return asyncBuildDynamicModule(
         ConfigModule,
         rootFeatureModule,
         async (builder: IDynamicModuleBuilder<CONFIG_MODULE_ID, ConsumerId>) => {
            applyDynamicModuleParam(builder, dotEnvParam);
            ConfigModule.withRootProviders(builder);

            await ConfigModule.withFeatureProviders(
               builder, featureModuleId, loadConfigGlob, resolveGlobRoot);
         },
      );
   }

   public static async forFeature<ConsumerId extends ModuleIdentifier>(
      featureModule: Type<any>, featureModuleId: ConsumerId,
      loadConfigGlob: string, resolveGlobRoot?: string,
   ): Promise<DynamicModule>
   {
      return asyncBuildDynamicModule(
         ConfigModule,
         featureModule,
         async (builder: IDynamicModuleBuilder<CONFIG_MODULE_ID, ConsumerId>) => {
            await ConfigModule.withFeatureProviders(
               builder, featureModuleId, loadConfigGlob, resolveGlobRoot);
         },
      );
   }

   private static withRootProviders<ConsumerId extends ModuleIdentifier>(
      builder: IDynamicModuleBuilder<CONFIG_MODULE_ID, ConsumerId>): void
   {
      for (const nextFeature of STANDARD_PROVIDERS) {
         builder.bindProvider(nextFeature, false);
      }
   }

   private static async withFeatureProviders<ConsumerId extends ModuleIdentifier>(
      builder: IDynamicModuleBuilder<CONFIG_MODULE_ID, ConsumerId>,
      featureModuleId: ConsumerId,
      loadConfigGlob: string,
      resolveGlobRoot?: string): Promise<void>
   {
      const configClassFinder: IConfigClassFinder =
         new ConfigClassFinder(featureModuleId, loadConfigGlob, resolveGlobRoot);

      // These are the per-configuration object providers that
      const featureProviders: Exclude<Provider, Type<any>>[] =
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
      provide: CONFIG_METADATA_HELPER_PROVIDER_TOKEN,
      useValue: CONFIG_METADATA_HELPER,
   },
   {
      provide: CONFIG_READER_PROVIDER_TOKEN,
      useFactory: async (dotEnvConfig?: (DotenvConfigOptions | false)) => {
         const retVal = new ConfigReader(dotEnvConfig);
         retVal.bootstrap();
         return retVal;
      },
      inject: [DOTENV_CONFIG_OPTIONS_PROVIDER_TOKEN],
   },
   {
      provide: CONFIG_LOADER_PROVIDER_TOKEN,
      useClass: ConfigLoader,
   },
];
