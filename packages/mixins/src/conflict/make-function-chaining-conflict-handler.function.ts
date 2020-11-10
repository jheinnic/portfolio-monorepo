export type IsomorphicFunction<InOutParam, ThisType = any> =
   (this: ThisType, arg: InOutParam) => InOutParam;

export function makeFunctionChainingConflictHandler<InOutParam, ThisType = any>(
   baseBeforeMixin: boolean = true)
{
   // TODO: Add typeof MixinTarget to set a better type for 'this' than any
   function reducingHandler(
      _key: PropertyKey, desc: PropertyDescriptor,
      mixinFunction: IsomorphicFunction<InOutParam, ThisType>): PropertyDescriptor
   {
      const baseFunction: IsomorphicFunction<InOutParam, ThisType> =
         desc.value as IsomorphicFunction<InOutParam, ThisType>;
      let newReducingFunction: IsomorphicFunction<InOutParam, ThisType>;

      if (baseBeforeMixin) {
         function reducingFunction(this: any, arg: InOutParam): InOutParam
         {
            const baseValue = baseFunction.call(this, arg);

            return mixinFunction.call(this, baseValue);
         }

         newReducingFunction = reducingFunction;
      } else {
         function reducingFunction(this: any, arg: InOutParam): InOutParam
         {
            const mixinValue = mixinFunction.call(this, arg);

            return baseFunction.call(this, mixinValue);
         }

         newReducingFunction = reducingFunction;
      }

      return {
         configurable: true,
         writable: desc.writable,
         enumerable: desc.enumerable,
         value: newReducingFunction,
      };
   }

   return reducingHandler;
}
