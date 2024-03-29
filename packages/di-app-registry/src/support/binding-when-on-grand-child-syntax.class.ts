import {interfaces} from 'inversify';
import BindingWhenSyntax = interfaces.BindingWhenSyntax;
import Context = interfaces.Context;

import {BindingWhenGrandChildSyntax} from '.';


export class BindingWhenOnGrandChildSyntax<T> extends BindingWhenGrandChildSyntax<T> {
   constructor( grandChildBuilder: BindingWhenSyntax<any>, generationDistance: number ) {
      super(grandChildBuilder, generationDistance);
   }

   public onActivation(_fn: (
      context: Context, injectable: T) => T): BindingWhenSyntax<T>
   {
      return this;
   }
}
