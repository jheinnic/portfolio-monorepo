import {interfaces} from 'inversify';
import Context = interfaces.Context;
import BindingWhenSyntax = interfaces.BindingWhenSyntax;

import {BindingWhenChildSyntax} from './index';

export class BindingWhenOnChildSyntax<T> extends BindingWhenChildSyntax<T> {
   constructor( childBuilder: BindingWhenSyntax<any> ) {
      super(childBuilder);
   }

   public onActivation(_fn: (
      context: Context, injectable: T) => T): BindingWhenSyntax<T>
   {
      return this;
   }
}
