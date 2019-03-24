import { EventBus } from './event-bus.service';
import { getLocalProviderTokenString } from '@jchptf/nestjs';
import { Lobby } from './lobby.class';
import { Observable } from 'rxjs';
import { NewPlayerEvent } from './event-model/new-player-event.class';
import { LobbyConfig } from './service-model/lobby-config.class';

export const LIBRARY_MODULE_ID = 'LibraryModule';
export type LIBRARY_MODULE_ID = typeof LIBRARY_MODULE_ID;

export const EVENT_BUS_PROVIDER_TOKEN =
   getLocalProviderTokenString<EventBus, LIBRARY_MODULE_ID>(
      LIBRARY_MODULE_ID, 'EventBus');

export const LOBBY_CONFIG_PROVIDER_TOKEN =
   getLocalProviderTokenString<LobbyConfig, LIBRARY_MODULE_ID>(
      LIBRARY_MODULE_ID, 'LobbyConfig');

export const LOBBY_PROVIDER_TOKEN =
   getLocalProviderTokenString<Lobby, LIBRARY_MODULE_ID>(
      LIBRARY_MODULE_ID, 'Lobby');

export const NEW_ARRIVAL_OBSERVABLE_PROVIDER_TOKEN =
   getLocalProviderTokenString<Observable<NewPlayerEvent>, LIBRARY_MODULE_ID>(
      LIBRARY_MODULE_ID, 'Observable<NewPlayerEvent>');

export const FLUSH_OBSERVER_PROVIDER_TOKEN =
   getLocalProviderTokenString<Observer<FlushEvent>, LIBRARY_MODULE_ID>(
      LIBRARY_MODULE_ID, 'Observer<FlushEvent>');
