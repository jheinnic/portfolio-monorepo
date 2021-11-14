import {TicketSlotIndex} from './ticket-slot-index.interface';
import {UUID} from '../../../../../../src/infrastructure/validation';

export interface KeyPairLocator
{
   readonly type: 'key-pair'
   readonly slotIndex: TicketSlotIndex;
   readonly versionUuid: UUID;
}