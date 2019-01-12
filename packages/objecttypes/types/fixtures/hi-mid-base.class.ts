export class Base {
   one: boolean;
   two: number;
   three: string[] | boolean;
}

export class Mid extends Base {
   foo(): any { return 24; }
   bar(): void { console.log(this.two); }
   three: boolean;
}

export class High extends Mid {
   foo(): string { return "24"; }
   baz(r: boolean, a: number) { if (r) { return a; } return 5; }
   four: boolean|string;
}

export class Last extends High { }

export class Final extends Last { }


