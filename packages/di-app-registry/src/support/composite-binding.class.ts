import {interfaces} from 'inversify';

import {IDirector} from '@jchptf/api';
import {
   BindingWhenOnChildSyntax, BindingWhenOnGrandChildSyntax, CompositeBindingBuilder, NoOpBindingOn,
   UnsupportedBindingWhenOnSyntax
} from './index';
import BindingWhenSyntax = interfaces.BindingWhenSyntax;
import BindingWhenOnSyntax = interfaces.BindingWhenOnSyntax;
import BindingOnSyntax = interfaces.BindingOnSyntax;
import ConstraintFunction = interfaces.ConstraintFunction;
import Context = interfaces.Context;
import Request = interfaces.Request;


export class CompositeBinding<T> implements CompositeBindingBuilder<T>
{
   private readonly constraintList: ConstraintFunction[];

   constructor(private readonly hostBuilder: BindingWhenOnSyntax<T>)
   {
      this.constraintList = [];
   }

   public apply(director: IDirector<CompositeBindingBuilder<T>>)
   {
      director(this);

      this.hostBuilder.when((request: Request): boolean =>
         this.constraintList.every((constraint: ConstraintFunction): boolean =>
            constraint(request)));
   }

   public bindHost(director: IDirector<BindingWhenSyntax<T> | BindingWhenOnSyntax<T>>): CompositeBindingBuilder<T>
   {
      const builder = new this.CompositeBindingWhenSyntax(this.constraintList, this.hostBuilder);

      director(builder);

      return this;
   }

   public bindParent(director: IDirector<BindingWhenSyntax<any> | BindingWhenOnSyntax<any>>): CompositeBindingBuilder<T>
   {
      const delegate = new this.CompositeBindingWhenSyntax(this.constraintList);
      const builder = new BindingWhenOnChildSyntax(delegate);

      director(builder);

      return this;
   }

   public bindAncestor(
      generationDistance: number,
      director: IDirector<BindingWhenSyntax<any> | BindingWhenOnSyntax<any>>): CompositeBindingBuilder<T>
   {
      const delegate = new this.CompositeBindingWhenSyntax(this.constraintList);
      const builder = new BindingWhenOnGrandChildSyntax(delegate, generationDistance);

      director(builder);

      return this;
   }

   private CompositeBindingWhenSyntax = class CompositeBindingWhenOnSyntax<T>
      extends UnsupportedBindingWhenOnSyntax<T>
   {
      private readonly bindingOnSyntax: BindingOnSyntax<T>;

      constructor(
         private readonly constraintList: ConstraintFunction[],
         bindingOnSyntax?: BindingOnSyntax<T>)
      {
         super();
         if (!! bindingOnSyntax) {
            this.bindingOnSyntax = bindingOnSyntax;
         } else {
            this.bindingOnSyntax = new NoOpBindingOn(this);
         }
      }

      when(constraint: (parentRequest: Request) => boolean): BindingOnSyntax<T>
      {
         this.constraintList.push(constraint as ConstraintFunction);

         return this.bindingOnSyntax;
      }

      public onActivation(_fn: (
         context: Context, injectable: T) => T): BindingWhenSyntax<T>
      {
         this.bindingOnSyntax.onActivation(_fn);

         return this;
      }
   }
}
