import { MessageType } from './message-type.enum';
import { CompletionSignal } from './completion-signal.interface';
import { CanvasAssignedReply } from './canvas-assigned-reply.value';
import {ArtworkLocator, ModelSeed} from "../../../../src/modules/randomArt/if3";

export class AssignCanvasRequest
{
   public readonly messageType: MessageType.ASSIGN_CANVAS_REQUEST = MessageType.ASSIGN_CANVAS_REQUEST;

   constructor(
      public readonly taskIdentity: ArtworkLocator,
      public readonly modelSeed: ModelSeed,
      // public readonly relativeOutputPath: Path,
      public readonly completeSignal: CompletionSignal<CanvasAssignedReply>,
   ) { }
}
