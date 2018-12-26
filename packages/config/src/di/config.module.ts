import {DynamicModule, Module, Provider} from '@nestjs/common';
import {DotenvConfigOptions} from 'dotenv';
import {toArray} from 'rxjs/operators';

import {IConfigFileReader, IConfigClassFinder, IConfigurationFactory} from '../interfaces';
import {ConfigFileReaderService} from '../config-file-reader.service';
import {ConfigurationFactoryService} from '../configuration-factory.service';
import {ConfigClassFinderService} from '../config-class-finder.service';

@Module({
   imports: [

   ]
})
export class ConfigModule {
   protected static defaultGlob: string = 'config/**/!(*.d).{ts,js}';

   static async forRoot(loadConfigGlob: string, dotenvOptions?: DotenvConfigOptions, resolveGlobRoot?: string ): Promise<DynamicModule>
   {
      let configFileReader: IConfigFileReader =
         new ConfigFileReaderService(dotenvOptions ? dotenvOptions : {});
      // @ts-ignore
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
         providers: configProviders,
         exports: configProviders
      };
   }
}