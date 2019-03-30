import { Injectable, Inject } from '@nestjs/common';
import * as LRU from 'lru-cache';

import { IMerkleLocatorFactory } from '../interface';
import {
   MERKLE_DIGEST_LRU_CACHE_PROVIDER_TOKEN, MERKLE_TREE_DESCRIPTION_PROVIDER_TOKEN,
} from '../di';

import {
   BlockMappedDigestLocator, BlockMappedLayerLocator, MerkleDigestLocator,
   MerkleLayerLocator, MerkleTreeDescription,
} from './index';

@Injectable()
export class MerkleLocatorFactory implements IMerkleLocatorFactory
{
   private readonly layerCache: MerkleLayerLocator[];

   private readonly levelCache: BlockMappedLayerLocator[];

   constructor(
      @Inject(MERKLE_TREE_DESCRIPTION_PROVIDER_TOKEN)
      private readonly treeDescription: MerkleTreeDescription,
      @Inject(MERKLE_DIGEST_LRU_CACHE_PROVIDER_TOKEN)
      private readonly digestCache: LRU.Cache<number, MerkleDigestLocator>)
   {
      this.layerCache = new Array<MerkleLayerLocator>(treeDescription.treeDepth);
      this.levelCache = new Array<BlockMappedLayerLocator>(treeDescription.tierCount);

      let storeLevel = 0;
      const levelLeafCache = new Array<MerkleLayerLocator>(treeDescription.tierCount);
      for (let [ii, size] = [0, 1]; ii < treeDescription.treeDepth; ii += 1, size *= 2) {
         if (treeDescription.blockMappedRootLayers[storeLevel] < ii) {
            this.layerCache[ii] = new MerkleLayerLocator(ii, size);

            if (treeDescription.blockMappedLeafLayers[storeLevel] === ii) {
               levelLeafCache[storeLevel] = this.layerCache[ii];
               storeLevel += 1;
            }
         }
      }

      storeLevel = 0;
      let leftLevelOffset = 0;
      let previousReach = 1;
      let cumulativeFan = 1;
      let subtreeDepth = treeDescription.rootSubtreeDepth;
      let subtreeWidth = treeDescription.rootSubtreeWidth;
      let subtreeReach = treeDescription.rootSubtreeReach;

      for (let [ii, size] = [0, 1]; ii < treeDescription.treeDepth; ii += 1, size *= 2) {
         if (treeDescription.blockMappedRootLayers[storeLevel] === ii) {
            this.levelCache[storeLevel] = new BlockMappedLayerLocator(
               storeLevel, size, ii, levelLeafCache[storeLevel],
               subtreeDepth, subtreeWidth, subtreeReach,
               leftLevelOffset, leftLevelOffset + size - 1);

            this.layerCache[ii] = this.levelCache[storeLevel];

            storeLevel += 1;
            cumulativeFan *= previousReach;
            leftLevelOffset += cumulativeFan;
            previousReach = subtreeReach;
            subtreeDepth = treeDescription.subtreeDepth;
            subtreeWidth = treeDescription.subtreeWidth;
            subtreeReach = (storeLevel < (treeDescription.tierCount - 1))
               ? treeDescription.subtreeReach : 0;
         }
      }
   }

   findDigestByLayerAndIndex(layer: MerkleLayerLocator, digestIndex: number): MerkleDigestLocator
   {
      const position = layer.leftPosition + digestIndex;
      let retVal: MerkleDigestLocator | undefined = this.digestCache.get(position);
      if (!retVal) {
         if (layer.blockMapped) {
            retVal = new BlockMappedDigestLocator(
               layer.asBlockMapped().get(),
               digestIndex,
               this.treeDescription.treeDepth);
         } else {
            retVal = new MerkleDigestLocator(
               layer,
               digestIndex,
               this.treeDescription.treeDepth);
         }

         this.digestCache.set(position, retVal);
      }

      return retVal;
   }

   findDigestByRecordAddress(address: number): MerkleDigestLocator
   {
      return this.getDigestByPosition(address + this.treeDescription.recordToDigestOffset);
   }

   findDigestByPosition(position: number): MerkleDigestLocator
   {
      return this.getDigestByPosition(position);
   }

   findLayerByDepth(depth: number): MerkleLayerLocator
   {
      if ((depth < 0) || (depth >= this.treeDescription.treeDepth))
      {
         const maxDepth = this.treeDescription.treeDepth - 1;
         throw new Error(
            `Expected layer depth index between 0 and ${maxDepth}, not ${depth}.`);
      }

      return this.layerCache[depth];
   }

   private getDigestByPosition(position: number): MerkleDigestLocator
   {
      let retVal: MerkleDigestLocator | undefined = this.digestCache.get(position);
      if (!retVal) {
         const layerIndex = Math.floor(
            Math.log2(position + 1)
         );

         const layer = this.layerCache[layerIndex];
         const digestIndex = position - layer.leftPosition;
         if (layer.blockMapped) {
            retVal = new BlockMappedDigestLocator(
               layer.asBlockMapped().get(),
               digestIndex,
               this.treeDescription.treeDepth);
         } else {
            retVal = new MerkleDigestLocator(
               layer, digestIndex, this.treeDescription.treeDepth);
         }

         this.digestCache.set(position, retVal);
      }

      return retVal;
   }

   public findBlockMappedDigestByLayerAndIndex(
      layer: BlockMappedLayerLocator, index: number): BlockMappedDigestLocator
   {
      return this.findDigestByLayerAndIndex(layer, index)
         .asBlockMapped()
         .get();
   }

   public findBlockMappedDigestByOffset(offset: number): BlockMappedDigestLocator
   {
      if (offset < 0) {
         throw new Error(`${offset} is not a valid offset because it is negative`);
      }

      for (let ii = 0; ii < this.treeDescription.tierCount; ii++) {
         if (offset <= this.levelCache[ii].rightOffset) {
            const index = offset - this.levelCache[ii].leftOffset;
            return this.findBlockMappedDigestByLayerAndIndex(this.levelCache[ii], index)
               .asBlockMapped()
               .get();
         }
      }

      throw new Error(
         `${offset} exceeds the maximum tree offset of ${this.levelCache[this.levelCache.length-1].rightOffset}`);
   }

   public findBlockMappedLayerByLevel(level: number): BlockMappedLayerLocator
   {
      if ((level < 0) || (level >= this.treeDescription.tierCount))
      {
         let maxLayerIndex = this.treeDescription.tierCount - 1;
         throw new Error(
            `${level} is not a layer level index between 0 and ${maxLayerIndex}`);
      }

      return this.levelCache[level];
   }
}
