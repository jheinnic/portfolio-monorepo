import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { toArray } from 'rxjs/operators';

import { IConfigClassFinder } from '../interfaces';
import { ConfigClassFinder } from '../config-class-finder.class';
import { ConfigMetadataHelper } from '../config-metadata-helper.class';
import { DotenvConfigOptions } from 'dotenv';
import {
   CONFIG_FILE_READER_PROVIDER, CONFIG_LOADER_PROVIDER, CONFIG_METADATA_HELPER_PROVIDER,
   DOTENV_CONFIG_OPTIONS,
} from './config.constants';
import { ConfigFileReader } from '../config-file-reader.service';
import { AsyncModuleParam } from '../utilities/async-module-param.type';
import { asyncProviderFromParam } from '../utilities/async-provider.function';
import { ConfigLoader } from '../config-loader.service';

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
         new ConfigClassFinder(
            ConfigMetadataHelper.getInstance(), loadConfigGlob, resolveGlobRoot);

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
      useValue: ConfigMetadataHelper.getInstance(),
   },
   {
      provide: CONFIG_FILE_READER_PROVIDER,
      useFactory: async (dotEnvConfig?: (DotenvConfigOptions | false)) => {
         const retVal = new ConfigFileReader(dotEnvConfig);
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
