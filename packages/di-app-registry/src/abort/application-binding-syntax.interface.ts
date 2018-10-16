import {ApplicationInstaller} from '.';

export interface IApplicationBindingSyntax<A extends ApplicationInstaller>
{
   to(constructor: {new(...args: any[]): A}): void;
}
