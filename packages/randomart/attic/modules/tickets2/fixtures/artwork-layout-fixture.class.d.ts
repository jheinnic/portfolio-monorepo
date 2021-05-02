import { IArtworkStagingLayout } from '../../modules/tickets/interface/internal';
import { DirectoryPath, FullArtworkFilePath, ThumbArtworkFilePath } from '../../modules/tickets/interface/locators/internal';
import { TicketArtworkLocator } from '../../modules/tickets/interface/locators';
export declare class ArtworkLayoutFixture implements IArtworkStagingLayout {
    findDirectoriesDepthFirst(_leftToRight?: boolean): IterableIterator<DirectoryPath>;
    findLeafDirectories(_leftToRight?: boolean): IterableIterator<DirectoryPath>;
    locateFullArtworkFile(locator: TicketArtworkLocator): FullArtworkFilePath;
    locateThumbArtworkFile(locator: TicketArtworkLocator): ThumbArtworkFilePath;
}
//# sourceMappingURL=artwork-layout-fixture.class.d.ts.map