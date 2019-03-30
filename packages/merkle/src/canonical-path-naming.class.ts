import { Inject, Injectable } from '@nestjs/common';
import * as LRU from 'lru-cache';
import * as path from 'path';

import { IDfsOrderBuilder, ICanonicalPathNaming, IMerkleCalculator, INamedPath } from './interface';
import { MERKLE_IDENTITY_LRU_CACHE_PROVIDER_TOKEN, MERKLE_CALCULATOR_PROVIDER_TOKEN } from './di';
import { BlockMappedDigestLocator, MerkleDigestLocator, MerkleNodeType } from './locator';
import { DepthFirstVisitMode } from './traversal';

@Injectable()
export class CanonicalPathNaming implements ICanonicalPathNaming
{
   constructor(
      @Inject(MERKLE_CALCULATOR_PROVIDER_TOKEN)
      private readonly calculator: IMerkleCalculator,
      @Inject(MERKLE_IDENTITY_LRU_CACHE_PROVIDER_TOKEN)
      private readonly lruCache: LRU.Cache<string, string>)
   { }

   private * findAllBlockPathNamesDepthFirst(
      leftToRight: boolean = true,
   ): IterableIterator<INamedPath<BlockMappedDigestLocator>[]>
   {
      const pathTokens: INamedPath<BlockMappedDigestLocator>[] = [];
      for (const nextElement of this.calculator.getDfsBlockOrder(
         (builder: IDfsOrderBuilder) => {
            builder.visitMode(DepthFirstVisitMode.PRE_ORDER)
               .leftToRight(leftToRight)
               .endWith(
                  this.calculator.findLeafBlockLayer(),
               );
         }))
      {
         const level = nextElement.blockLevel;
         const name = this.getBlockNamePart(nextElement);
         pathTokens.splice(level, pathTokens.length, { name, pathTo: nextElement });

         yield [...pathTokens];
      }
   }

   public* findAllBlocksPathNamesDepthFirst(
      namespaceRoot: string,
      leftToRight: boolean = true,
   ): IterableIterator<INamedPath<BlockMappedDigestLocator>>
   {
      for (const nextPath of this.findAllBlockPathNamesDepthFirst(leftToRight)) {
         const element = nextPath[nextPath.length - 1].pathTo;
         const name = path.join(
            namespaceRoot,
            ...nextPath.map(pathElement => pathElement.name),
         );
         yield { name, pathTo: element };
      }
   }

   public* findLeafBlockPathNames(
      namespaceRoot: string,
      leftToRight: boolean = true,
   ): IterableIterator<INamedPath<BlockMappedDigestLocator>>
   {
      for (const nextPath of this.findAllBlockPathNamesDepthFirst(leftToRight)) {
         if (nextPath.length === this.calculator.tierCount) {
            const element = nextPath[nextPath.length - 1].pathTo;
            const name = path.join(
               namespaceRoot,
               ...nextPath.map(pathElement => pathElement.name),
            );
            yield { name, pathTo: element };
         }
      }
   }

   public* findLeafDigestPathNames(
      namespaceRoot: string, leftToRight: boolean = true, digestSuffix?: string,
   ): IterableIterator<INamedPath<MerkleDigestLocator>>
   {
      for (const nextBlock of this.findLeafBlockPathNames(namespaceRoot))
      {
         const currentDirectory = nextBlock.name;
         for (const nextDigest of this.calculator.getDigestsInBlockSubtree(
            nextBlock.pathTo, false, leftToRight,
         )) {
            if (nextDigest.nodeType === MerkleNodeType.LEAF) {
               yield {
                  name: path.join(
                     namespaceRoot,
                     currentDirectory,
                     this.getLeafDigestNamePart(nextDigest) +
                     digestSuffix),
                  pathTo: nextDigest,
               };
            }
         }
      }
   }

   public getBlockPathName(
      namespaceRoot: string,
      digestBlock: BlockMappedDigestLocator): INamedPath<BlockMappedDigestLocator>
   {
      const pathSteps =
         [...this.calculator.getBlockMappedPathToRoot(digestBlock)].map(
            nextBlock => this.getBlockNamePart(nextBlock))
            .reverse();
      return {
         name: path.join(namespaceRoot, ...pathSteps),
         pathTo: digestBlock,
      };
   }

   public getLeafDigestPathName(
      namespaceRoot: string,
      leafDigest: MerkleDigestLocator,
      digestSuffix?: string,
   ): INamedPath<MerkleDigestLocator>
   {
      const outerBlock = this.calculator.findNearestBlockMappedRoot(leafDigest);

      return {
         name: path.join(
            this.getBlockPathName(namespaceRoot, outerBlock).name,
            this.getLeafDigestNamePart(leafDigest) +
            digestSuffix,
         ),
         pathTo: leafDigest,
      };
   }

   private getBlockNamePart(blockMappedRoot: BlockMappedDigestLocator): string
   {
      if (! blockMappedRoot) {
         throw new Error('Block-mapped root digest must have a defined value');
      }

      const blockKey = `b${blockMappedRoot.blockOffset}`;
      let retVal = this.lruCache.get(blockKey);
      if (! retVal) {
         retVal = (
            blockMappedRoot.blockOffset === 0
         ) ? '/'
            : `${blockMappedRoot.blockLevel}-${blockMappedRoot.blockOffset}`;
         this.lruCache.set(blockKey, retVal);
      }

      return retVal;
   }

   private getLeafDigestNamePart(leafDigest: MerkleDigestLocator): string
   {
      if (!leafDigest) {
         throw new Error('Leaf digest locator must have a defined value');
      } else if (leafDigest.nodeType !== MerkleNodeType.LEAF) {
         throw new Error(`Digest at position ${leafDigest.position} is not a leaf`);
      }

      const digestKey = `d${leafDigest.position}`;
      let retVal = this.lruCache.get(digestKey);
      if (! retVal) {
         retVal = path.join(`${leafDigest.index}_${(1 + leafDigest.position).toString(16)}`);
         this.lruCache.set(digestKey, retVal);
      }

      return retVal;
   }
}
