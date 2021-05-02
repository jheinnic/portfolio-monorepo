import { FullArtworkFilePath } from './full-artwork-file-path.interface';
import { ThumbArtworkFilePath } from './thumb-artwork-file-path.interface';
export declare type ArtworkFilePath = FullArtworkFilePath | ThumbArtworkFilePath;
export declare function isFullArt(filePath: ArtworkFilePath): filePath is FullArtworkFilePath;
export declare function isThumbArt(filePath: ArtworkFilePath): filePath is ThumbArtworkFilePath;
//# sourceMappingURL=artwork-file-path.type.d.ts.map