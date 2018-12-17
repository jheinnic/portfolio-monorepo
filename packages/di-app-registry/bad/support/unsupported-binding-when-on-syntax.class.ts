import {interfaces} from 'inversify';
import BindingWhenOnSyntax = interfaces.BindingWhenOnSyntax;

import {UnsupportedBindingWhenSyntax} from './unsupported-binding-when-syntax.class';
import {unsupported} from '@thi.ng/errors';

export class UnsupportedBindingWhenOnSyntax<T>
   extends UnsupportedBindingWhenSyntax<T>
   implements BindingWhenOnSyntax<T>
{
   public onActivation(_fn: (
      context: interfaces.Context, injectable: T) => T): interfaces.BindingWhenSyntax<T>
   {
      unsupported();

      // Typescript cannot tell this is unreachable due to nature of @thi.ng/errors.
      return {} as any;
   }
}
