import { InputProviderParam, NestFactory } from '@jchptf/nestjs';
import { DOTENV_CONFIG_OPTIONS } from './config.constants';
import { DotenvConfigOptions } from 'dotenv';

export type DotEnvConfigParam<Factory extends NestFactory<false | DotenvConfigOptions>> =
   InputProviderParam<typeof DOTENV_CONFIG_OPTIONS, false | DotenvConfigOptions, Factory>;
