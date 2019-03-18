import { StringQualifier } from '@jchptf/api';
import { Type } from '@nestjs/common';

export type ModuleIdentifier = StringQualifier<'ModuleIdentifier'>;

export const MODULE_IDENTIFIER: unique symbol = Symbol('ModuleIdentifier');

export interface IModule extends Type<any> {
   [MODULE_IDENTIFIER]: ModuleIdentifier;
}
