import { DynamicModuleParam, ModuleIdentifier } from '@jchptf/nestjs';
import { DotenvConfigOptions } from 'dotenv';
import { CONFIG_MODULE_ID, DOTENV_CONFIG_OPTIONS_PROVIDER_TOKEN } from './config.constants';

export type DotenvConfigParam<Consumer extends ModuleIdentifier> =
   DynamicModuleParam<false | DotenvConfigOptions, CONFIG_MODULE_ID, Consumer,
      typeof DOTENV_CONFIG_OPTIONS_PROVIDER_TOKEN>;
