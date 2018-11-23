/**
 * Class behavior mixin based on:
 * http://raganwald.com/2015/06/26/decorators-in-es7.html
 *
 * Additionally only injects/overwrites properties in target, which are
 * NOT marked with `@nomixin` (i.e. haven't set their `configurable`
 * property descriptor flag to `false`)
 *
 * @param behaviour to mixin
 * @param sharedBehaviour
 * @returns decorator function
 */
import {AnyFunc, Keys} from 'simplytyped';
import '@jchptf/reflection';
import {IMapTo} from './api';

export type MixableConstructor<T extends any = object> = new (...args: any[]) => T;

export function mixin<I extends Object, S extends Object = {}>(behaviour: I, sharedBehaviour?: S)
{
   const instanceKeys = Reflect.ownKeys(behaviour);
   const sharedKeys = (!!sharedBehaviour) ? Reflect.ownKeys(sharedBehaviour) : [];
   const typeTag = Symbol("isa");

   function _mixin(clazz: any) {
      for (let key of instanceKeys as Keys<I>[]) {
         const existing = Object.getOwnPropertyDescriptor(clazz.prototype, key);
         if (!existing || existing.configurable) {
            Object.defineProperty(clazz.prototype, key, {
               value: behaviour[key],
               writable: true,
            });
         } else {
            console.log(`not patching: ${clazz.name}.${key.toString()}`);
         }
      }
      Object.defineProperty(clazz.prototype, typeTag, { value: true });

      if (!! sharedBehaviour) {
         for (let key of sharedKeys as Keys<S>[]) {
            const existing = Object.getOwnPropertyDescriptor(clazz, key);
            if (!existing || existing.configurable) {
               Object.defineProperty(clazz, key, {
                  value: sharedBehaviour[key],
                  enumerable: sharedBehaviour.propertyIsEnumerable(key),
               });
            }
         }
      }

      return clazz;
   }

   Object.defineProperty(_mixin, Symbol.hasInstance, { value: (x: any) => !!x[typeTag] });

   return _mixin;
}

export type MixinConflictHandler<T extends any> = (key: PropertyKey, desc: PropertyDescriptor, mixin: T) => PropertyDescriptor | undefined

export interface MixinBehavior<B extends Object, P extends Keys<B> = never> {
   behavior: B;
   conflicts: IMapTo<MixinConflictHandler<B[P]>, B, P>
}

function doMixinPlus<I extends Object, IP extends Keys<I> = never>( targetObj: any, mixinDef: MixinBehavior<I, IP> ): void {
   const instanceKeys: Keys<I>[] = Reflect.ownKeys(mixinDef.behavior) as Keys<I>[];
   const handlerKeys: Set<Keys<I>> =
      new Set<Keys<I>>(
         Reflect.ownKeys(mixinDef.conflicts) as Keys<I>[]);

   for (let key of instanceKeys) {
      const existing = Object.getOwnPropertyDescriptor(targetObj, key);
      if (!existing || existing.configurable) {
         if (!existing || (! handlerKeys.has(key))) {
            Object.defineProperty(targetObj, key, {
               value: mixinDef.behavior[key],
               writable: Object.getOwnPropertyDescriptor(mixinDef.behavior, key)!.writable,
               enumerable: mixinDef.behavior.propertyIsEnumerable(key),
            });
         } else {
            const handlerKey: IP = key as IP;
            const handlerDescriptor =
               mixinDef.conflicts[handlerKey](key, existing, mixinDef.behavior[handlerKey]!);

            if (!! handlerDescriptor) {
               Object.defineProperty(targetObj, key, handlerDescriptor);
            } else {
               console.warn(`not patching: ${key.toString()}`);
            }
         }
      } else {
         console.warn(`not patching: ${key.toString()}`);
      }
   }
}

export function mixinPlus<I extends Object, IP extends Keys<I> = never, S extends Object = {}, SP extends Keys<S> = never>(instBehavior: MixinBehavior<I, IP>, staticBehavior?: MixinBehavior<S, SP>)
{
    const typeTag = Symbol("isa");

    function _mixin(clazz: any) {
       doMixinPlus(clazz.prototype, instBehavior);
       Object.defineProperty(clazz.prototype, typeTag, { value: true });

       if (!! staticBehavior) {
          doMixinPlus(clazz, staticBehavior);
       }

       return clazz;
    }

    Object.defineProperty(_mixin, Symbol.hasInstance, { value: (x: any) => !!x[typeTag] });
    return _mixin;
}

export function makeChainingHandler<T extends AnyFunc = AnyFunc>(reducer: (baseValue: ReturnType<T>, mixinValue: ReturnType<T>) => ReturnType<T>) {
   function chainingHandler(_key: PropertyKey, desc: PropertyDescriptor, mixinFunction: T): PropertyDescriptor
   {
      const baseFunction: T = desc.value as T;

      function extendedFunction(...args: any[]): ReturnType<T> {
         const mixinValue = mixinFunction(args);
         const baseValue = baseFunction(args);

         return reducer(baseValue, mixinValue);
      }

      return {
         writable: false,
         enumerable: desc.enumerable,
         value: extendedFunction
      }
   }

   return chainingHandler;
}
