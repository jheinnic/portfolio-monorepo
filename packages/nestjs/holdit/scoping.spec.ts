// import {
//    blessGlobalProviderSymbol, blessLocalProviderToken, GlobalProviderToken, LocalProviderToken,
//    ProviderToken,
//    VisibleProviderToken
// } from './provider-token.type';
// import { SomethingOne, SomethingTwo, ModuleOne, ModuleTwo  } from './fixtures';
// import { getModuleIdentifier } from './provider-token.utilities';
//
// const nameOne = 'NameOne';
// const nameTwo = 'NameTwo';
// const nameThree = 'NameThree';
//
// export type modOne = 'ModuleOne';
// export type modTwo = 'ModuleTwo';
//
// export const modOneSomeOne = blessLocalProviderToken<SomethingOne, modOne>(nameOne);
// export const modOneSomeTwo = blessLocalProviderToken<SomethingTwo, modOne>(nameTwo);
//
// export const modTwoSomeOne = blessLocalProviderToken<SomethingOne, modTwo>(nameThree);
// export const modTwoSomeTwo = blessLocalProviderToken<SomethingTwo, modTwo>(nameTwo);
//
// export const globalSomeOne = blessGlobalProviderSymbol<SomethingOne>(nameOne);
// export const globalSomeTwo = blessGlobalProviderSymbol<SomethingTwo>(nameOne);
//
// function doo<Comp extends {}, Mod1 extends string, Mod2 extends string>(
//    fromToken: LocalProviderToken<Comp, Mod1>, toToken: LocalProviderToken<Comp, Mod2>)
// {
//    console.log(`From ${fromToken.toString()} to ${toToken.toString()}`);
// }
//
// doo(modOneSomeOne, modOneSomeOne);
//
// doo<SomethingOne, modOne, modTwo>(modOneSomeOne, modTwoSomeOne);
//
// // $ExpectType string
// export const test001: LocalProviderToken<SomethingOne, modOne> = modOneSomeOne;
//
// // $ExpectType string
// export const test002: LocalProviderToken<SomethingTwo, modOne> = modTwoSomeTwo;
//
// // $ExpectType string
// export const test003: LocalProviderToken<SomethingOne, modTwo> = modTwoSomeTwo;
//
// // $ExpectType string
// export let test004: LocalProviderToken<SomethingOne, modOne> = modTwoSomeTwo;
//
// export let test005: VisibleProviderToken<SomethingOne, modOne> = modOneSomeOne;
//
// export let test006: GlobalProviderToken<SomethingTwo> = globalSomeTwo;
//
// export let test007: ProviderToken<SomethingOne> = modOneSomeOne;
//
// test005 = globalSomeOne;
//
// test005 = globalSomeTwo;
//
// test005 = modTwoSomeOne;
//
// test005 = modOneSomeOne;
//
// test005 = modOneSomeTwo;
//
// test007 = modTwoSomeOne;
//
// test005 = modTwoSomeTwo;
//
// test004 = globalSomeOne;
//
// test004 = globalSomeOne
//
// test004 = modTwoSomeOne
// test004 = modOneSomeTwo;
// test004 = modOneSomeOne;
//
// test006 = globalSomeTwo;
// test006 = globalSomeOne;
// test006 = modOneSomeTwo;
// test006 = modTwoSomeOne;
// test006 = modOneSomeOne;
// test006 = modTwoSomeTwo;
//
