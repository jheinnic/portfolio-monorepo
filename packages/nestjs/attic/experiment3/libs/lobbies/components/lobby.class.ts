import { Inject, Injectable } from '@nestjs/common';
import { EVENT_BUS_PROVIDER_TOKEN, LOBBY_CONFIG_PROVIDER_TOKEN } from './constants';
import { LobbyConfig } from './service-model';

@Injectable()
export class Lobby
{
   constructor(
      @Inject(LOBBY_CONFIG_PROVIDER_TOKEN) config: LobbyConfig,
      @Inject(EVENT_BUS_PROVIDER_TOKEN) eventBus: IEventBus
   )
}
