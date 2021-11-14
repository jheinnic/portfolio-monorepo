"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NewPlayerEvent {
    // private static readonly DEFAULTS: Partial<ThisType<NewPlayerEvent>> = {
    //    playerId: 'bacefecab',
    //    playerName: 'Unnamed',
    // };
    // constructor(previous: NewPlayerEvent = NewPlayerEvent.DEFAULTS, overrides: Partial<NewPlayerEvent> = {}) {
    //    Object.assign(this, NewPlayerEvent.DEFAULTS, previous, overrides);
    // }
    constructor(previous, overrides) {
        this.playerId = 'bacefecab';
        this.playerName = 'Unnamed';
        Object.assign(this, previous, overrides);
    }
}
exports.NewPlayerEvent = NewPlayerEvent;
//# sourceMappingURL=new-player-event.class.js.map