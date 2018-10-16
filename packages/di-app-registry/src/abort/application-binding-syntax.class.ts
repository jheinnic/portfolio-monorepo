import {interfaces} from 'inversify';

import {ApplicationInstaller, IApplicationBindingSyntax} from './interfaces';

export class ApplicationBindingSyntax<A extends ApplicationInstaller>
   implements IApplicationBindingSyntax<A>
{
   constructor(private readonly bindingTo: interfaces.BindingToSyntax<A>) { }

   public to(constructor: { new(...args: any[]): A }): void
   {
      this.bindingTo.to(constructor);
   }
}

