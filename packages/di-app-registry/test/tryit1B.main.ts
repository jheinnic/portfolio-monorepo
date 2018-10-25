import {
   Container, inject, injectable, interfaces, named, namedConstraint, tagged, taggedConstraint
} from 'inversify';
import 'reflect-metadata';

@injectable()
export class Toy {
   private static source: number = 0;
   public readonly value: number;

   constructor() {
      this.value = Toy.source++;
   }
}

const factorySymbol: symbol = Symbol.for('Factory<Toy>');
const toySymbol: symbol = Symbol.for('Toy');
const boxSymbol: symbol = Symbol.for('Box');

@injectable()
export class Box {
   constructor(
      @inject(toySymbol) @named("toy") @tagged("foo", "fop") @tagged("doo", "wop") private readonly toy: Toy
   ) { }

   open(): void {
      console.log(this.toy.value);
   }
}

@injectable()
export class App {
   constructor(
      @inject(factorySymbol) private readonly factory: () => Toy
   ) { }

   doStuff() {
      const toy: Toy = this.factory();
      console.log(toy);
      console.log(toy.value);
   }
}

export function createFactory(_context: interfaces.Context): () => Toy {
   return () => new Toy();
}

const container: interfaces.Container = new Container();
container.bind<ReturnType<typeof createFactory>>(factorySymbol).toFactory(createFactory).onActivation(
   (_context: interfaces.Context, injectable: ReturnType<typeof createFactory>): ReturnType<typeof createFactory> => {
      console.log('On Activation');
      console.log(injectable);
      console.log(injectable().value);
      console.log('After Activation');
      return injectable;
   }
);



container.bind(App).to(App);
container.bind(boxSymbol).to(Box);
// container.bind("toySymbol").to(Toy).whenInjectedInto("boxSymbol");
// container.bind(toySymbol).to(Toy).whenInjectedInto(Box);
container.bind(toySymbol).to(Toy).when(
   namedConstraint("toy") && taggedConstraint("doo")("wop")
   && taggedConstraint("foo")("fop")
);
// container.bind(toySymbol).to(Toy).whenTargetNamed("toy"); // .when(
   // typeConstraint(boxSymbol)
// );

const app: App = container.get(App);

app.doStuff();
app.doStuff();
app.doStuff();

console.log('a');

const boxOne: Box = container.get(boxSymbol);
const boxTwo: Box = container.get(boxSymbol);
const boxThree: Box = container.get(boxSymbol);

console.log('b');
boxOne.open();
boxOne.open();
boxThree.open();
boxTwo.open();
boxTwo.open();
boxOne.open();
boxThree.open();
boxThree.open();

