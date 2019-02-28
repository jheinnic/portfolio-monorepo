import { IDirector } from '@jchptf/api';
import { BlockMappedLayerLocator } from '../locator';
import { DepthFirstVisitMode } from './depth-first-visit-mode.enum';
import { IDfsOrderBuilder } from './dfs-order-builder.interface';
import { Builder, Ctor, Instance } from 'fluent-interface-builder';

const builderClass: Ctor<DfsOrderOptions, IDfsOrderBuilder & Instance<DfsOrderOptions>> =
   new Builder<DfsOrderOptions, IDfsOrderBuilder & Instance<DfsOrderOptions>>()
   .cascade('leftToRight', (value: boolean) => (obj: DfsOrderOptions) => {
      obj.leftToRight = value;
   })
   .cascade('endWith', (value: BlockMappedLayerLocator) => (obj: DfsOrderOptions) => {
      obj.endWith = value;
   })
   .cascade('visitMode', (value: DepthFirstVisitMode) =>(obj: DfsOrderOptions) => {
      obj.visitMode = value;
   }).value;

export class DfsOrderOptions
{
   constructor(
      public leftToRight: boolean = true,
      public visitMode: DepthFirstVisitMode = DepthFirstVisitMode.IN_ORDER,
      public endWith?: BlockMappedLayerLocator )
   {
   }

   static create(director: IDirector<IDfsOrderBuilder>): DfsOrderOptions {
      const retVal = new DfsOrderOptions();
      const builder: IDfsOrderBuilder = new builderClass(retVal);

      director(builder);
      return retVal;
   }

   clone(director: IDirector<IDfsOrderBuilder>): DfsOrderOptions {
      const retVal = Object.assign(new DfsOrderOptions(), this);
      const builder: IDfsOrderBuilder = new builderClass(retVal);

      director(builder);
      return retVal;
   }
}
