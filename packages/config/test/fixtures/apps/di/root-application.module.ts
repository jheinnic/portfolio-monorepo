import { Module } from '@nestjs/common';

import { DynamicProviderBindingStyle, MODULE_ID } from '@jchptf/nestjs';
import {
   ConfigModule, DOTENV_CONFIG_OPTIONS, DOTENV_CONFIG_OPTIONS_PROVIDER_TOKEN,
} from '@jchptf/config';

import { APP_MODULE_ID } from './types';

@Module({
   imports: [
      ConfigModule.forRootWithFeature(
         {
            forModule: RootApplicationModule,
            loadConfigGlob: 'apps/config/**/!(*.d).{ts,js}',
            resolveGlobRoot: process.env['NODE_ENV'] === 'production'
               ? './dist' : './build/fixtures',
            [DOTENV_CONFIG_OPTIONS]: {
               style: DynamicProviderBindingStyle.VALUE,
               provide: DOTENV_CONFIG_OPTIONS_PROVIDER_TOKEN,
               useValue: {},
            },
         },
      ),
   ],
   exports: [ConfigModule],
})
export class RootApplicationModule {
   public static readonly [MODULE_ID] = APP_MODULE_ID;
}
