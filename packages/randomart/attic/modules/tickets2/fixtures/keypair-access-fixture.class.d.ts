import { IKeyPairStagingAccess } from '../../modules/tickets/interface/staging';
import { KeyPairLocator, TicketSlotLocator } from '../../modules/tickets/interface/locators';
import { UUID } from '../../../../src/infrastructure/validation';
import { PrivateKeyContent, PublicKeyContent } from '../../modules/tickets/values';
export declare class KeyPairAccessFixture implements IKeyPairStagingAccess {
    findAllKeyPairs(leftToRight?: boolean): IterableIterator<KeyPairLocator>;
    findAllKeyPairsBySlot(slotLocator: TicketSlotLocator, leftToRight?: boolean): IterableIterator<KeyPairLocator>;
    getKeyPairLocator(slotLocator: TicketSlotLocator, version: UUID): KeyPairLocator;
    readPrivateKeyFile(locator: KeyPairLocator): Promise<PrivateKeyContent>;
    readPublicKeyFile(locator: KeyPairLocator): Promise<PublicKeyContent>;
    writePrivateKeyFile(locator: KeyPairLocator, content: PrivateKeyContent): Promise<void>;
    writePublicKeyFile(locator: KeyPairLocator, content: PublicKeyContent): Promise<void>;
}
//# sourceMappingURL=keypair-access-fixture.class.d.ts.map