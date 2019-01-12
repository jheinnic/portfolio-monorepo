import { Nominal } from './nominal.type';

export type ImpliedValue<N extends Nominal<any, string, any>> = N extends Nominal<infer Name, string, any> ? Name : any;

export type ImpliedName<N extends Nominal<any, string, any>> = N extends Nominal<any, infer Role, any> ? Role : string;

export type ImpliedType<N extends Nominal<any, string, any>> = N extends Nominal<any, string, infer Type> ? Type : any;
