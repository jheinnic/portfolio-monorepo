import { mixin } from '@jchptf/mixins';
import * as api from '../api';

interface IWatchImpl<T extends unknown> extends api.IWatch<T> {
   _watches: api.IObjectOf<api.Watch<T>>;
}

export function iWatch<T extends unknown>(): ClassDecorator {
   return mixin<IWatchImpl<T>>({
      _watches: {},

      addWatch(id: string, fn: api.Watch<T>): boolean {
         this._watches = this._watches || {};
         if (this._watches[id]) {
            return false;
         }
         this._watches[id] = fn;
         return true;
      },

      removeWatch(id: string) {
         if (!this._watches) return false;
         if (this._watches[id]) {
            delete this._watches[id];
            return true;
         }
         return false;
      },

      notifyWatches(oldState: T, newState: T) {
         if (!this._watches) return;
         const w = this._watches;
         /* eslint-disable no-restricted-syntax */
         for (const id of Object.getOwnPropertyNames(w)) {
            w[id](id, oldState, newState);
         }
         /* eslint-enable no-restricted-syntax */
      },
   });
}
