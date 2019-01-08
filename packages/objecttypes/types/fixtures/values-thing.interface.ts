import { StateCode } from './state-code.enum';

export interface IMutableValuesThing
{
   name: string;
   age: number;
   addressLines: string[];
   city: string;
   state: StateCode;
   zip: number;
}

export type IImmutableValuesThingOne = Readonly<IMutableValuesThing>;

export interface IImmutableValuesThingTwo
{
   readonly name: string;
   readonly age: number;
   readonly addressLines: string[];
   readonly city: string;
   readonly state: StateCode;
   readonly zip: number;
}

export interface IReadableValuesThing
{
   name(): string;

   age(): number;

   addressLines(): string[];

   city(): string;

   state(): StateCode;

   zip(): number;
}

export interface IOptionsBagThingOne extends IReadableValuesThing
{
   setName(value: string): void;

   setAge(value: number): void;

   setAddressLines(value: string[]): void;

   setCity(value: string): void;

   setState(value: StateCode): void;

   setZip(value: number): void;
}

export interface IOptionsBagThingTwo
{
   getName(): string;

   setName(value: string): void;

   getAge(): number;

   setAge(value: number): void;

   getAddressLines(): string[];

   setAddressLines(value: string[]): void;

   getCity(): string;

   setCity(value: string): void;

   getState(): StateCode;

   setState(value: StateCode): void;

   getZip(): number;

   setZip(value: number): void;
}

export interface IThingHelper
{
   getName(): string;

   age: number;
   readonly city: string;

   computeScore(origin: StateCode, destination: StateCode): number;
}

export interface IThingHelperPlus extends IThingHelper
{
   passed: boolean;
   version: string;
}