import { BlockMappedDigestLocator, MerkleDigestLocator } from '../locator';
import { INamedPath } from './named-path.interface';

export interface ICanonicalPathNaming
{
   findAllBlocksPathNamesDepthFirst(namespaceRoot: string, leftToRight?: boolean):
      IterableIterator<INamedPath<BlockMappedDigestLocator>>;

   findLeafBlockPathNames(namespaceRoot: string, leftToRight?: boolean):
      IterableIterator<INamedPath<BlockMappedDigestLocator>>;

   findLeafDigestPathNames(namespaceRoot: string, leftToRight?: boolean, digestSuffix?: string):
      IterableIterator<INamedPath<MerkleDigestLocator>>;

   // getBlockNamePart(digestBlock: BlockMappedDigestLocator): string

   // getLeafDigestNamePart(leafDigest: MerkleDigestLocator): string

   getBlockPathName(
      namespaceRoot: string,
      digestBlock: BlockMappedDigestLocator): INamedPath<BlockMappedDigestLocator>;

   getLeafDigestPathName(
      namespaceRoot: string, leafDigest: MerkleDigestLocator,
      digestSuffix?: string): INamedPath<MerkleDigestLocator>;

   // getBlockByAbsolutePathName(absoluteName: string): BlockMappedDigestLocator

   // getLeafDigestByAbsolutePathName(absoluteName: string): MerkleDigestLocator;
}
