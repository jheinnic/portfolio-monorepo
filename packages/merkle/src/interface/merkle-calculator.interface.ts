import Optional from 'typescript-optional';

import {IDirector} from '@jchptf/api';
import {
   BlockMappedDigestLocator, BlockMappedLayerLocator, MerkleDigestLocator, MerkleLayerLocator,
   MerkleProofLocator
} from '../locator';
import {BlockTopologicalOrder, IBfsOrderBuilder, IDfsOrderBuilder, ITopoOrderBuilder} from '../traversal';

export interface IMerkleCalculator
{
   readonly tierCount: number;

   readonly treeDepth: number;

   getLayers(topDown?: boolean): IterableIterator<MerkleLayerLocator>;

   getBlockMappedLayers(topDown?: boolean): IterableIterator<BlockMappedLayerLocator>

   getDigestsOnLeafLayer(leftToRight?: boolean): IterableIterator<MerkleDigestLocator>

   getDigestsOnLayer(
      fromLayer: MerkleLayerLocator, leftToRight?: boolean): IterableIterator<MerkleDigestLocator>;

   getChildDigests(
      fromParent: MerkleDigestLocator, leftToRight?: boolean): IterableIterator<MerkleDigestLocator>

   getRelatedDigestsOnLayer(
      fromParent: MerkleDigestLocator, onLayer: MerkleLayerLocator,
      leftToRight?: boolean): IterableIterator<MerkleDigestLocator>

   getDigestPathToRoot(leafBlock: MerkleDigestLocator): IterableIterator<MerkleDigestLocator>

   getSubtreesOnBlockMappedLayer(
      fromLevel: BlockMappedLayerLocator,
      leftToRight?: boolean): IterableIterator<BlockMappedDigestLocator>;

   getChildBlockMappedRoots(
      fromParent: BlockMappedDigestLocator,
      leftToRight?: boolean): IterableIterator<BlockMappedDigestLocator>

   getRelatedBlockMappedRootsOnLevel(
      fromParent: BlockMappedDigestLocator, onLevel: BlockMappedLayerLocator,
      leftToRight?: boolean): IterableIterator<BlockMappedDigestLocator>

   getBlockMappedPathToRoot(leafBlock: MerkleDigestLocator): IterableIterator<BlockMappedDigestLocator>

   getBlockMappedPathFromRoot(leafBlock: MerkleDigestLocator): IterableIterator<BlockMappedDigestLocator>

   getDigestsInBlockSubtree(
      subtreeBlock: BlockMappedDigestLocator, topDown?: boolean,
      leftToRight?: boolean): IterableIterator<MerkleDigestLocator>

   getTopoDigestOrder(director: IDirector<ITopoOrderBuilder>): Iterable<MerkleDigestLocator>;

   getTopoBlockOrder(director: IDirector<ITopoOrderBuilder>): BlockTopologicalOrder;

   getBfsBlockOrder(director: IDirector<IBfsOrderBuilder>): Iterable<BlockMappedDigestLocator>;

   getDfsBlockOrder(director: IDirector<IDfsOrderBuilder>): Iterable<BlockMappedDigestLocator>;

   findLayerByDepth(depth: number): MerkleLayerLocator;

   findLeafLayer(): MerkleLayerLocator;

   findParentLayer(fromLayer: MerkleLayerLocator): MerkleLayerLocator | undefined;

   findChildLayer(fromLayer: MerkleLayerLocator): Optional<MerkleLayerLocator>;

   findBlockLayerByLevel(level: number): BlockMappedLayerLocator;

   findLeafBlockLayer(): BlockMappedLayerLocator;

   findParentBlockLayer(fromLayer: BlockMappedLayerLocator): Optional<BlockMappedLayerLocator>;

   findChildBlockLevel(fromLayer: BlockMappedLayerLocator): Optional<BlockMappedLayerLocator>;

   /**
    * Given a Merkle Tree layer index, return the layer where the roots of the logical subtrees used
    * to map its digests to storage blocks are located.
    */
   findNearestBlockLayer(fromLayer: MerkleLayerLocator): BlockMappedLayerLocator;

   findDigestByRecordAddress(recordAddress: number): MerkleDigestLocator;

   findDigestByPosition(digestPosition: number): MerkleDigestLocator;

   findDigestByLayerAndIndex(layer: MerkleLayerLocator, digestIndex: number): MerkleDigestLocator;

   findParentDigest(mapToParent: MerkleDigestLocator): MerkleDigestLocator | undefined;

   findSiblingDigest(mapToSibling: MerkleDigestLocator): MerkleDigestLocator | undefined;

   findFurthestDescendant(fromDigest: MerkleDigestLocator, leftMost?: boolean): MerkleDigestLocator

   findBlockMappedRootByOffset(offset: number): BlockMappedDigestLocator;

   findParentBlockMappedRoot(fromChild: BlockMappedDigestLocator): Optional<BlockMappedDigestLocator>

   findNearestBlockMappedRoot(fromDigest: MerkleDigestLocator): BlockMappedDigestLocator;

   findMerkleProofForDigest(mapToProof: MerkleDigestLocator): MerkleProofLocator;
}