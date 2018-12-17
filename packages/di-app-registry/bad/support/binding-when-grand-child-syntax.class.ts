import {interfaces, namedConstraint, taggedConstraint, traverseAncerstors, typeConstraint} from 'inversify';
import {illegalArgs} from '@thi.ng/errors';


function noOpActivationHandler<T>(_context: interfaces.Context, injectable: T): T {
   return injectable;
}

export class BindingWhenGrandChildSyntax<Parent, Child>
implements interfaces.BindingWhenSyntax<Parent>
{
   private latestBindingOnSyntax?: interfaces.BindingOnSyntax<Child>;

   constructor(
      protected readonly grandChildBuilder: interfaces.BindingWhenSyntax<Child>,
      private readonly generationDistance: number)
   {
      if (! grandChildBuilder) {
         illegalArgs();
      }
      if (generationDistance < 1) {
         illegalArgs();
      }
   }

   public when(constraint: (parentRequest: interfaces.Request) => boolean): interfaces.BindingOnSyntax<Parent>
   {
      this.latestBindingOnSyntax = this.grandChildBuilder.when((grandChildRequest: interfaces.Request): boolean => {
         return constraint(grandChildRequest.parentRequest!);
      });

      return this;
   }

   public whenAnyAncestorIs(ancestor: Function | string): interfaces.BindingOnSyntax<Parent>
   {
      this.latestBindingOnSyntax = this.grandChildBuilder.when((request: interfaces.Request) => {
         return traverseAncerstors(this.getGrandParentRequest(request), typeConstraint(ancestor));
      });

      return this;
   }

   public whenAnyAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<Parent>
   {
      this.latestBindingOnSyntax = this.grandChildBuilder.when((request: interfaces.Request) => {
         return constraint(this.getGrandParentRequest(request));
      });

      return this;
   }

   public whenAnyAncestorNamed(name: string | number | symbol): interfaces.BindingOnSyntax<Parent>
   {
      this.latestBindingOnSyntax = this.grandChildBuilder.when((request: interfaces.Request) => {
         return traverseAncerstors(this.getGrandParentRequest(request), namedConstraint(name));
      });

      return this;
   }

   public whenAnyAncestorTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<Parent>
   {
      this.latestBindingOnSyntax = this.grandChildBuilder.when((request: interfaces.Request) => {
         return traverseAncerstors(this.getGrandParentRequest(request), taggedConstraint(tag)(value));
      });

      return this;
   }

   public whenInjectedInto(parent: Function | string): interfaces.BindingOnSyntax<Parent>
   {
      this.latestBindingOnSyntax = this.grandChildBuilder.when((request: interfaces.Request) => {
         return typeConstraint(parent)(this.getGrandParentRequest(request).parentRequest);
      });

      return this;
   }

   public whenNoAncestorIs(ancestor: Function | string): interfaces.BindingOnSyntax<Parent>
   {
      this.latestBindingOnSyntax = this.grandChildBuilder.when((request: interfaces.Request) => {
         return !traverseAncerstors(this.getGrandParentRequest(request), typeConstraint(ancestor));
      });

      return this;
   }

   public whenNoAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<Parent>
   {
      this.latestBindingOnSyntax = this.grandChildBuilder.when((request: interfaces.Request) => {
         return !traverseAncerstors(this.getGrandParentRequest(request), constraint as interfaces.ConstraintFunction);
      });

      return this;
   }

   public whenNoAncestorNamed(name: string | number | symbol): interfaces.BindingOnSyntax<Parent>
   {
      this.latestBindingOnSyntax = this.grandChildBuilder.when((request: interfaces.Request) => {
         return !traverseAncerstors(this.getGrandParentRequest(request), namedConstraint(name));
      });

      return this;
   }

   public whenNoAncestorTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<Parent>
   {
      this.latestBindingOnSyntax = this.grandChildBuilder.when((request: interfaces.Request) => {
         return !traverseAncerstors(this.getGrandParentRequest(request), taggedConstraint(tag)(value));
      });

      return this;
   }

   public whenParentNamed(name: string | number | symbol): interfaces.BindingOnSyntax<Parent>
   {
      this.latestBindingOnSyntax = this.grandChildBuilder.when((request: interfaces.Request) => {
         return namedConstraint(name)(this.getGrandParentRequest(request));
      });

      return this;
   }

   public whenParentTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<Parent>
   {
      this.latestBindingOnSyntax = this.grandChildBuilder.when((request: interfaces.Request) => {
         return taggedConstraint(tag)(value)(this.getGrandParentRequest(request));
      });

      return this;
   }

   public whenTargetIsDefault(): interfaces.BindingOnSyntax<Parent>
   {
      this.latestBindingOnSyntax = this.grandChildBuilder.when((request: interfaces.Request) => {
         var parentTarget =
            this.getGrandParentRequest(request).target;

         return (parentTarget !== null) &&
            (!parentTarget!.isNamed()) &&
            (!parentTarget!.isTagged());
      });

      return this;
   }

   public whenTargetNamed(name: string | number | symbol): interfaces.BindingOnSyntax<Parent>
   {
      this.latestBindingOnSyntax = this.grandChildBuilder.when((request: interfaces.Request) => {
         return namedConstraint(name)(this.getGrandParentRequest(request));
      });

      return this;
   }


   public whenTargetTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<Parent>
   {
      this.latestBindingOnSyntax = this.grandChildBuilder.when((request: interfaces.Request) => {
         return taggedConstraint(tag)(value)(this.getGrandParentRequest(request));
      });

      return this;
   }

   private getGrandParentRequest(request: interfaces.Request) {
      let currentParent = request.parentRequest;

      for (let ii = 1; ii < this.generationDistance; ii++ ) {
         if (! currentParent) {
            throw new Error(`No parent at generation ${ii}`);
         }
         currentParent = currentParent.parentRequest!;
      }

      if (! currentParent) {
         throw new Error(`No parent at generation ${this.generationDistance}`);
      }

      return currentParent;
   }

   public onActivation(_fn: (
      context: interfaces.Context, injectable: Parent) => Parent): interfaces.BindingWhenSyntax<Parent>
   {
      if (!! this.latestBindingOnSyntax) {
         // To preserve the semantics of the parent handler, we must call onActivation on
         // the child handler so any subsequent all to a when method will clear the contents
         // of any previous call to a when method.  At the same time, we cannot use the
         // parent object's onActivation handler meaningfully and must implement a no-op as
         // the next best thing.
         //
         // If there is a genuine need for an onActivation handler, the consumer must set
         // that outside of this utility class, and preferably after its use is done, just
         // in case the delegated parent handler calls this method and causes us to reset
         // the activation handler with the following no-op!
         this.latestBindingOnSyntax.onActivation(noOpActivationHandler);
      }

      return this;
   }
}
