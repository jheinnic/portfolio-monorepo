import { Inject, Injectable } from '@nestjs/common';
import { FRAMEWORK, MY_PROTO, ORANGE, PLUG } from './constants';

@Injectable()
export class Dynamo {
   public readonly value: number = Math.random();

   constructor()
   { }
}

@Injectable()
export class Framework<Kind>
{
   constructor(
      @Inject(MY_PROTO) private readonly proto: Kind)
   { }

   getProto(): Kind {
      return this.proto;
   }
}

@Injectable()
export class Socket
{
   constructor()
   { }
}

@Injectable()
export class Plug
{
   constructor(@Inject(FRAMEWORK) private readonly truth: Framework<Socket>)
   { }

   testIt(): void
   {
      console.log(this.truth.getProto());
   }
}

@Injectable()
export class Apple
{
   constructor()
   { }
}

@Injectable()
export class Orange
{
   constructor(@Inject(FRAMEWORK) private readonly truth: Framework<Apple>)
   { }

   testIt(): void
   {
      console.log(this.truth.getProto());
   }
}

@Injectable()
export class Application
{
   private orange: Orange;

   private plug: Plug;
   constructor(
      @Inject(ORANGE) orange: Orange, @Inject(PLUG) plug: Plug,
   )
   {
      this.orange = orange;
      this.plug = plug;
      console.log(this.orange, this.plug);
   }

   public start(): void {
      console.log('Choo Choo!', this);
   }
}
