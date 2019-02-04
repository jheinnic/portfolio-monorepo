import {Module} from '@nestjs/common';
import {ConfigModule} from '../../../../src/di';

@Module({
   imports: [
      ConfigModule.forRoot(
         {},
         'apps/config/**/!(*.d).{ts,js}',
         process.env['NODE_ENV'] === 'production' ? './dist' : './build/test/fixtures'
      ),
   ],
   exports: [ ConfigModule ],
})
export class RootApplicationModule {

}