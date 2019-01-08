import { OnePlaceholder, SimplePlaceholder } from './one-placeholder.class';
import {
   instFunc2, instFunc3, instValue2, instValue3, staticFunc2, staticFunc3, staticValue2, staticValue3
} from './placeholder.constants';

export class ManyPlaceholders extends OnePlaceholder {
   readonly [instValue2]: boolean = true;
   readonly [instValue3]: boolean = true;

   static readonly [staticValue2]: boolean = true;
   static readonly [staticValue3]: boolean = true;

   [instFunc2](): boolean { return true; }
   [instFunc3](): boolean { return true; }

   static [staticFunc2](): boolean { return true; }
   static [staticFunc3](): boolean { return true; }
}

export class SimpleManyPlaceholders extends SimplePlaceholder {
   readonly instValue2: boolean = true;
   readonly instValue3: boolean = true;

   static readonly staticValue2: boolean = true;
   static readonly staticValue3: boolean = true;

   instFunc2(): boolean { return this.instValue2; }
   instFunc3(): boolean { return this.instValue3; }

   static staticFunc2(): boolean { return this.staticValue2; }
   static staticFunc3(): boolean { return this.staticValue3; }
}
