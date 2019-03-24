import * as api from '../api';
import { mixin } from '@jchptf/mixins';

export function iNotifyDispatch(listeners: any[][], e: api.IEvent) {
   if (!listeners) return;
   const n = listeners.length;
   let i = 0;
   for (i = 0; i < n; i++) {
      const l = listeners[i];
      l[0].call(l[1], e);
      if (e.canceled) {
         return;
      }
   }
}

interface INotifyImpl extends api.INotify {
   _listeners: api.IObjectOf<[api.Listener, any][]>;
   __listener(listeners: any[][], f: api.Listener, scope: any): number;

   notify(event: api.IEvent): void;
}

/**
 * Mixin class decorator, injects INotify default implementation, incl.
 * a lazily instantiated `_listeners` property object, storing
 * registered listeners.
 */
export function iNotify() {
   return mixin<INotifyImpl>({
      _listeners: {},

      addListener(id: Exclude<PropertyKey, symbol>, fn: api.Listener, scope?: any)
      {
         let l = (
            this._listeners = this._listeners || {}
         )[id];
         if (!l) {
            l = this._listeners[id] = [];
         }
         if (this.__listener(l, fn, scope) === -1) {
            l.push([fn, scope]);
            return true;
         }
         return false;
      },

      removeListener(id: Exclude<PropertyKey, symbol>, fn: api.Listener, scope?: any)
      {
         if (!this._listeners) return false;
         const l: any[][] = this._listeners[id];
         if (l) {
            const idx = this.__listener(l, fn, scope);
            if (idx !== -1) {
               l.splice(idx, 1);
               return true;
            }
         }
         return false;
      },

      notify(e: api.IEvent)
      {
         if (!this._listeners) return;
         e.target === undefined && (
            e.target = this
         );
         iNotifyDispatch(this._listeners[e.id], e);
         iNotifyDispatch(this._listeners[api.EVENT_ALL], e);
      },

      __listener(listeners: any[][], f: api.Listener, scope: any)
      {
         let ii = listeners.length;
         while ((
            ii -= 1
         ) >= 0)
         {
            const l = listeners[ii];
            if (l[0] === f && l[1] === scope) {
               break;
            }
         }
         return ii;
      },
   });
}

/**
 * Optional base class that can be used to avoid providing boilerplate dummy implementations
 * for the Mixin decorator to override;
export class UnmixedNotify implements api.INotify
{
   private _listeners: api.IObjectOf<[api.Listener, any][]> = {};

   addListener(id: Exclude<PropertyKey, symbol>, fn: api.Listener, scope?: any)
   {
      let l = (
         this._listeners = this._listeners || {}
      )[id];
      if (!l) {
         l = this._listeners[id] = [];
      }
      if (this.__listener(l, fn, scope) === -1) {
         l.push([fn, scope]);
         return true;
      }
      return false;
   }

   removeListener(id: Exclude<PropertyKey, symbol>, fn: api.Listener, scope?: any)
   {
      if (!this._listeners) return false;
      const l: any[][] = this._listeners[id];
      if (l) {
         const idx = this.__listener(l, fn, scope);
         if (idx !== -1) {
            l.splice(idx, 1);
            return true;
         }
      }
      return false;
   }

   notify(e: api.IEvent)
   {
      if (!this._listeners) return;
      e.target === undefined && (
         e.target = this
      );
      iNotifyDispatch(this._listeners[e.id], e);
      iNotifyDispatch(this._listeners[api.EVENT_ALL], e);
   }

   __listener(listeners: any[][], f: api.Listener, scope: any)
   {
      let i = listeners.length;
      while (--i >= 0) {
         const l = listeners[i];
         if (l[0] === f && l[1] === scope) {
            break;
         }
      }
      return i;
   }
}
*/

// const behavior =
//    Object.assign({
//       addListener: UnmixedNotify.prototype.addListener,
//       removeListener: UnmixedNotify.prototype.removeListener,
//       notify: UnmixedNotify.prototype.notify,
//       __listener: UnmixedNotify.prototype.__listener,
//    },            new UnmixedNotify());
// export const INotify2 = mixin<UnmixedNotify>(behavior);
