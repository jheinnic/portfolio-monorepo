import { mixin } from '@jchptf/mixins';
import * as api from '../api';

interface IEnableImpl extends api.IEnable {
   _enabled: boolean;
   notify?: any;
}

/**
 * Mixin class decorator, injects IEnable default implementation, incl.
 * a `_enabled` property. If the target also implements the `INotify`
 * interface, `enable()` and `disable()` will automatically emit the
 * respective events.
 */
export function iEnable (): ClassDecorator {
   return mixin<IEnableImpl>({
      _enabled: true,

      isEnabled(this: IEnableImpl): boolean {
         return this._enabled;
      },

      enable(this: IEnableImpl) {
         this._enabled = true;
         if (this.notify) {
            /* eslint-disable @typescript-eslint/no-unsafe-call */
            this.notify(<api.IEvent>{
               id: api.EVENT_ENABLE,
               target: this,
            });
            /* eslint-enable @typescript-eslint/no-unsafe-call */
         }
      },

      disable(this: IEnableImpl) {
         this._enabled = false;
         if (this.notify) {
            /* eslint-disable @typescript-eslint/no-unsafe-call */
            this.notify(<api.IEvent>{
               id: api.EVENT_DISABLE,
               target: this,
            });
            /* eslint-enable @typescript-eslint/no-unsafe-call */
         }
      },

      toggle(this: IEnableImpl) {
         if (this._enabled) { this.disable(); } else { this.enable(); }
         return this._enabled;
      },
   });
}
