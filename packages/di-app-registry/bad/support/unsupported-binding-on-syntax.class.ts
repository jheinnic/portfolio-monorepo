import {interfaces} from 'inversify';
import BindingWhenOnSyntax = interfaces.BindingWhenOnSyntax;
import {unsupported} from '@thi.ng/errors';

export abstract class UnsupportedBindingOnSyntax<T>
   implements BindingWhenOnSyntax<T>
{
   public onActivation(_fn: (
      context: interfaces.Context, injectable: T) => T): interfaces.BindingWhenSyntax<T>
   {
      unsupported();

      // Typescript cannot tell this is unreachable due to nature of @thi.ng/errors.
      return {} as any;
   }

   public abstract when(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;

   public abstract whenAnyAncestorIs(ancestor: Function | string): interfaces.BindingOnSyntax<T>;

   public abstract whenAnyAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;

   public abstract whenAnyAncestorNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T>;

   public abstract whenAnyAncestorTagged(
      tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T>;

   public abstract whenInjectedInto(parent: Function | string): interfaces.BindingOnSyntax<T>;

   public abstract whenNoAncestorIs(ancestor: Function | string): interfaces.BindingOnSyntax<T>;

   public abstract whenNoAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;

   public abstract whenNoAncestorNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T>;

   public abstract whenNoAncestorTagged(
      tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T>;

   public abstract whenParentNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T>;

   public abstract whenParentTagged(
      tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T>;

   public abstract whenTargetIsDefault(): interfaces.BindingOnSyntax<T>;

   public abstract whenTargetNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T>;

   public abstract whenTargetTagged(
      tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T>;
}
