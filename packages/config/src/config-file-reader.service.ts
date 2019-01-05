import {IConfig} from 'config';
import {illegalState} from '@thi.ng/errors';
import {Injectable} from '@nestjs/common';
import {DotenvConfigOptions} from 'dotenv';
import * as dotenv from 'dotenv';
import * as path from 'path';

import {IConfigFileReader} from './interfaces/config-file-reader.interface';


@Injectable()
export class ConfigFileReaderService implements IConfigFileReader
{
   private config?: IConfig;

   constructor(private readonly dotenvOptions?: DotenvConfigOptions | false) {}

   /**
    * Default dotenv config point to a .env
    * on the cwd path
    * @returns {{path: string}}
    */
   private static defaultDotenvConfig() {
      return {
         path: path.join(process.cwd(), '.env'),
      };
   }

   public bootstrap(): void
   {
      if (!! this.config) {
         throw illegalState('Only call ConfigFileReader.bootstrap() one time during startup.');
      }

      // Dotenv is used to set the location of configuration file content primarily, but may also be
      // a source for custom environment variable overrides.  See package.json 'cev' run script.
      if (this.dotenvOptions !== false) {
         dotenv.load(this.dotenvOptions || ConfigFileReaderService.defaultDotenvConfig());
      }

      console.log(
         `Bootstrapping configuration with:
   ** NODE_CONFIG_DIR=${process.env['NODE_CONFIG_DIR']}
   ** NODE_ENV=${process.env['NODE_ENV']}`);

      this.config = require('config');
   }

   public readConfigKey<T extends any = any>(configKey: string, defaultValue?: T): T
   {
      if (! this.config) {
         throw illegalState('Cannot read configuration keys until after bootstrap() has been called!');
      }

      if (this.config.has(configKey)) {
         return this.config.get(configKey);
      }

      if (! defaultValue) {
         throw illegalState(`No value or default available for ${configKey}`);
      }

      return defaultValue;
   }

   public get<T extends any = any>(configKey: string, defaultValue?: T): T
   {
      return this.readConfigKey(configKey, defaultValue);
   }
}
