export type ValueReducer<T> = (baseValue: T, mixinValue: T) => T;

/**
 * A conflict handler factory function suitable for both value properties that works by
 * passing the mixin and base property target values to a reducing function and using
 * its return value after combining both inputs.
 *
 * This can be made to work with functions, but since those combination usually
 * boil down to calling both functions and then reconciling the return value, there is
 * a specialized makeFunctionReducingConflictHandler() that offers a simpler interface
 * by alleviating the developer from arranging to make both method calls and just
 * focusing on return value combination instead.
 *
 * @param reducer The reducing function that combines mixin value contribution with an
 * inherited base type's pre-existing value for same property.
 */
export function makeValueReducingConflictHandler<T>(reducer: ValueReducer<T>)
{
   function reducingHandler(
      _key: PropertyKey, desc: PropertyDescriptor, mixinValue: T): PropertyDescriptor
   {
      const reducedValue: T = reducer(desc.value as T, mixinValue);

      return {
         configurable: true,
         writable: desc.writable,
         enumerable: desc.enumerable,
         value: reducedValue,
      };
   }

   return reducingHandler;
}
