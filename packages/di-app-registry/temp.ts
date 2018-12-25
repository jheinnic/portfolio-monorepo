import {Container, interfaces, injectable, inject} from 'inversify';

@injectable()
export class Bob {
   constructor(@inject("number") public value: number) { }
}

export const foo: interfaces.Container = new Container();

foo.bind("number").toConstantValue(8);

foo.bind<Bob>("name").toFactory((_context: interfaces.Context) =>
   // (val1: number) => (val2: number) => new Bob( val1 + val2 )
   (val1: number) => (val2: number) => (val3: number) => new Bob( val1 + val2 + val3 )
)
   .onActivation((_context: interfaces.Context, _bob: Bob): Bob => {
      console.log('ccc');
      return _bob;
   }).whenTargetNamed("bob")
   .onActivation((_context: interfaces.Context, _bob: Bob): Bob => {
      console.log('aaa');
      return _bob;
   });
/*
   }).whenTargetNamed('sue')
   .onActivation((_context: interfaces.Context, _bob: Bob): Bob => {
      console.log('bbb');
      return _bob;
   });
*/

