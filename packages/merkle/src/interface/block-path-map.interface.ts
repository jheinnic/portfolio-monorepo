import {BlockMappedPaths} from './block-mapped-paths.interface';
import {Keys} from 'simplytyped';
import {IMapTo} from '@jchptf/api';

export type BlockPathMap<T extends BlockMappedPaths> =
   IMapTo<string, T, Exclude<Keys<T>, 'mapTo'>>