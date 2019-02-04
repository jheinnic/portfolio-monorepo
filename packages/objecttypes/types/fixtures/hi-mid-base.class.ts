export class Base {
   one: boolean;
   two: number;
   three: string[] | boolean;

   constructor() {
      this.one = true;
      this.two = 2;
      this.three = ['false'];
   }
}

export class Mid extends Base {
   foo(): any { return 24; }
   bar(): void { console.log(this.two); }
   three: boolean;

   constructor() {
      super();
      this.three = false;
   }
}

export class High extends Mid {
   foo(): string { return "24"; }
   baz(r: boolean, a: number) { if (r) { return a; } return 5; }
   four: boolean|string;

   constructor() {
      super();
      this.four = 'true';
   }
}

export class Last extends High { }

export class Final extends Last { }
