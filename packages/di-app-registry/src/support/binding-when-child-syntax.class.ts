import {interfaces, namedConstraint, taggedConstraint, traverseAncerstors, typeConstraint} from 'inversify';
import BindingWhenSyntax = interfaces.BindingWhenSyntax;
import BindingOnSyntax = interfaces.BindingOnSyntax;
import ConstraintFunction = interfaces.ConstraintFunction;
import Request = interfaces.Request;

import {NoOpBindingOn} from './index';


export class BindingWhenChildSyntax<T> implements BindingWhenSyntax<T> {
   private noOpBinding: NoOpBindingOn<T>;

   constructor( private readonly childBuilder: BindingWhenSyntax<any> ) {
      this.noOpBinding = new NoOpBindingOn<T>(this);
   }

   public when(constraint: (parentRequest: Request) => boolean): BindingOnSyntax<T>
   {
      this.childBuilder.when((childRequest: Request): boolean => {
         return constraint(childRequest.parentRequest!);
      });

      return this.noOpBinding;
   }

   public whenAnyAncestorIs(ancestor: Function | string): BindingOnSyntax<T>
   {
      this.childBuilder.when(function(request: Request) {
         return traverseAncerstors(request.parentRequest!, typeConstraint(ancestor));
      });

      return this.noOpBinding;
   }

   public whenAnyAncestorMatches(constraint: (request: Request) => boolean): BindingOnSyntax<T>
   {
      this.childBuilder.when(function(request: Request) {
         return constraint(request.parentRequest!);
      });

      return this.noOpBinding;
   }

   public whenAnyAncestorNamed(name: string | number | symbol): BindingOnSyntax<T>
   {
      this.childBuilder.when(function(request: Request) {
         return traverseAncerstors(request.parentRequest!, namedConstraint(name));
      });

      return this.noOpBinding;
   }

   public whenAnyAncestorTagged(tag: string | number | symbol, value: any): BindingOnSyntax<T>
   {
      this.childBuilder.when(function(request: Request) {
         return traverseAncerstors(request.parentRequest!, taggedConstraint(tag)(value));
      });

      return this.noOpBinding;
   }

   public whenInjectedInto(parent: Function | string): BindingOnSyntax<T>
   {
      this.childBuilder.when( function (request: Request) {
         return typeConstraint(parent)(request.parentRequest!.parentRequest);
      });

      return this.noOpBinding;
   }

   public whenNoAncestorIs(ancestor: Function | string): BindingOnSyntax<T>
   {
      this.childBuilder.when( function (request: Request) {
         return !traverseAncerstors(request.parentRequest!, typeConstraint(ancestor));
      });

      return this.noOpBinding;
   }

   public whenNoAncestorMatches(constraint: (request: Request) => boolean): interfaces.BindingOnSyntax<T>
   {
      this.childBuilder.when( function (request: Request) {
         return !traverseAncerstors(request.parentRequest!, constraint as ConstraintFunction);
      });

      return this.noOpBinding;
   }

   public whenNoAncestorNamed(name: string | number | symbol): BindingOnSyntax<T>
   {
      this.childBuilder.when( function (request: Request) {
         return !traverseAncerstors(request.parentRequest!, namedConstraint(name));
      });

      return this.noOpBinding;
   }

   public whenNoAncestorTagged(tag: string | number | symbol, value: any): BindingOnSyntax<T>
   {
      this.childBuilder.when( function (request: Request) {
         return !traverseAncerstors(request.parentRequest!, taggedConstraint(tag)(value));
      });

      return this.noOpBinding;
   }

   public whenParentNamed(name: string | number | symbol): BindingOnSyntax<T>
   {
      this.childBuilder.when( function (request: Request) {
         return namedConstraint(name)(request.parentRequest!);
      });

      return this.noOpBinding;
   }

   public whenParentTagged(tag: string | number | symbol, value: any): BindingOnSyntax<T>
   {
      this.childBuilder.when( function (request: Request) {
         return taggedConstraint(tag)(value)(request.parentRequest!);
      });

      return this.noOpBinding;
   }

   public whenTargetIsDefault(): BindingOnSyntax<T>
   {
      this.childBuilder.when(function (request: Request) {
         var parentTarget =
            request.parentRequest!.target;

         return (parentTarget !== null) &&
            (!parentTarget!.isNamed()) &&
            (!parentTarget!.isTagged());
      });

      return this.noOpBinding;
   }

   public whenTargetNamed(name: string | number | symbol): BindingOnSyntax<T>
   {
      this.childBuilder.when((request: Request) => {
         return namedConstraint(name)(request.parentRequest!);
      });

      return this.noOpBinding;
   }

   public whenTargetTagged(tag: string | number | symbol, value: any): BindingOnSyntax<T>
   {
      this.childBuilder.when((request: Request) => {
         return taggedConstraint(tag)(value)(request.parentRequest!);
      });

      return this.noOpBinding;
   }
}
