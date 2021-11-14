import { INestApplicationContext } from '@nestjs/common';

export class DynamicModuleInput {
   constructor(
      private readonly origin: SingletonHelper,
      private readonly boundValue: symbol)
   {
   }

   public activate(): Promise<any> {
      return this.origin.activate(this);
   }

   public getProviderToken(): symbol
   {
      return this.boundValue;
   }
}

export class SingletonHelper
{
   private static readonly INSTANCE: SingletonHelper =
      new SingletonHelper();

   private appContext?: INestApplicationContext;
   private readonly resolvePending: (() => void)[] = [];

   public static getInstance(): SingletonHelper {
      return SingletonHelper.INSTANCE;
   }

   private constructor () {
   }

   public setApplicationContext(applicationContext: INestApplicationContext) {
      this.appContext = applicationContext;
      console.log('Unblocking...');
      for (const resolve of this.resolvePending) {
         resolve();
      }
   }

   public bindDynamicInput(providerToken: symbol)
   {
      return new DynamicModuleInput(this, providerToken);
   }

   public async activate(input: DynamicModuleInput): Promise<any> {
      if (! this.appContext) {
         const block = new Promise<void>((resolve, _reject) => {
            this.resolvePending.push(resolve);
         });
         console.log('Blocked...');
         await block;
         console.log('Unblocked...');
      } else {
         console.log('Not Blocked...');
      }

      return this.appContext!.get(input.getProviderToken());
   }
}
