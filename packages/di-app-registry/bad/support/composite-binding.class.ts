import {interfaces} from 'inversify';

import {IDirector} from '@jchptf/api';
import {
   BindingWhenChildSyntax, BindingWhenGrandChildSyntax, CompositeBindingBuilder,
   UnsupportedBindingWhenOnSyntax
} from './index';
import BindingWhenSyntax = interfaces.BindingWhenSyntax;
import BindingWhenOnSyntax = interfaces.BindingWhenOnSyntax;
import BindingOnSyntax = interfaces.BindingOnSyntax;
import ConstraintFunction = interfaces.ConstraintFunction;
import Context = interfaces.Context;
import Request = interfaces.Request;
import {unsupported} from '@thi.ng/errors';

function hasOnSyntax(
   builder: interfaces.BindingWhenSyntax<any>): builder is interfaces.BindingWhenOnSyntax<any>
{
   return !! (builder as interfaces.BindingWhenOnSyntax<any>).onActivation;
}

export class CompositeBinding<T> implements CompositeBindingBuilder<T>
{
   private readonly constraintList: ConstraintFunction[];

   constructor(private readonly hostBuilder: BindingWhenSyntax<T>)
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

   // public bindHost(director: IDirector<BindingWhenSyntax<T>>): CompositeBindingBuilder<T>
   // public bindHost(withOnSyntax: true, director: IDirector<BindingWhenOnSyntax<T>>): CompositeBindingBuilder<T>
   public bindHost(director: IDirector<BindingWhenSyntax<T>>): CompositeBindingBuilder<T>;
   public bindHost(director: IDirector<BindingWhenOnSyntax<T>>, supportsOn: true ): CompositeBindingBuilder<T>;
   public bindHost(director: IDirector<BindingWhenSyntax<T>>|IDirector<BindingWhenOnSyntax<T>>, supportsOn?: true): CompositeBindingBuilder<T>
   {
      let builder;
      if (hasOnSyntax(this.hostBuilder)) {
         builder = new this.CompositeBindingWhenOnSyntax(this.constraintList, this.hostBuilder);
      } else {
         builder = new this.CompositeBindingWhenOnSyntax(this.constraintList);
      }

      if (supportsOn) {
         (director as IDirector<BindingWhenOnSyntax<T>>)(builder);
      } else {
         (director as IDirector<BindingWhenSyntax<T>>)(builder);
      }
      return this;
   }

   public bindParent(director: IDirector<BindingWhenSyntax<any>>): CompositeBindingBuilder<T>
   {
      const delegate = new this.CompositeBindingWhenOnSyntax(this.constraintList);
      const builder = new BindingWhenChildSyntax(delegate);

      director(builder);

      return this;
   }

   public bindAncestor(
      generationDistance: number,
      director: IDirector<BindingWhenSyntax<any>>): CompositeBindingBuilder<T>
   {
      const delegate = new this.CompositeBindingWhenOnSyntax(this.constraintList);
      const builder = new BindingWhenGrandChildSyntax(delegate, generationDistance);

      director(builder);

      return this;
   }

   private CompositeBindingWhenOnSyntax = class CompositeBindingWhenOnSyntax<T>
      extends UnsupportedBindingWhenOnSyntax<T>
   {
      constructor(
         private readonly constraintList: ConstraintFunction[],
         private readonly bindingOnSyntax?: BindingOnSyntax<T>)
      {
         super();
      }

      when(constraint: (parentRequest: Request) => boolean): BindingOnSyntax<T>
      {
         this.constraintList.push(constraint as ConstraintFunction);

         return this;
      }

      public onActivation(
         _fn: (context: Context, injectable: T) => T): BindingWhenSyntax<T>
      {
         if (!! this.bindingOnSyntax) {
            this.bindingOnSyntax.onActivation(_fn);
         } else {
            unsupported();
         }

         return this;
      }
   }
}
