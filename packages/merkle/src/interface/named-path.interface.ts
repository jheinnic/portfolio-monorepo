import { MerkleDigestLocator } from '../locator';

export interface INamedPath<T extends MerkleDigestLocator>
{
   name: string;
   pathTo: T;
}
