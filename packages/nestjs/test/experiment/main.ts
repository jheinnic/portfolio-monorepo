import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules';
import { Application } from './classes';

async function bootstrap()
{
   try {
      console.log('Process starting');
      const ctx =
         await NestFactory.createApplicationContext(ApplicationModule);
      console.log('Got Application Context');

      const mainApp = ctx.get(Application);
      mainApp.start();
      console.log('Started Application');

      await ctx.close();
      console.log('Process exiting gracefully...');
   } catch (err) {
      console.error('Process exiting abnormally on trapped error!', err);
      throw err;
   }
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
      console.log('Wooga wooga', counter);
   },
   60000,
);
