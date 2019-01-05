import sinon from 'sinon';
import {AnyFunc, CombineObjects, objectKeys} from 'simplytyped';

import {FunctionProperties, ValueProperties} from '@jchptf/objecttypes';

type SinonSpyApi = CombineObjects<ValueProperties<sinon.SinonSpy>, FunctionProperties<sinon.SinonSpy>>

export interface SpiedUpon<F extends AnyFunc> extends SinonSpyApi
{
   (...args: Parameters<F>): ReturnType<F>;
}

export type SpiedUponInstance<T extends object> = {
   [K in keyof T]: T[K] extends AnyFunc ? SpiedUpon<T[K]> : T[K];
} & T;

export function spyOn<T extends object>(base: T, sandbox: sinon.SinonSandbox = sinon): SpiedUponInstance<T>
{
   for (let propName of objectKeys(base)) {
      if (typeof base[propName] == 'function') {
         sandbox.spy(base, propName);
      }
   }

   return base as SpiedUponInstance<T>;
}
