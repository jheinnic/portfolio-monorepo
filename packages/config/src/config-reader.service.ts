import { illegalState } from '@thi.ng/errors';
import { IConfig } from 'config';
import * as dotenv from 'dotenv';
import * as path from 'path';

import { IConfigReader } from './interfaces';
import { Consul } from 'consul';

// @Injectable()
export class ConfigReader implements IConfigReader
{
   private config?: IConfig;

   constructor(
      private readonly dotenvOptions: dotenv.DotenvConfigOptions | false =
         { path: path.join(process.cwd(), '.env') }),
      private readonly consulClient?: Consul,
   { }

   public bootstrap(): void
   {
      if (!!this.config) {
         throw illegalState('Only call ConfigReader.bootstrap() one time during startup.');
      }

      // Dotenv is used to set the location of configuration file content primarily, but may also be
      // a source for custom environment variable overrides.  See package.json 'cev' run script.
      if (!! this.dotenvOptions) {
         dotenv.load(this.dotenvOptions);
      }

      console.log(
         `Bootstrapping configuration with:
   ** NODE_CONFIG_DIR=${process.env['NODE_CONFIG_DIR']}
   ** NODE_ENV=${process.env['NODE_ENV']}`);

      this.config = require('config');
   }

   public readConfigKey<T = any>(configKey: string, defaultValue?: T): T
   {
      if (!this.config) {
         throw illegalState(
            'Cannot read configuration keys until after bootstrap() has been called!');
      }

      if (this.config.has(configKey)) {
         return this.config.get(configKey);
      }

      if (!defaultValue) {
         throw illegalState(`No value or default available for ${configKey}`);
      }

      return defaultValue;
   }

   // public get<T = any>(configKey: string, defaultValue?: T): T
   // {
   //    return this.readConfigKey(configKey, defaultValue);
   // }
}
