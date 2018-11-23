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

function doMixinPlus<I extends Object, IP extends Keys<I> = never>( targetObj: any, baseObj: any, mixinDef: MixinBehavior<I, IP> ): void {
   const instanceKeys: Keys<I>[] = Reflect.ownKeys(mixinDef.behavior) as Keys<I>[];
   const handlerKeys: Set<Keys<I>> =
      new Set<Keys<I>>(
         Reflect.ownKeys(mixinDef.conflicts) as Keys<I>[]);

   for (let key of instanceKeys) {
      const existing = Object.getOwnPropertyDescriptor(baseObj, key);
      const existingProto = Object.getOwnPropertyDescriptor(baseObj.__proto__, key);
      if (!existing && !existingProto) {
         Object.defineProperty(targetObj.__proto__, key, {
            value: mixinDef.behavior[key],
            writable: Object.getOwnPropertyDescriptor(mixinDef.behavior, key)!.writable,
            configurable: true,
            enumerable: mixinDef.behavior.propertyIsEnumerable(key)
         });
      } else if(existing && existing.configurable) {
         if (handlerKeys.has(key)) {
            const handlerKey = key as IP;
            const handlerDescriptor = mixinDef.conflicts[handlerKey](key, existing, mixinDef.behavior[handlerKey]);
            if (!!handlerDescriptor) {
               handlerDescriptor.configurable = true;
               Object.defineProperty(targetObj, key, handlerDescriptor);
            }
            else {
               console.warn(`not patching: ${key.toString()}`);
            }
         } else {
            Object.defineProperty(targetObj, key, {
               value: mixinDef.behavior[key],
               writable: Object.getOwnPropertyDescriptor(mixinDef.behavior, key)!.writable,
               configurable: true,
               enumerable: mixinDef.behavior.propertyIsEnumerable(key)
            });
         }
      } else if(existingProto && existingProto.configurable) {
         if (handlerKeys.has(key)) {
            const handlerKey = key as IP;
            const handlerDescriptor = mixinDef.conflicts[handlerKey](
               key, existingProto, mixinDef.behavior[handlerKey]);
            if (!!handlerDescriptor) {
               handlerDescriptor.configurable = true;
               Object.defineProperty(targetObj.__proto__, key, handlerDescriptor);
            }
            else {
               console.warn(`not patching: ${key.toString()}`);
            }
         } else {
            Object.defineProperty(targetObj.__proto__, key, {
               value: mixinDef.behavior[key],
               writable: Object.getOwnPropertyDescriptor(mixinDef.behavior, key)!.writable,
               configurable: true,
               enumerable: mixinDef.behavior.propertyIsEnumerable(key)
            });
         }
      } else {
         console.warn(`not patching: ${key.toString()}`);
      }

   }
}

export function mixinPlus<I extends Object, IP extends Keys<I> = never, S extends Object = {}, SP extends Keys<S> = never>(instBehavior: MixinBehavior<I, IP>, staticBehavior?: MixinBehavior<S, SP>)
{
    const typeTag = Symbol("isa");

    function _mixin <C extends MixableConstructor>(Target: C) {
       const MixinTarget = class MixinTarget extends Target { };

       doMixinPlus(MixinTarget.prototype, Target.prototype, instBehavior);
       Object.defineProperty(MixinTarget.prototype, typeTag, { value: true });

       if (!! staticBehavior) {
          doMixinPlus(MixinTarget.prototype.constructor, Target.prototype.constructor, staticBehavior);
       }

       Object.defineProperty(MixinTarget.prototype.constructor, Symbol.hasInstance, { value: (x: any) =>
       !!x[typeTag] });
       // return Target as C & I;
       return MixinTarget.prototype.constructor;
    }

    Object.defineProperty(_mixin, Symbol.hasInstance, { value: (x: any) => !!x[typeTag] });
    return _mixin;
}

export function makeChainingHandler<T extends AnyFunc = AnyFunc>(reducer: (baseValue: ReturnType<T>, mixinValue: ReturnType<T>) => ReturnType<T>) {
   function chainingHandler(_key: PropertyKey, desc: PropertyDescriptor, mixinFunction: T): PropertyDescriptor
   {
      const baseFunction: T = desc.value as T;

      function extendedFunction(this: any, ...args: any[]): ReturnType<T> {
         const baseValue = baseFunction.apply(this, args);
         const mixinValue = mixinFunction.apply(this, args);

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
