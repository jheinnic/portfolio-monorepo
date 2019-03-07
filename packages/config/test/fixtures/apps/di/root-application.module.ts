import {Module} from '@nestjs/common';
import {ConfigModule} from '../../../../src/di';
import { APP_MODULE_ID } from './types';

@Module({
   imports: [
      ConfigModule.forRootWithFeature(
         {},
         APP_MODULE_ID,
         'apps/config/**/!(*.d).{ts,js}',
         process.env['NODE_ENV'] === 'production' ? './dist' : './build/test/fixtures'
      ),
   ],
   exports: [ ConfigModule ],
})
export class RootApplicationModule {

}