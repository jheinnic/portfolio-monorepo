import { Inject, Injectable } from '@nestjs/common';
import { LIBRARY_CLASS } from './constants';
import { UtilityContainer } from './classes';
import { Socket } from './power_classes';

@Injectable()
export class FruitBox
{
   public fruit: Apple|Orange|undefined;

   public connect(fruit: Apple|Orange): void {
      this.fruit = fruit;
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
   constructor(@Inject(LIBRARY_CLASS) private readonly truth: UtilityContainer<Socket>)
   { }

   testIt(): void
   {
      console.log(this.truth.getProto());
   }
}
