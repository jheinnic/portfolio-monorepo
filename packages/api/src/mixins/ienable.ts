import { mixin } from '@jchptf/mixins';
import * as api from '../api';
import {hasINotify} from "./inotify";

interface IEnableImpl extends api.IEnable {
   _enabled: boolean;
}

/**
 * Mixin class decorator, injects IEnable default implementation, incl.
 * a `_enabled` property. If the target also implements the `INotify`
 * interface, `enable()` and `disable()` will automatically emit the
 * respective events.
 */
export const iEnable: ClassDecorator =
    mixin<IEnableImpl>({
      _enabled: true,

      isEnabled(this: IEnableImpl): boolean {
         return this._enabled;
      },

      enable(this: IEnableImpl) {
         this._enabled = true;
         if (hasINotify(this)) {
            this.notify({
               id: api.EVENT_ENABLE,
               target: this,
            });
         }
      },

      disable(this: IEnableImpl) {
         this._enabled = false;
         if (hasINotify(this))
            this.notify({
               id: api.EVENT_DISABLE,
               target: this,
            });

      },

      toggle(this: IEnableImpl) {
         if (this._enabled) { this.disable(); } else { this.enable(); }
         return this._enabled;
      },
   });

export function hasIEnable(t: object): t is api.IEnable {
    return t instanceof iEnable;
}