import '@jchptf/reflection'
import {NestFactory} from '@nestjs/core';

import {RootApplicationModule} from './root-application.module';
import {Deployment} from '../config';
import {DEPLOYMENT} from './types';

async function bootstrap()
{
   const app = await NestFactory.createApplicationContext(RootApplicationModule);
   // const resourceSemaphore = app.get(getResourceSemaphoreToken("FourSquare"));
   // console.log(resourceSemaphore.name);

   const deployment: Deployment = app.get(DEPLOYMENT);
   console.log(deployment);

   // logic...
   return deployment;
}

bootstrap()
   .then(console.log)
   .catch(console.error);

