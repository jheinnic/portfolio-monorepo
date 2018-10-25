import * as api from "../api";
import { mixin } from "../mixin";

interface IEnableImpl<T> extends api.IEnable<T> {
    _enabled: boolean;
    notify?: any;
}

/**
 * Mixin class decorator, injects IEnable default implementation, incl.
 * a `_enabled` property. If the target also implements the `INotify`
 * interface, `enable()` and `disable()` will automatically emit the
 * respective events.
 */
export function iEnable<T extends any>()
{
   return mixin<IEnableImpl<T>>({
      _enabled: true,

      isEnabled()
      {
         return this._enabled;
      },

      enable()
      {
         this._enabled = true;
         if (this.notify) {
            this.notify(<api.Event>{
               id: api.EVENT_ENABLE,
               target: this
            });
         }
      },

      disable()
      {
         this._enabled = false;
         if (this.notify) {
            this.notify(<api.Event>{
               id: api.EVENT_DISABLE,
               target: this
            });
         }
      },

      toggle(this: IEnableImpl<T>)
      {
         this._enabled ? this.disable() : this.enable();
         return this._enabled;
      }
   });
}
