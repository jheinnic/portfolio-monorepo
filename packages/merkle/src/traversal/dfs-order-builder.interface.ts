import { DepthFirstVisitMode } from './depth-first-visit-mode.enum';
import { BlockMappedLayerLocator } from '../locator';

export interface IDfsOrderBuilder
{
   leftToRight(value: boolean): IDfsOrderBuilder;

   endWith(value: BlockMappedLayerLocator): IDfsOrderBuilder;

   visitMode(value: DepthFirstVisitMode): IDfsOrderBuilder;
}
