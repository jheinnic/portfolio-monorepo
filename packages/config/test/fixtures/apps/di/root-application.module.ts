import {Module} from '@nestjs/common';
import {ConfigModule} from '@jchptf/config';
import { APP_MODULE_ID } from './types';

@Module({
   imports: [
      ConfigModule.forRootWithFeature(
         {},
         APP_MODULE_ID,
         'apps/config/**/!(*.d).{ts,js}',
         process.env['NODE_ENV'] === 'production' ? './dist' : './build/fixtures'
      ),
   ],
   exports: [ ConfigModule ],
})
export class RootApplicationModule {

}