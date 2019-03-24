export class LobbyConfig {
   public readonly channelName: string;

   public readonly lobbyCapacity: number;

   constructor(chanelName: string, lobbyCapacity: number) {
      this.channelName = chanelName;
      this.lobbyCapacity = lobbyCapacity;
   }
}