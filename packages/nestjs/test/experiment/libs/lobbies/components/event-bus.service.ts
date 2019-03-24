import { Injectable } from '@nestjs/common';
import { EVENT_ALL, IEvent, iNotify, INotify, Listener } from '@jchptf/api';
import { IEventBus } from '../interfaces/event-bus.interface';

@Injectable()
@iNotify()
export class EventBus implements IEventBus
{
   addListener(_id: string, _fn: Listener, _scope?: any): boolean
   {
      throw new Error('Method not implemented.');
   }

   removeListener(_id: string, _fn: Listener, _scope?: any): boolean
   {
      throw new Error('Method not implemented.');
   }

   notify(_event: IEvent): void
   {
      throw new Error('Method not implemented.');
   }

   public publish(notifier: INotify): void
   {
      notifier.addListener(EVENT_ALL, (event: IEvent) => {
         this.notify(event);
      });
   }
}
