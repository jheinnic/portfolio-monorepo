import { Container, inject, injectable, tagged } from 'inversify';
import inversifyInjectDecorators from 'inversify-inject-decorators';
import 'reflect-metadata';

@injectable()
export class Moo {
   public toString() { return 'moo'; }
}

@injectable()
export class Baz {
   constructor(@inject(Moo) moo: Moo) {
      console.log(moo.toString());
   }

   public toString() { return 'baz'; }
}

@injectable()
export class Bar {
   constructor(@inject(Baz) baz: Baz) {
      console.log(baz.toString());
   }

   public toString() { return 'bar'; }
}

@injectable()
export class Foo
{
   constructor(@inject(Bar) @tagged('tag', 'on') bar: Bar)
   {
      console.log(bar.toString());
   }

   public toString() { return 'foo'; }
}

@injectable()
export class Goo extends Foo
{
   constructor(@inject(Bar) @tagged('tag', 'on') bar: Bar)
   {
      super(bar);
   }
}

@injectable()
export class Main
{
   constructor(@inject(Foo) foo: Foo) {
      console.log(foo.toString());
   }
}

const c: Container = new Container();
const { lazyInject } = getDecorators(c);
c.bind(Main).to(Main);
c.bind(Foo).to(Foo);
c.bind(Goo).to(Goo);
c.bind(Bar).to(Bar).whenTargetTagged('tag', 'on');
c.bind(Baz).to(Baz).whenParentTagged('tag', 'on');
c.bind(Moo).to(Moo).whenAnyAncestorTagged('tag', 'on');

const m:Main = c.get(Main);
console.log('Top', m);

export class Main2
{
   constructor() {

   }

   // @lazyInject(Symbol.for("foo"))
   @inject(Goo)
   // @ts-ignore
   public foo: Foo;
}

const m2 = new Main2();
console.log(m2.foo);
