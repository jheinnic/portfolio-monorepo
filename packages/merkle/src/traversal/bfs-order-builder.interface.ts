import { BlockMappedDigestLocator, BlockMappedLayerLocator } from '../locator';

export interface IBfsOrderBuilder
{
   leftToRight(value: boolean): IBfsOrderBuilder;

   topToBottom(value: boolean): IBfsOrderBuilder;

   rootBlock(value: BlockMappedDigestLocator): IBfsOrderBuilder;

   leafLayer(value: BlockMappedLayerLocator): IBfsOrderBuilder;
}
