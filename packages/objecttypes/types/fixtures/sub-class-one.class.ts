import { ABaseClass } from './a-base-class.class';

export class SubClassOne extends ABaseClass
{
   computeIt(a: number, b: number): [number, boolean]
   {
      const baseComp = super.computeIt(a, b);
      return [baseComp[0], !baseComp[1]];
   }
}