import {interfaces} from 'inversify';

import {
   ApplicationBindingSyntax, ApplicationIdentifier, ApplicationInstaller, BindApplication
} from './interfaces';

class BindApplicationSyntax<A extends ApplicationInstaller> implements ApplicationBindingSyntax<A>
{
   constructor(private readonly bindingTo: interfaces.BindingToSyntax<A>)
   { }

   public to(constructor: { new(...args: any[]): A }): void
   {
      this.bindingTo.to(constructor);
   }
}

export function wrapBindApplication(bind: interfaces.Bind): BindApplication
{
   function bindApplication<A extends ApplicationInstaller>(applicationIdentifier: ApplicationIdentifier<A>): ApplicationBindingSyntax<A>
   {
      return new BindApplicationSyntax(
         bind(applicationIdentifier));
   }

   return bindApplication;
}
