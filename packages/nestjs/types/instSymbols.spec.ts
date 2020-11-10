import { BindableProviderTokens, BindableScope, IModule, IToken, MODULE_ID } from '@jchptf/nestjs';

export type BindableProviderTokens<Module extends IModule, Component extends {} = any> = {
   [K in IToken<BindableScope<Module>>]: BindableScope<Module>[K] extends Component ? K : never
}[IToken<BindableScope<Module>>];

export const AKey = Symbol('AKey');
export type AKey = typeof AKey;

export const ThingOne = Symbol('ThingOne');
export type ThingOne = typeof ThingOne;

export const ThingTwo = Symbol('ThingTwo');
export type ThingTwo = typeof ThingTwo;

export interface ITypeOne {
   a: number;
   b: boolean;
}
export interface ITypeTwo {
   a: 'right' | 'left';
   b: number | boolean;
}
export class Foo {
   readonly [MODULE_ID] = AKey;

   [ThingOne]: ITypeOne[];
   [ThingTwo]: ITypeTwo;
   bob = "f";
}
export function bless<C extends Foo[keyof Foo]>(_token: keyof Foo): _token is BindableProviderTokens<Foo, C>
{
   // tslint:disable-next-line:void-return
    return true;
}
export function gbless<C extends IModule>(_token: keyof C): _token is BindableProviderTokens<C, C[IToken<C>]> {
   return true;
}

export let f: IToken<Foo> = ThingOne;
f = ThingTwo;
f = "harry";
f = "bob";
export let g: BindableProviderTokens<Foo, ITypeTwo>;
if (bless<>(f)) {
   g = f;
}

// export let TypeA1: BindableProviderTokens<Array<{}>, typeof Foo, ThingOne>;
// $ExpectType boolean
bless(ThingOne);
// bless(ThingTwo);
export let TypeA1: BindableProviderTokens<Foo, ITypeOne[]> = ThingOne;
// $ExpectType boolean
export let TypeB1: BindableProviderTokens<Foo, ITypeTwo> = ThingTwo;
// $ExpectType boolean
export let TypeA2 = bless(ThingOne);
// $ExpectType boolean
export let TypeA22: typeof TypeA2;
// $ExpectType boolean
export let TypeB2 = bless(ThingTwo);
// $ExpectType boolean
export let TypeB22: typeof TypeB2;
// $ExpectType boolean
export let TypeA3: LocalProviderToken<string, typeof Foo, ThingOne>;
// $ExpectType boolean
export let TypeB3: LocalProviderToken<string, typeof Foo, ThingTwo>;
// $ExpectType boolean
export let TypeA4: LocalProviderToken<ITypeTwo[], typeof Foo, ThingOne>;
// $ExpectType boolean
export let TypeB4: LocalProviderToken<ITypeTwo[], typeof Foo, ThingTwo>;
