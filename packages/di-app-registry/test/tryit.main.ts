import {Container, inject, injectable, interfaces} from 'inversify';
import 'reflect-metadata';

export class Toy {
   private static source: number = 0;
   public readonly value: number;

   constructor() {
      this.value = Toy.source++;
   }
}

const factorySymbol: symbol = Symbol.for('Factory<Toy');

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

const app: App = container.get(App);

app.doStuff();
app.doStuff();
app.doStuff();

