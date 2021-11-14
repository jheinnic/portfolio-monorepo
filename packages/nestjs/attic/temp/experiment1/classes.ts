import { Inject, Injectable } from '@nestjs/common';
import {
   BLENDER, INJECTED_DEPENDENCY, LOCAL_DEPENDENCY, LAMP, POWER_CONTAINER, SOCKET,
} from './constants';
import { Blender, Lamp, Socket } from './power_classes';

@Injectable()
export class Dynamo {
   public readonly value: number = Math.random();

   constructor()
   { }
}

export interface IConnectable<Part>
{
   connect(part: Part): void;
}

export type ConnectablePart<Host extends IConnectable<any>> =
   Host extends IConnectable<infer P> ? P : never;

@Injectable()
export class UtilityContainer<Kind extends IConnectable<any>>
{
   constructor(
      @Inject(INJECTED_DEPENDENCY) private readonly proto: Kind,
      @Inject(LOCAL_DEPENDENCY) private readonly nameMap: Map<string, ConnectablePart<Kind>>)
   { }

   getProto(): Kind {
      return this.proto;
   }

   register(name: string, part: ConnectablePart<Kind>)
   {
      this.nameMap.set(name, part);
   }

   connect(name: string): void
   {
      const part = this.nameMap.get(name);
      this.proto.connect(part);
   }
}

@Injectable()
export class Application
{
   constructor(
      @Inject(POWER_CONTAINER) private readonly power: UtilityContainer<Socket>,
      @Inject(BLENDER) private readonly blender: Blender,
      @Inject(LAMP) private readonly lamp: Lamp,
      @Inject(SOCKET) private readonly socket: Socket,
   )
   {
   }

   public start(): void {
      console.log(this.socket);
      console.log(
         `Lamp power = ${this.lamp.hasPower()}; Blender power = ${this.blender.hasPower()}`);
      this.power.connect('lamp');
      console.log(
         `Lamp power = ${this.lamp.hasPower()}; Blender power = ${this.blender.hasPower()}`);
      this.power.connect('blender');
      console.log(
         `Lamp power = ${this.lamp.hasPower()}; Blender power = ${this.blender.hasPower()}`);
   }
}
