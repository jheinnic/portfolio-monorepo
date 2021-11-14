import { Type, DynamicModule, Module } from '@nestjs/common';
import { ForwardReference } from '@nestjs/common/interfaces/modules/forward-reference.interface';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Abstract } from '@nestjs/common/interfaces/abstract.interface';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { AssertTrue, AssertFalse, IsExactly } from '@jchptf/objecttypes';

export interface IDynamicModule extends IModuleMetadata {
   module: Type<IModule>;
}

export interface IModuleMetadata {
   imports?: ArrayLike<Type<IModule> | IDynamicModule | Promise<IDynamicModule> | ForwardReference>;
   controllers?: Type<any>[];
   providers?: Provider[];
   exports?: ArrayLike<DynamicModule | Promise<DynamicModule> |
     ProviderToken | Provider | ForwardReference | Abstract<any>>;
}

export interface IImports<M extends IModule> {
   readonly imports: M;
}

export interface IModule {
   readonly moduleId: Type<Any>;
}

export const aProp: unique symbol = Symbol('aProp');
export const bProp: unique symbol = Symbol('bProp');
export const cProp: unique symbol = Symbol('bProp');
export const dProp: unique symbol = Symbol('bProp');
export const eProp: unique symbol = Symbol('bProp');

export const aaProp: symbol = Symbol('aProp');
export const bbProp: symbol = Symbol('bProp');
export const ccProp: symbol = Symbol('bProp');
export const ddProp: symbol = Symbol('bProp');
export const eeProp: symbol = Symbol('bProp');

@Module({
   imports: [BaseModule, SpecialModule],
})
export class MyModule {

}

export class MyIModule {
   readonly moduleId: MyModule;
   readonly imports: BaseIModule | SpecialIModule;
}

export const myIModuleMeta: ModuleMetadata = {
   imports: [MyIModule, BaseIModule],
};

@Module({
   imports: [BaseModule],
})
export class BaseModule {

}

export interface IBaseIModule {
   readonly moduleId: BaseModule;
}


export interface ISelfPicker<I extends ISelfPicker[] = []> {
   imports: UnionizeTuple<I>;
   pickme: keyof this;
   [aProp]: number;
   foo: number;
}

export interface ISubMod extends ISelfPicker<[]> {
   [bProp]: typeof aProp;
}

export interface ISubModTwo extends ISelfPicker {
   [cProp]: boolean;
}

export interface ISubModThree extends ISelfPicker<[ISubMod, ISubModTwo]> {
   // imports: [ISubMod, ISubModTwo];
}

export type XX<M extends SelfPicker<any>> =
   M extends SelfPicker<infer T> ? T['imports'] : never;

const asd: ISubMod = {};
const ndw: XX<ISubModThree> = asd;
const ddw: XX<ISubModThree> = {};
const A: AssertTrue<IsExactly<XX<ISubModThree>, ISubMod|ISubModTwo>> = 3;

export let foo: SubMod = {
   [aProp]: 4,
   [bProp]: aProp,
   foo: -19,
   pickme: bProp,
};
