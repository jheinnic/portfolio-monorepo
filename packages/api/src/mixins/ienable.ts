import * as api from '../api';
import {mixin} from '../mixin';

interface IEnableImpl extends api.IEnable
{
   _enabled: boolean;
   notify?: any;
}

/**
 * Mixin class decorator, injects IEnable default implementation, incl.
 * a `_enabled` property. If the target also implements the `INotify`
 * interface, `enable()` and `disable()` will automatically emit the
 * respective events.
 */
export const iEnable = //function() {
   mixin<IEnableImpl>({
      _enabled: true,

      isEnabled(): boolean
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

      toggle(this: IEnableImpl)
      {
         this._enabled ? this.disable() : this.enable();
         return this._enabled;
      }
   });
