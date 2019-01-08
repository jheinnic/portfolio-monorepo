import { instFunc, instValue, staticFunc, staticValue } from './placeholder.constants';

export class OnePlaceholder
{
   readonly [instValue] = true;

   static readonly [staticValue] = true;

   [instFunc](): boolean { return this[instValue]; }

   static [staticFunc](): boolean { return this[staticValue]; }
}

export class SimplePlaceholder
{
   instValue = true;
   static staticValue = true;
   instFunc(): boolean { return this.instValue; }
   static staticFunc(): boolean { return this.staticValue; }
}