import { DynamicModule, Global, Module, Type } from '@nestjs/common';
import { toArray } from 'rxjs/operators';
import { DotenvConfigOptions } from 'dotenv';

import {
   asyncBuildDynamicModule, buildDynamicModule, DynamicModuleConfig, DynamicProviderBindingStyle,
   IBoundDynamicModuleImport, IDynamicModuleBuilder, IModule, IModuleRegistry, REGISTRY,
 } from '@jchptf/nestjs';

import { IConfigClassFinder } from '../interfaces';
import { ConfigClassFinder } from '../config-class-finder.class';
import { ConfigLoader } from '../config-loader.service';
import { ConfigReader } from '../config-reader.service';

import {
   CONFIG_LOADER, CONFIG_METADATA_HELPER, CONFIG_READER, ConfigModuleTypes, DOTENV_CONFIG_OPTIONS,
 } from './config.constants';
import { IFeatureConfigProps } from './feature-config-props.interface';
import { ConfigFeatureModuleOptions } from './config-feature-module-options';

@Global()
@Module({})
export class ConfigModule
{
   public readonly [REGISTRY] = ConfigModuleTypes;

   protected static readonly defaultGlob: string = 'config/**/!(*.d).{ts,js}';

   static forRoot<Consumer extends IModule<IModuleRegistry>>(
     consumingModule: Type<Consumer>, options: ConfigRootModuleOptions<Consumer>,
   ): DynamicModule
   {
      return buildDynamicModule(
        ConfigModule, consumingModule,
        (builder: IDynamicModuleBuilder<ConfigModule, [Consumer], Consumer>) => {
           const dotenvConfig = options[DOTENV_CONFIG_OPTIONS];
           if (!!dotenvConfig) {
              builder.acceptBoundImport(DOTENV_CONFIG_OPTIONS, dotenvConfig);
           } else {
              builder.acceptBoundImport({
                 style: DynamicProviderBindingStyle.VALUE,
                 provide: DOTENV_CONFIG_OPTIONS,
                 useValue: {},
              });
           }

           ConfigModule.withRootProviders(builder);
        },
      );
   }

   static async forRootWithFeature<Consumer extends IModule<IModuleRegistry>>(
     // options: ConfigRootWithFeatureModuleOptions<Consumer>,
     consumerModule: Type<Consumer>,
     dotEnvConfig: IBoundDynamicModuleImport<DotenvConfigOptions, ConfigModule, Consumer>
       | DotenvConfigOptions,
   ): Promise<DynamicModule>
   {
      return asyncBuildDynamicModule(
        ConfigModule,
        consumerModule,
        async (builder: IDynamicModuleBuilder<ConfigModule, Consumer>) => {
           const dotenvConfig = options[DOTENV_CONFIG_OPTIONS];
           if (dotenvConfig instanceof DotenvConfigOptions) {
              builder.acceptBoundImport({
                 style: DynamicProviderBindingStyle.VALUE,
                 provide: DOTENV_CONFIG_OPTIONS,
                 useValue: dotEnvConfig,
              });
           } else {
              builder.acceptBoundImport(dotenvConfig);
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
     builder: IDynamicModuleBuilder<typeof ConfigModuleId, Consumer, Consumer>,
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
          )
          .toPromise(); // as IBoundDynamicModuleImport<any, typeof ConfigModuleId, Consumer>[];

      console.log(featureProviders);

      for (const nextFeature of featureProviders) {
         builder.acceptBoundImport(nextFeature, true);
         // .exportFromSupplier(nextFeature.provide, nextFeature.provide);
      }
   }
}

const STANDARD_PROVIDERS: IBoundDynamicModuleImport<ConfigModule, any>[] = [
   {
      style: DynamicProviderBindingStyle.VALUE,
      provide: CONFIG_METADATA_HELPER,
      useValue: CONFIG_METADATA_HELPER,
   },
   {
      style: DynamicProviderBindingStyle.SUPPLIER_INJECTED_FUNCTION,
      provide: CONFIG_READER,
      useFactory: async (dotEnvConfig?: (DotenvConfigOptions | false)) => {
         const retVal = new ConfigReader(dotEnvConfig);
         retVal.bootstrap();
         return retVal;
      },
      inject: [DOTENV_CONFIG_OPTIONS],
   },
   {
      style: DynamicProviderBindingStyle.CLASS,
      provide: CONFIG_LOADER,
      useClass: ConfigLoader,
   },
];

export type ConfigRootModuleOptions<Consumer extends IModule<IModuleRegistry>> =
  DynamicModuleConfig<
    typeof ConfigModule,
    Consumer,
    Consumer,
    typeof DOTENV_CONFIG_OPTIONS,
    never,
    never>;
