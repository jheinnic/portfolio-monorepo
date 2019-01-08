/**
 * A conflict handler factory function suitable for both value and function properties
 * that works by replacing the base type's value with that of the mixin.  The base
 * value is ignore entirely, so this approach does not require a strategy function to
 * guide reconciliation.
 */
export function makeReplacingConflictHandler<T>( )
{
   // TODO: Add typeof MixinTarget to set a better type for 'this' than any
   function reducingHandler(
      _key: PropertyKey, desc: PropertyDescriptor, mixinValue: T): PropertyDescriptor
   {
      return {
         configurable: true,
         writable: desc.writable,
         enumerable: desc.enumerable,
         value: mixinValue
      };
   }

   return reducingHandler;
}
