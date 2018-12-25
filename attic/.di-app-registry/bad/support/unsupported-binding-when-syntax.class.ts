import {interfaces} from 'inversify';
import BindingWhenOnSyntax = interfaces.BindingWhenOnSyntax;


export abstract class UnsupportedBindingWhenSyntax<T> implements BindingWhenOnSyntax<T> {
   public when(_constraint: (parentRequest: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>
   {
      throw new Error('Unsupported Operation');
   }

   public whenAnyAncestorIs(_ancestor: Function | string): interfaces.BindingOnSyntax<T>
   {
      throw new Error('Unsupported Operation');
   }

   public whenAnyAncestorMatches(_constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>
   {
      throw new Error('Unsupported Operation');
   }

   public whenAnyAncestorNamed(_name: string | number | symbol): interfaces.BindingOnSyntax<T>
   {
      throw new Error('Unsupported Operation');
   }

   public whenAnyAncestorTagged(_tag: string | number | symbol, _value: any): interfaces.BindingOnSyntax<T>
   {
      throw new Error('Unsupported Operation');
   }

   public whenInjectedInto(_parent: Function | string): interfaces.BindingOnSyntax<T>
   {
      throw new Error('Unsupported Operation');
   }

   public whenNoAncestorIs(_ancestor: Function | string): interfaces.BindingOnSyntax<T>
   {
      throw new Error('Unsupported Operation');
   }

   public whenNoAncestorMatches(_constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>
   {
      throw new Error('Unsupported Operation');
   }

   public whenNoAncestorNamed(_name: string | number | symbol): interfaces.BindingOnSyntax<T>
   {
      throw new Error('Unsupported Operation');
   }

   public whenNoAncestorTagged(_tag: string | number | symbol, _value: any): interfaces.BindingOnSyntax<T>
   {
      throw new Error('Unsupported Operation');
   }

   public whenParentNamed(_name: string | number | symbol): interfaces.BindingOnSyntax<T>
   {
      throw new Error('Unsupported Operation');
   }

   public whenParentTagged(_tag: string | number | symbol, _value: any): interfaces.BindingOnSyntax<T>
   {
      throw new Error('Unsupported Operation');
   }

   public whenTargetIsDefault(): interfaces.BindingOnSyntax<T>
   {
      throw new Error('Unsupported Operation');
   }

   public whenTargetNamed(_name: string | number | symbol): interfaces.BindingOnSyntax<T>
   {
      throw new Error('Unsupported Operation');
   }

   public whenTargetTagged(_tag: string | number | symbol, _value: any): interfaces.BindingOnSyntax<T>
   {
      throw new Error('Unsupported Operation');
   }

   public abstract onActivation(fn: (
      context: interfaces.Context, injectable: T) => T): interfaces.BindingWhenSyntax<T>;

}
