import { EVENT_BUS_PROVIDER_TOKEN } from './constants';
import { EventBus } from './event-bus.service';

@Module({
   providers: [
      {
         provide: EVENT_BUS_PROVIDER_TOKEN,
         useClass: EventBus,
      },
   ],
})
export class LibraryModule
{
   public static addLobbyModule(moduleConfig: DynamicModuleParam)
}