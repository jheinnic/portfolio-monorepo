import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { toArray } from 'rxjs/operators';

import { IConfigClassFinder } from '../interfaces/config-class-finder.interface';
import { IConfigProviderFactory } from '../interfaces';
import { ConfigProviderFactoryService } from '../config-provider-factory.service';
import { ConfigClassFinderService } from '../config-class-finder.service';
import { CONFIGURATION_FACTORY_PROVIDER } from './config.constants';
import { ConfigLoader } from '../config-loader.service';

@Global()
@Module({ })
export class ConfigModule {
   protected static defaultGlob: string = 'config/**/!(*.d).{ts,js}';

   static async forRoot(loadConfigGlob: string, resolveGlobRoot?: string ): Promise<DynamicModule>
   {
      let configFactory: IConfigProviderFactory =
         new ConfigProviderFactoryService(
            ConfigLoader.getFileReader()
         );
      let configClassFinder: IConfigClassFinder =
         new ConfigClassFinderService(configFactory, loadConfigGlob, resolveGlobRoot);

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
               provide: CONFIGURATION_FACTORY_PROVIDER,
               useValue: configFactory
            },
            ...configProviders
         ],
         exports: [
            CONFIGURATION_FACTORY_PROVIDER,
            ... configProviders
         ]
      };
   }
}