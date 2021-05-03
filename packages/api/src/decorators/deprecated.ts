import { illegalArgs } from '@thi.ng/errors';

/* eslint-disable @typescript-eslint/ban-types */
type MethodPropertyDecorator =
    (<T extends CallableFunction>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T>);

/**
 * Method property decorator factory. Augments original method with
 * deprecation message (via console), shown when method is invoked.
 * Accepts optional message arg. Throws error if assigned property
 * is not a function.
 *
 * @param msg deprecation message
 * @param log Method to use for logging functionality.
 */
// eslint-disable-next-line no-console
export function deprecated(msg?: string, log = console.warn): MethodPropertyDecorator {
   return function decorator<T extends CallableFunction>(target: Object, prop: string | symbol, descriptor: TypedPropertyDescriptor<T>) {
   /* eslint-enable @typescript-eslint/ban-types */
      const signature = `${target.constructor.name}#${prop.toString()}`;
      if (typeof descriptor.value !== 'function') {
         illegalArgs(`${signature} is not a function`);
      }
      const fn: T = descriptor.value;
      const value: CallableFunction = function value(self: ThisParameterType<T>, ...params: OmitThisParameter<T>[]): any {
         log(`DEPRECATED ${signature}: ${msg || 'will be removed soon'}`);
         /* eslint-disable @typescript-eslint/no-unsafe-return */
         return fn(self, params);
         /* eslint-enable @typescript-eslint/no-unsafe-return */
      };
      const retval: TypedPropertyDescriptor<T> = { ...descriptor, value: value as T };
      /* eslint-disable @typescript-eslint/no-unsafe-return */
      return retval;
      /* eslint-enable @typescript-eslint/no-unsafe-return */
   }
}
