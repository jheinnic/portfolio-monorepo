import {AbstractFeature} from './index';

export class SimpleFeature extends AbstractFeature {
   init() {
      super.init();
      console.log('This is simple');
   }
}
