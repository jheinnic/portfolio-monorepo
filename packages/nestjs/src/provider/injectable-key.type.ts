import { Type } from '@nestjs/common';
import { VisibleProviderToken } from './provider-token.type';
import { IModule } from '../module';

export type InjectableKey<Component extends {}, Module extends IModule, Value = string|symbol> =
   VisibleProviderToken<Component, Module, Value> | Type<Component>;
