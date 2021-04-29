import { Name, UUID } from '@jchptf/randomart/dist/infrastructure/validation';
import { CanvasDimensions, RenderScale } from '../common';

export interface RenderingPolicySpec
{
   readonly uuid: UUID;
   readonly displayName: Name;
   readonly canvasDimensions: CanvasDimensions;
   readonly renderScale: RenderScale;
}
