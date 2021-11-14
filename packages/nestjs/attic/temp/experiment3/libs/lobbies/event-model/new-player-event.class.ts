export class NewPlayerEvent
{
   public readonly playerId: string = 'bacefecab';
   public readonly playerName: string = 'Unnamed';

   // private static readonly DEFAULTS: Partial<ThisType<NewPlayerEvent>> = {
   //    playerId: 'bacefecab',
   //    playerName: 'Unnamed',
   // };

   // constructor(previous: NewPlayerEvent = NewPlayerEvent.DEFAULTS, overrides: Partial<NewPlayerEvent> = {}) {
   //    Object.assign(this, NewPlayerEvent.DEFAULTS, previous, overrides);
   // }
   constructor(previous: NewPlayerEvent, overrides: Partial<NewPlayerEvent>) {
      Object.assign(this, previous, overrides);
   }
}