import { DynamicModule, Global, Module } from '@nestjs/common';
import { toArray } from 'rxjs/operators';
import { DotenvConfigOptions } from 'dotenv';

import {
   asyncBuildDynamicModule, buildDynamicModule, DynamicProviderBindingStyle,
   IBoundDynamicModuleImport, IDynamicModuleBuilder, IModule,
} from '@jchptf/nestjs';

import { IConfigClassFinder } from '../interfaces';
import { ConfigClassFinder } from '../config-class-finder.class';
import { ConfigLoader } from '../config-loader.service';
import { ConfigReader } from '../config-reader.service';
import { CONFIG_METADATA_HELPER } from '../config-metadata-helper.const';

import {
   CONFIG_LOADER_PROVIDER_TOKEN, CONFIG_METADATA_HELPER_PROVIDER_TOKEN,
   CONFIG_READER_PROVIDER_TOKEN, ConfigModuleId, ConfigModuleType, DOTENV_CONFIG_OPTIONS,
   DOTENV_CONFIG_OPTIONS_PROVIDER_TOKEN,
} from './config.constants';
import { IFeatureConfigProps } from './feature-config-props.interface';
import { ConfigRootModuleOptions } from './config-root-module-options';
import { ConfigRootWithFeatureModuleOptions } from './config-root-with-feature-module-options';
import { ConfigFeatureModuleOptions } from './config-feature-module-options';

@Global()
@Module({})
export class ConfigModule extends ConfigModuleId
{
   protected static readonly defaultGlob: string = 'config/**/!(*.d).{ts,js}';

   static forRoot<Consumer extends IModule>(
      options: ConfigRootModuleOptions<Consumer>,
   ): DynamicModule
   {
      return buildDynamicModule(
         ConfigModule,
         options.forModule,
         (builder: IDynamicModuleBuilder<ConfigModuleType, Consumer>) => {
            const dotenvConfig = options[DOTENV_CONFIG_OPTIONS];
            if (!! dotenvConfig) {
               builder.acceptBoundImport(dotenvConfig);
            } else {
               builder.acceptBoundImport({
                  style: DynamicProviderBindingStyle.VALUE,
                  provide: DOTENV_CONFIG_OPTIONS_PROVIDER_TOKEN,
                  useValue: {},
               });
            }

            ConfigModule.withRootProviders(builder);
         },
      );
   }

   static async forRootWithFeature<Consumer extends IModule>(
      options: ConfigRootWithFeatureModuleOptions<Consumer>,
   ): Promise<DynamicModule>
   {
      return asyncBuildDynamicModule(
         ConfigModule,
         options.forModule,
         async (builder: IDynamicModuleBuilder<typeof ConfigModuleId, Consumer>) => {
            const dotenvConfig = options[DOTENV_CONFIG_OPTIONS];
            if (!! dotenvConfig) {
               builder.acceptBoundImport(dotenvConfig);
            } else {
               builder.acceptBoundImport({
                  style: DynamicProviderBindingStyle.VALUE,
                  provide: DOTENV_CONFIG_OPTIONS_PROVIDER_TOKEN,
                  useValue: {},
               });
            }

            ConfigModule.withRootProviders(builder);

            await ConfigModule.withFeatureProviders(builder, options);
         },
      );
   }

   public static async forFeature<Consumer extends IModule>(
      options: ConfigFeatureModuleOptions<Consumer>,
   ): Promise<DynamicModule>
   {
      return asyncBuildDynamicModule(
         ConfigModule,
         options.forModule,
         async (builder: IDynamicModuleBuilder<typeof ConfigModuleId, Consumer>) => {
            await ConfigModule.withFeatureProviders(builder, options);
         },
      );
   }

   private static withRootProviders<Consumer extends IModule>(
      builder: IDynamicModuleBuilder<typeof ConfigModuleId, Consumer>): void
   {
      for (const nextFeature of STANDARD_PROVIDERS) {
         builder.acceptBoundImport(nextFeature);
      }
   }

   private static async withFeatureProviders<Consumer extends IModule>(
      builder: IDynamicModuleBuilder<typeof ConfigModuleId, Consumer>,
      { loadConfigGlob, resolveGlobRoot }: IFeatureConfigProps<Consumer>,
   ): Promise<void>
   {
      const configClassFinder: IConfigClassFinder<Consumer> =
         new ConfigClassFinder<Consumer>(loadConfigGlob, resolveGlobRoot);

      // These are the per-configuration object providers that
      const featureProviders: IBoundDynamicModuleImport<any, typeof ConfigModuleId, Consumer>[] =
         await configClassFinder.loadConfigAsync()
            .pipe(
               toArray(),
            ).toPromise(); // as IBoundDynamicModuleImport<any, typeof ConfigModuleId, Consumer>[];

      console.log(featureProviders);

      for (const nextFeature of featureProviders) {
         builder.acceptBoundImport(nextFeature, true);
            // .exportFromSupplier(nextFeature.provide, nextFeature.provide);
      }
   }
}

const STANDARD_PROVIDERS: IBoundDynamicModuleImport<any, typeof ConfigModuleId, any>[] = [
   {
      style: DynamicProviderBindingStyle.VALUE,
      provide: CONFIG_METADATA_HELPER_PROVIDER_TOKEN,
      useValue: CONFIG_METADATA_HELPER,
   },
   {
      style: DynamicProviderBindingStyle.SUPPLIER_INJECTED_FUNCTION,
      provide: CONFIG_READER_PROVIDER_TOKEN,
      useFactory: async (dotEnvConfig?: (DotenvConfigOptions | false)) => {
         const retVal = new ConfigReader(dotEnvConfig);
         retVal.bootstrap();
         return retVal;
      },
      inject: [DOTENV_CONFIG_OPTIONS_PROVIDER_TOKEN],
   },
   {
      style: DynamicProviderBindingStyle.CLASS,
      provide: CONFIG_LOADER_PROVIDER_TOKEN,
      useClass: ConfigLoader,
   },
];
