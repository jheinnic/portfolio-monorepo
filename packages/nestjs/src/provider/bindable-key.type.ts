import { LocalProviderToken } from './provider-token.type';
import { IModule } from '../module';
import { Type } from '@nestjs/common';

export type BindableKey<Component extends {}, Module extends IModule, Token = string|symbol> =
   LocalProviderToken<Component, Module, Token> | Type<Component>;
