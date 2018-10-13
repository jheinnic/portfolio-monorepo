import {ApplicationInstaller} from '.';

export interface ApplicationBindingSyntax<A extends ApplicationInstaller>
{
   to(constructor: {new(...args: any[]): A}): void;
}
