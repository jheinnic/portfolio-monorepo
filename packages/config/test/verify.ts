import * as util from 'util';

export class HolderOne
{
   private holdIt: any;

   constructor()
   {
      this.holdIt = require('config');
   }

   useIt() {
      console.log(
         this.holdIt.get('env.one'),
      );
   }
}

export class HolderTwo
{
   private holdIt: any;

   constructor()
   {
      this.holdIt = require('config');
   }

   modifyIt()
   {
      console.log(
         util.inspect(this.holdIt, 5, true, 5)
      );
      this.holdIt.env.one = 24;
      this.holdIt.env.two = 11;
      this.holdIt.env.test = this.holdIt.env.test + this.holdIt.env.test;
      console.log(
         util.inspect(this.holdIt, 5, true, 5)
      );
      console.log(
         this.holdIt.get('env.two'),
      );
   }
}

export class HolderThree
{
   private holdIt: any;

   constructor()
   {
      this.holdIt = require('config');
   }

   useIt() {
      console.log(
         this.holdIt.get('env.test'),
      );
   }
}

const one = new HolderOne();
const two = new HolderTwo();

two.modifyIt();

const three = new HolderThree();
one.useIt();
three.useIt();
