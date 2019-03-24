import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './fixtures/application.module';
import { fauxContainerToken } from './fixtures/fixture.constants';

async function bootstrap()
{
   console.log('Starting app context');
   const app = await NestFactory.createApplicationContext(ApplicationModule);
   console.log('Awaited application');
   const faux = app.get(fauxContainerToken);
   faux.doSomething();
}

bootstrap()
   .then(() => {
      console.log('Bootstrap completed!');
   })
   .catch((err: any) => {
      console.error('Bootstrap failed!', err);
   });

console.log('Returned from async bootstrap.');
let counter = 0;
setInterval(
   () => {
      counter += 1;
   },
   45000,
);

console.log(`Returned from async keepalive:: ${counter}`);
