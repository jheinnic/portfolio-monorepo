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
import { isKeyOf } from 'simplytyped';

export type MixableConstructor<T extends any = object> = new (...args: any[]) => T;

export function mixin<I extends object, S extends object = {}>(behaviour: I, sharedBehaviour?: S)
{
   const instanceKeys: PropertyKey[] = !!behaviour ? Reflect.ownKeys(behaviour) : [];
   const sharedKeys: PropertyKey[] = !!sharedBehaviour ? Reflect.ownKeys(sharedBehaviour) : [];
   const typeTag = Symbol('isa');

   function mixinImpl(clazz: any)
   {
      for (const key of instanceKeys) {
         const existing = Object.getOwnPropertyDescriptor(clazz.prototype, key);

         if (!existing || existing.configurable) {
            // Silence compiler warning here with unnecessary type guard check.
            if (isKeyOf(behaviour, key)) {
               Object.defineProperty(clazz.prototype, key, {
                  value: behaviour[key],
                  writable: true,
               });
            }
         } else {
            console.log(`not patching: ${clazz.name}.${key.toString()}`);
         }
      }

      Object.defineProperty(clazz.prototype, typeTag, { value: true });

      if (!! sharedBehaviour) {
         for (const key of sharedKeys) {
            const existing = Object.getOwnPropertyDescriptor(clazz, key);

            if (!existing || existing.configurable) {
               // Silence compiler warning here with unnecessary type guard check.
               if (isKeyOf(sharedBehaviour, key)) {
                  Object.defineProperty(clazz, key, {
                     value: sharedBehaviour[key],
                     enumerable: sharedBehaviour.propertyIsEnumerable(key),
                  });
               }
            }
         }
      }

      return clazz;
   }

   Object.defineProperty(mixinImpl, Symbol.hasInstance, { value: (x: any) => !!x[typeTag] });

   return mixinImpl;
}
