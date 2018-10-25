import {IDirector} from '@jchptf/api';
import {BlockMappedDigestLocator, BlockMappedLayerLocator} from '../locator';
import {bindInputParam, buildable, factoryMethod, IBfsOrderBuilder} from './bfs-order-builder.interface';

@buildable
// export class BfsOrderOptions<Node extends MerkleDigestLocator = MerkleDigestLocator>
export class BfsOrderOptions
{
   constructor(
      @bindInputParam({name: 'leftToRight'})
      public readonly leftToRight: boolean,
      @bindInputParam({name: 'topToBottom'})
      public readonly topToBottom: boolean,
      @bindInputParam({name: 'rootBlock'})
      public readonly rootBlock: BlockMappedDigestLocator,
      @bindInputParam({name: 'leafLayer'})
      public readonly leafLayer: BlockMappedLayerLocator
   )
   { }

   @factoryMethod()
   static create(director: IDirector<IBfsOrderBuilder>): BfsOrderOptions
   {
      throw director;
   }

   @factoryMethod()
   clone(director: IDirector<IBfsOrderBuilder>): BfsOrderOptions
   {
      throw director;
   }
}
