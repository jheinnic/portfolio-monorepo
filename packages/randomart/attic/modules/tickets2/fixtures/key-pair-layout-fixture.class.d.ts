import { IKeyPairStagingLayout } from '../../modules/tickets/interface/internal';
import { DirectoryPath, PrivateKeyFilePath, PublicKeyFilePath } from '../../modules/tickets/interface/locators/internal';
import { KeyPairLocator } from '../../modules/tickets/interface/locators';
export declare class KeyPairLayoutFixture implements IKeyPairStagingLayout {
    findPrivateDirectoriesDepthFirst(_leftToRight?: boolean): IterableIterator<DirectoryPath>;
    findPrivateLeafDirectories(_leftToRight?: boolean): IterableIterator<DirectoryPath>;
    findPublicDirectoriesDepthFirst(_leftToRight?: boolean): IterableIterator<DirectoryPath>;
    findPublicLeafDirectories(_leftToRight?: boolean): IterableIterator<DirectoryPath>;
    locatePrivateKeyFile(locator: KeyPairLocator): PrivateKeyFilePath;
    locatePublicKeyFile(locator: KeyPairLocator): PublicKeyFilePath;
}
//# sourceMappingURL=key-pair-layout-fixture.class.d.ts.map