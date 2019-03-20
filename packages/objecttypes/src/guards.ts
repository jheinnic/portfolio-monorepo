import { ConstructorFor, isKeyOf } from 'simplytyped';

export function isConstructorFor<Type extends {} = any>(thing: any): thing is ConstructorFor<Type>
{
   return (typeof thing) === 'function' && isKeyOf(thing, 'prototype');
}
