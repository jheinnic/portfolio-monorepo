import {IDirector} from '@jchptf/api';
import {
   bindInputParam, buildable, factoryMethod, ITopoOrderBuilder
} from './topo-order-builder.interface';

@buildable
export class TopoOrderOptions
{
   public readonly onlyVisitUsed: boolean = false;

   constructor(
      @bindInputParam({name: 'leftToRight'})
      public readonly leftToRight: boolean,
      @bindInputParam({name: 'breadthFirst'})
      public readonly breadthFirst: boolean)
   { }

   @factoryMethod()
   static create(director: IDirector<ITopoOrderBuilder>): TopoOrderOptions
   {
      throw director;
   }

   @factoryMethod()
   clone(director: IDirector<ITopoOrderBuilder>): TopoOrderOptions
   {
      throw director;
   }
}
