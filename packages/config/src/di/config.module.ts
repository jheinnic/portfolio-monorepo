import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { toArray } from 'rxjs/operators';
import { DotenvConfigOptions } from 'dotenv';

import { AsyncModuleParam, asyncProviderFromParam } from '@jchptf/api';

import { IConfigClassFinder } from '../interfaces';
import { ConfigClassFinder } from '../config-class-finder.class';
import { configMetadataHelper } from '../config-metadata-helper.const';
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

   static forRoot(
      dotenvConfig: DotenvConfigOptions,
      loadConfigGlob: string,
      resolveGlobRoot?: string): Promise<DynamicModule>
   {
      return ConfigModule.fromDotenvProvider(
         [{
            provide: DOTENV_CONFIG_OPTIONS,
            useValue: dotenvConfig,
         }],
         loadConfigGlob,
         resolveGlobRoot,
      );
   }

   static forRootAsync(
      asyncDotenvConfig: AsyncModuleParam<DotenvConfigOptions>,
      loadConfigGlob: string,
      resolveGlobRoot?: string): Promise<DynamicModule>
   {
      const dotenvProviders =
         asyncProviderFromParam(DOTENV_CONFIG_OPTIONS, asyncDotenvConfig);

      return ConfigModule.fromDotenvProvider(
         dotenvProviders,
         loadConfigGlob,
         resolveGlobRoot,
      );
   }

   private static async fromDotenvProvider(
      dotenvProviders: Provider[],
      loadConfigGlob: string,
      resolveGlobRoot?: string): Promise<DynamicModule>
   {
      const configClassFinder: IConfigClassFinder =
         new ConfigClassFinder(configMetadataHelper, loadConfigGlob, resolveGlobRoot);

      // These are the per-configuration object providers that
      const configProviders: Provider[] =
         await configClassFinder.loadConfigAsync()
            .pipe(
               toArray(),
            )
            .toPromise();

      console.log(configProviders);

      return {
         module: ConfigModule,
         imports: [],
         providers: [
            ...dotenvProviders,
            ...STANDARD_PROVIDERS,
            ...configProviders,
         ],
         exports: [
            ...configProviders,
         ],
      };
   }

}

const STANDARD_PROVIDERS = [
   {
      provide: CONFIG_METADATA_HELPER_PROVIDER,
      useValue: configMetadataHelper,
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
