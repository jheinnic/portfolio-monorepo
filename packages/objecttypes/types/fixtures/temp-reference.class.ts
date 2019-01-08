import { FunctionProperties, ValueProperties } from '@jchptf/objecttypes';
import { Omit } from 'simplytyped';

export const staticValue = Symbol('staticValue');
export const instValue = Symbol('instValue');
export const staticFunc = Symbol('staticFunc');
export const instFunc = Symbol('instFunc');

export class PlaceHolders
{
   [instValue]: boolean;

   static [staticValue]: boolean;

   [instFunc](): boolean { return true; }

   static [staticFunc](): boolean { return true; }
}

export type DFoo = FunctionProperties<PlaceHolders>;
export const dd: DFoo = {
   [instFunc](this: PlaceHolders): boolean {
      return true;
   }
};

export type EFoo = FunctionProperties<typeof PlaceHolders>;
export const b: EFoo = {
   [staticFunc](this: typeof PlaceHolders): boolean {
      return true;
   }
};

export type GFoo = ValueProperties<PlaceHolders>;
export const c: GFoo = {
   [instValue]: true
};

export type HFoo = ValueProperties<Omit<typeof PlaceHolders, 'prototype'>>;
export const d: HFoo = {
   [staticValue]: true
};
