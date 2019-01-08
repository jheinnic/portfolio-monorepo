import { AnyFunc } from 'simplytyped';

export type ReturnValueReducer<T extends AnyFunc> =
   (baseValue: ReturnType<T>, mixinValue: ReturnType<T>) => ReturnType<T>;

export function makeFunctionReducingConflictHandler<T extends AnyFunc>(
   reducer: ReturnValueReducer<T>, baseBeforeMixin: boolean = true)
{
   // TODO: Add typeof MixinTarget to set a better type for 'this' than any
   function reducingHandler(
      _key: PropertyKey, desc: PropertyDescriptor, mixinFunction: T): PropertyDescriptor
   {
      const baseFunction: T = desc.value as T;
      let newReducingFunction: (this: any, ...args: Parameters<T>) => ReturnType<T>;

      if (baseBeforeMixin) {
         function reducingFunction(this: any, ...args: Parameters<T>): ReturnType<T>
         {
            const baseValue = baseFunction.apply(this, args);
            const mixinValue = mixinFunction.apply(this, args);

            return reducer(baseValue, mixinValue);
         }

         newReducingFunction = reducingFunction;
      } else {
         function reducingFunction(this: any, ...args: any[]): ReturnType<T>
         {
            const mixinValue = mixinFunction.apply(this, args);
            const baseValue = baseFunction.apply(this, args);

            return reducer(baseValue, mixinValue);
         }

         newReducingFunction = reducingFunction;
      }

      return {
         configurable: true,
         writable: desc.writable,
         enumerable: desc.enumerable,
         value: newReducingFunction
      };
   }

   return reducingHandler;
}

