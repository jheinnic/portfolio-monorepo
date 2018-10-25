import {IDirector} from '@jchptf/api';
import {IBfsOrderBuilder} from '../interface';

export interface IMerkleTreeModuleOptionsBuilder {
   withTraversals(director: IDirector<IBfsOrderBuilder>): IMerkleTreeModuleOptionsBuilder
}