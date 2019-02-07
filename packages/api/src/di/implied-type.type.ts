import { Nominal } from './nominal.type';

export type ImpliedValue<N extends Nominal<any, string, any>> =
   N extends Nominal<infer Value, infer _Name, infer _Type> ? Value : any;

export type ImpliedName<N extends Nominal<any, string, any>> =
   N extends Nominal<infer _Value, infer Name, infer _Type> ? Name : string;

export type ImpliedType<N extends Nominal<any, string, any>> =
   N extends Nominal<infer _Value, infer _Name, infer Type> ? Type : any;
