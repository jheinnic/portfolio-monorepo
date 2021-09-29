import { mixin } from '@jchptf/mixins';
import * as api from '../api';
import {iNotify} from "./inotify";

interface IWatchImpl<T extends unknown> extends api.IWatch<T> {
   _watches: api.IObjectOf<api.Watch<T>>;
}

// export function iWatch<T extends unknown>(): ClassDecorator {
export const iWatch: ClassDecorator =
   mixin<IWatchImpl<{}>>({
      _watches: {},

      addWatch(id: string, fn: api.Watch<{}>): boolean {
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

      notifyWatches(oldState: {}, newState: {}) {
         if (!this._watches) return;
         const w = this._watches;
         /* eslint-disable no-restricted-syntax */
         for (const id of Object.getOwnPropertyNames(w)) {
            w[id](id, oldState, newState);
         }
         /* eslint-enable no-restricted-syntax */
      },
   });

export function hasIWatch<T>(t: object): t is api.IWatch<T> {
    return t instanceof iNotify;
}

