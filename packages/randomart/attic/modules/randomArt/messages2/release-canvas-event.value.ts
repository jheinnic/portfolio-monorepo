import { ICanvasManager } from '../../../../src/modules/randomArt/interface';
import { MessageType } from './message-type.enum';

export class CanvasReleasedEvent
{
   public readonly messageType: MessageType.CANVAS_RELEASED_EVENT = MessageType.CANVAS_RELEASED_EVENT;

   constructor(readonly canvas: ICanvasManager) { }
}
