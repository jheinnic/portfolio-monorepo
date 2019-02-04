import { ArrayMaxSize, ArrayMinSize, IsIn, Max, Min, ValidateNested } from 'class-validator';

import { configClass, configProp } from '../../../../src/decorators';
import { EntropyAlgorithmSelection } from './entropy-algorithm-selection.config';
import { TICKET_MINTING_POLICY_PROVIDER } from '../di/types';
import { Type } from 'class-transformer';

@configClass('eth.lotto.ticketMinting', TICKET_MINTING_POLICY_PROVIDER)
export class TicketMintingPolicy
{
   @configProp('entropy')
   @ValidateNested()
   @Type(() => EntropyAlgorithmSelection)
   public readonly entropy: EntropyAlgorithmSelection = new EntropyAlgorithmSelection();

   @configProp('keyPairStore')
   @IsIn(['localFiles', 'vaultService'])
   public readonly keyPairStore: string = '';

   @configProp('keyUuidDirectoryBits')
   @ArrayMinSize(2)
   @ArrayMaxSize(12)
   @Min(4, { each: true })
   @Max(16, { each: true })
   public readonly keyUuidDirectoryBits: number[] = [];

   @configProp('curve')
   @IsIn(['ed25519', 'sec256pk1'])
   public readonly curve: ('ed25519' | 'sec256pk1') = 'ed25519';
}
