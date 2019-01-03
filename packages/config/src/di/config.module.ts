import {DynamicModule, Module, Provider} from '@nestjs/common';
import {DotenvConfigOptions} from 'dotenv';
import {toArray} from 'rxjs/operators';

import {IConfigFileReader, IConfigClassFinder, IConfigurationFactory} from '../interfaces';
import {ConfigFileReaderService} from '../config-file-reader.service';
import {ConfigurationFactoryService} from '../configuration-factory.service';
import {ConfigClassFinderService} from '../config-class-finder.service';
import {
   CONFIG_CLASS_FINDER_PROVIDER, CONFIG_FILE_READER_PROVIDER, CONFIGURATION_FACTORY_PROVIDER
} from './config.constants';

@Module({ })
export class ConfigModule {
   protected static defaultGlob: string = 'config/**/!(*.d).{ts,js}';

   static async forRoot(loadConfigGlob: string, dotenvOptions?: DotenvConfigOptions, resolveGlobRoot?: string ): Promise<DynamicModule>
   {
      let configFileReader: IConfigFileReader =
         new ConfigFileReaderService(dotenvOptions ? dotenvOptions : {});
      let configFactory: IConfigurationFactory =
         new ConfigurationFactoryService(configFileReader);
      let configClassFinder: IConfigClassFinder =
         new ConfigClassFinderService(configFactory, loadConfigGlob, resolveGlobRoot);

      configFileReader.bootstrap();
      const configProviders: Provider[] =
         await configClassFinder.loadConfigAsync()
            .pipe(
               toArray()
            ).toPromise();

      console.log(configProviders);

      return {
         module: ConfigModule,
         imports: [ ],
         providers: [
            {
               provide: CONFIG_FILE_READER_PROVIDER,
               useValue: configFileReader
            }, {
               provide: CONFIG_CLASS_FINDER_PROVIDER,
               useValue: configClassFinder
            }, {
               provide: CONFIGURATION_FACTORY_PROVIDER,
               useValue: configFactory
            },
            ...configProviders
         ],
         exports: [
            CONFIG_FILE_READER_PROVIDER,
            CONFIG_CLASS_FINDER_PROVIDER,
            CONFIGURATION_FACTORY_PROVIDER,
            ... configProviders
         ]
      };
   }
}