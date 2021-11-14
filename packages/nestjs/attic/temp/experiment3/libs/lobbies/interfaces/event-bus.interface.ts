import { INotify } from '@jchptf/api';

export interface IEventBus extends INotify
{
    publish(notifier: INotify): void;
}
