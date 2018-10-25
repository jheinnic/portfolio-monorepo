import sinon from 'sinon';
import {AnyFunc, objectKeys} from 'simplytyped';

import {FunctionProperties, ValueProperties} from '@jchptf/tupletypes';


type SinonSpyApi = Partial<ValueProperties<sinon.SinonSpy> & FunctionProperties<sinon.SinonSpy>>

export interface SpiedUpon<F extends AnyFunc> extends SinonSpyApi {
   (...args: Parameters<F>): ReturnType<F>;
}

export type SpiedUponInstance<T extends object> = {
   [K in keyof T]: T[K] extends AnyFunc ? SpiedUpon<T[K]> : T[K];
} & T;

export function spyOn<T extends object>(base: T, sandbox?: sinon.SinonSandbox): SpiedUponInstance<T> {
   if (sandbox) {
      for (let propName of objectKeys(base)) {
         if (typeof base[propName] == 'function') {
            sandbox.spy(base, propName);
         }
      }
   } else {
      for (let propName of objectKeys(base)) {
         if (typeof base[propName] == 'function') {
            sinon.spy(base, propName);
         }
      }
   }

   return base as SpiedUponInstance<T>;
}
