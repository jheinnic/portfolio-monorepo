import {MerkleDigestLocator} from './merkle-digest-locator.value';
import {BlockMappedDigestLocator} from './block-mapped-digest-locator.value';

export interface IMerkleProofLocator {
   /**
    * Leaf locator for the subject of identified proof.
    */
   readonly subjectDigest: MerkleDigestLocator;

   /**
    * Sequential path of nodes from blocks referenced by {@see siblingAncestorBlocks}.  Begins
    * with sibling of {@link subjectLeaf}, and ends with Merkle tree root locator.
    */
   readonly validationPath: ReadonlyArray<MerkleDigestLocator>;

   readonly ancestorPath: ReadonlyArray<MerkleDigestLocator>;

   readonly subjectBlock: BlockMappedDigestLocator;

   readonly rootBlock: BlockMappedDigestLocator;

   /**
    * Digest locators for every block root whose block is required to retrieve a hash from
    * every ancestor digest and every non-block-mapped ancestor's sibling.
    */
   readonly ancestorBlocks: ReadonlyArray<BlockMappedDigestLocator>

   /**
    * Digest locators for every block root whose block is required to retrieve a hash from
    * every block-mapped ancestor digest's sibling.
    */
   readonly siblingBlocks: ReadonlyArray<BlockMappedDigestLocator>
}