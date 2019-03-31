import { IChanMonitor } from './interfaces/chan-monitor.interface';
import { Chan, repeatTake } from 'medium';
import { IPromiseHandlers } from './interfaces/promise-handlers.interface';
import { illegalArgs } from '@thi.ng/errors';

export class ChanMonitor<Msg> implements IChanMonitor<Msg>
{
   private stopRequested: boolean;
   private running: boolean;

   constructor(
      private readonly source: Chan<any, Msg>,
      private readonly handlerMap: Map<Msg, IPromiseHandlers<Msg>>)
   {
      this.stopRequested = false;
      this.running = false;
   }

   public start(): Promise<void>
   {
      this.stopRequested = false;
      this.running = true;
      const handlerMap = this.handlerMap;

      return repeatTake(
         this.source,
         (next: Msg) => {
            const match = handlerMap.get(next);
            if (!match) {
               return;
            }

            const success = handlerMap.delete(next);
            if (success) {
               match.resolve(next);
            }

            if (this.stopRequested) { return false; }

            return;
         }
      ).then( (result: any) => {
         this.running = false;
         return result;
      });
   }

   public stop(): void {
      this.stopRequested = true;
   }

   public isStopping(): boolean {
      return ! this.stopRequested;
   }

   public isStopped(): boolean {
      return ! this.running;
   }

   public cancel(msg: Msg): boolean
   {
      const match = this.handlerMap.get(msg);
      if (!match) {
         return false;
      }

      const success = this.handlerMap.delete(msg);
      if (success) {
         match.reject('Cancelled');
      }

      return success;
   }

   public request(msg: Msg): Promise<Msg>
   {
      if (this.handlerMap.has(msg)) {
         throw illegalArgs(`${msg} is already being monitored`);
      }
      return new Promise<Msg>( (resolve, reject) => {
         const handlers = { resolve, reject };
         this.handlerMap.set(msg, handlers);
      })
   }

}