import {IDirector} from '@jchptf/api';
import {BlockMappedLayerLocator} from '../locator';
import {DepthFirstVisitMode} from './depth-first-visit-mode.enum';
import {bindInputParam, buildable, factoryMethod, IDfsOrderBuilder} from './dfs-order-builder.interface';

@buildable
export class DfsOrderOptions
{
   constructor(
      @bindInputParam({ name: 'leftToRight' })
      public leftToRight: boolean,
      @bindInputParam({ name: 'endWith' })
      public endWith: BlockMappedLayerLocator,
      @bindInputParam({ name: 'visitMode' })
      public visitMode: DepthFirstVisitMode)
   { }

   @factoryMethod()
   static create(director: IDirector<IDfsOrderBuilder>): DfsOrderOptions {
      throw director;
   }

   @factoryMethod()
   clone(director: IDirector<IDfsOrderBuilder>): DfsOrderOptions {
      throw director;
   }
}
