import { IDirector } from '@jchptf/api';
import { BlockMappedDigestLocator, BlockMappedLayerLocator } from '../locator';
import { IBfsOrderBuilder, } from './bfs-order-builder.interface';
import { Builder, Ctor, Instance } from 'fluent-interface-builder';

const builderClass: Ctor<BfsOrderOptions, IBfsOrderBuilder & Instance<BfsOrderOptions>> =
   new Builder<BfsOrderOptions, IBfsOrderBuilder & Instance<BfsOrderOptions>>()
      .cascade('leftToRight', (value: boolean) => (obj: BfsOrderOptions) => {
         obj.leftToRight = value;
      })
      .cascade('rootBlock', (value: BlockMappedDigestLocator) => (obj: BfsOrderOptions) => {
         obj.rootBlock = value;
      })
      .cascade('leafLayer', (value: BlockMappedLayerLocator) => (obj: BfsOrderOptions) => {
         obj.leafLayer = value;
      })
      .cascade('topToBottom', (value: boolean) => (obj: BfsOrderOptions) => {
         obj.topToBottom = value;
      }).value;

// export class BfsOrderOptions<Node extends MerkleDigestLocator = MerkleDigestLocator>
export class BfsOrderOptions
{
   constructor(
      public leftToRight: boolean = true,
      public topToBottom: boolean = true,
      public rootBlock?: BlockMappedDigestLocator,
      public leafLayer?: BlockMappedLayerLocator,
   )
   { }

   static create(director: IDirector<IBfsOrderBuilder>): BfsOrderOptions
   {
      const retVal = new BfsOrderOptions();
      const builder: IBfsOrderBuilder = new builderClass(retVal);

      director(builder);
      return retVal;
   }

   clone(director: IDirector<IBfsOrderBuilder>): BfsOrderOptions
   {
      const retVal = Object.assign(new BfsOrderOptions(), this);
      const builder: IBfsOrderBuilder = new builderClass(retVal);

      director(builder);
      return retVal;
   }
}
