export class FlushEvent {
   public readonly flushedLobbyName: string = 'Undefined';

   constructor(flushedLobbyName: string)
   {
      this.flushedLobbyName = flushedLobbyName;
   }
}