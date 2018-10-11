class A<T> {
   private items: T[];

   constructor(item: T) {
      this.items = [item];
   }

   do(): T {
      return this.items[0];
   }

   map<U>(callback?: (item: T, idx: number, a: this) => U): this {
      // boring implementation details
      if (!!callback && this.items.length > 0) {
         return new A<U>(
            callback(this.items[0], 0, this)
         ) as unknown as this;
      }

      return this;
   };
}

class B<R, T> extends A<[C<R, T>]> {
   foo(): void {};

   constructor(unit: [C<R,T>]) {
      super(unit);
   }
}

class C<K, V> {
   map: [K, V][] = [];
}

class D extends Array<C<number, string>> {
   0: C<number, string>;
   length: 1;

   constructor() {
      super(1);
      this[0] = new C<number, string>();
   }
}

const c: [C<number,string>] = new D();

let b: B<number, string> = new B<number, string>(c);
let d: B<number, string> = b.map<Date>(() => new Date());

// let e: typeof d = {
//    foo: () => { },
//    items: [],
//    do: () => { return c; },
//    map: b.map
// };

console.log(b);
console.log(b.do());
console.log(d);
console.log(d.do());
