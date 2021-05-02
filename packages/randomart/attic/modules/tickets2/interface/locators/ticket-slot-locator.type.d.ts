import { TicketSlotIndex } from './ticket-slot-index.interface';
import { TicketSlotPath } from './ticket-slot-path.type';
export declare type TicketSlotLocator = TicketSlotIndex | TicketSlotPath;
export declare function isSlotIndex(locator: TicketSlotLocator): locator is TicketSlotIndex;
export declare function isSlotPath(locator: TicketSlotLocator): locator is TicketSlotPath;
//# sourceMappingURL=ticket-slot-locator.type.d.ts.map