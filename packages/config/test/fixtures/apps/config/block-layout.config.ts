import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

import {BlockLayoutElement} from './block-layout-element.config';
import '@jchptf/reflection';
import {configClass, configProp} from '../../../../src/decorators';

@configClass('eth.lotto.setupPolicy.blockLayout')
export class BlockLayout {
   @configProp('gameId')
   @ValidateNested()
   @Type(() => BlockLayoutElement)
   public readonly gameId: BlockLayoutElement = new BlockLayoutElement();

   @configProp('serial')
   @ValidateNested()
   @Type(() => BlockLayoutElement)
   public readonly serial: BlockLayoutElement = new BlockLayoutElement();

   @configProp('checkBits')
   @ValidateNested()
   @Type(() => BlockLayoutElement)
   public readonly checkBits: BlockLayoutElement = new BlockLayoutElement();

   @configProp('prizeTier')
   @ValidateNested()
   @Type(() => BlockLayoutElement)
   public readonly prizeTier: BlockLayoutElement = new BlockLayoutElement();

   @configProp('tierNonce')
   @ValidateNested()
   @Type(() => BlockLayoutElement)
   public readonly tierNonce: BlockLayoutElement = new BlockLayoutElement();

   @configProp('proofNonce')
   @ValidateNested()
   @Type(() => BlockLayoutElement)
   public readonly proofNonce: BlockLayoutElement = new BlockLayoutElement();
}