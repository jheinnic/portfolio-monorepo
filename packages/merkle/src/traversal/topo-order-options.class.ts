import { IDirector } from '@jchptf/api';
import { ITopoOrderBuilder } from './topo-order-builder.interface';
import { Builder, Ctor, Instance } from 'fluent-interface-builder';

const builderClass: Ctor<TopoOrderOptions, ITopoOrderBuilder & Instance<TopoOrderOptions>> =
   new Builder<TopoOrderOptions, ITopoOrderBuilder & Instance<TopoOrderOptions>>()
      .cascade('leftToRight', (value: boolean) => (obj: TopoOrderOptions) => {
         obj.leftToRight = value;
      })
      .cascade('onlyVisitUsed', (value: boolean) => (obj: TopoOrderOptions) => {
         obj.onlyVisitUsed = value;
      })
      .cascade('breadthFirst', (value: boolean) => (obj: TopoOrderOptions) => {
         obj.breadthFirst = value;
      }).value;

export class TopoOrderOptions
{
   constructor(
      public leftToRight: boolean = true,
      public breadthFirst: boolean = true,
      public onlyVisitUsed: boolean = false)
   { }

   static create(director: IDirector<ITopoOrderBuilder>): TopoOrderOptions
   {
      const retVal = new TopoOrderOptions();
      const builder: ITopoOrderBuilder = new builderClass(retVal);

      director(builder);
      return retVal;
   }

   clone(director: IDirector<ITopoOrderBuilder>): TopoOrderOptions
   {
      const retVal = Object.assign(new TopoOrderOptions(), this);
      const builder: ITopoOrderBuilder = new builderClass(retVal);

      director(builder);
      return retVal;
   }
}
