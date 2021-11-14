import { Inject, Injectable } from '@nestjs/common';
import { POWER_CONTAINER } from './constants';
import { UtilityContainer } from './classes';

export interface IPluggable {
   supplyPower(socket: Socket): void;
   disconnect(): void;
   hasPower(): boolean;
}

@Injectable()
export class Socket
{
   private powered?: IPluggable;

   constructor()
   { }

   connect(plug: IPluggable): void {
      if (!! this.powered) {
         this.powered.disconnect();
      }

      return plug.supplyPower(this);
   }
}

@Injectable()
export class Lamp implements IPluggable
{
   private connectedTo?: Socket;

   constructor(@Inject(POWER_CONTAINER) powerSource: UtilityContainer<Socket>)
   {
      powerSource.register('lamp', this);
   }

   public disconnect(): void
   {
      this.connectedTo = undefined;
   }

   public supplyPower(socket: Socket): void
   {
      this.connectedTo = socket;
   }

   public hasPower(): boolean
   {
      return !! this.connectedTo;
   }
}

@Injectable()
export class Blender implements IPluggable
{
   private connectedTo?: Socket;

   constructor(@Inject(POWER_CONTAINER) powerSource: UtilityContainer<Socket>)
   {
      console.log('Creating a Blender!');
      powerSource.register('blender', this);
   }

   public disconnect(): void
   {
      this.connectedTo = undefined;
   }

   public supplyPower(socket: Socket): void
   {
      this.connectedTo = socket;
   }

   public hasPower(): boolean
   {
      return !! this.connectedTo;
   }
}
