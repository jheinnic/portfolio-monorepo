import { Name, UUID } from '../../../../../../src/infrastructure/validation';
import { TicketSlotIndex } from './ticket-slot-index.interface';
export interface TicketArtworkLocator {
    readonly type: 'artwork';
    readonly slotIndex: TicketSlotIndex;
    readonly keyPairVersion: UUID;
    readonly assetPolicyVersion: UUID;
    readonly renderStyleName: Name;
}
//# sourceMappingURL=ticket-artwork-locator.interface.d.ts.map