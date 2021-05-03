import { Nominal } from './nominal.type';

export type ImpliedValue<N extends Nominal<any, string, any>> =
   N extends Nominal<infer Value, string, any> ? Value : any;

export type ImpliedName<N extends Nominal<any, string, any>> =
   N extends Nominal<any, infer Name, any> ? Name : string;

export type ImpliedType<N extends Nominal<any, string, any>> =
   N extends Nominal<any, string, infer Type> ? Type : any;
