import '@jchptf/reflection';
import { Name } from '../../../infrastructure/validation';
import { PixelDimensions } from './pixel-dimensions.config';
export declare class ImageStylePolicy {
    readonly name: Name;
    readonly fullSize: PixelDimensions;
    readonly thumbnail: PixelDimensions;
    readonly unitScale: number;
    readonly previewPixel: number;
    readonly fitOrFill: 'square' | 'fit' | 'fill';
}
//# sourceMappingURL=image-style-policy.config.d.ts.map