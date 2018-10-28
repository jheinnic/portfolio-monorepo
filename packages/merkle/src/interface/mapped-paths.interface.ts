import {MerkleDigestLocator} from '../locator';

export interface MappedPathNames<T extends MerkleDigestLocator> {
   name: string;
   pathTo: T;
}