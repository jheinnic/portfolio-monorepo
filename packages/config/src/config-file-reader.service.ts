import { illegalState } from '@thi.ng/errors';
import { IConfig } from 'config';
import * as dotenv from 'dotenv';
import * as path from 'path';

import { IConfigFileReader } from './interfaces';

// @Injectable()
export class ConfigFileReader implements IConfigFileReader
{
   // private static INSTANCE: ConfigFileReader;
   //
   // public static getInstance(): IConfigFileReader
   // {
   //    if (!ConfigFileReader.INSTANCE) {
   //       ConfigFileReader.setDotEnvOptions();
   //    }
   //
   //    return ConfigFileReader.INSTANCE;
   // }

   // public static getFileReader(): IConfigFileReader
   // {
   //    if (!ConfigLoader.INSTANCE) {
   //       ConfigLoader.setDotEnvOptions();
   //    }
   //
   //    return ConfigLoader.READER;
   // }

   /*
    * Call this once before the first call to {@link IConfigLoader.getInstance()} to override any of
    * dotenv's default configuration options before they are used to bootstrap the location of
    * IConfigLoader's bootstrap data location.
    *
    * @param options
    */
   // public static setDotEnvOptions(options?: dotenv.DotenvConfigOptions)
   // {
   //    if (!!ConfigFileReader.INSTANCE) {
   //       throw new Error(
   //          'Dotenv options must be set before the configuration library is bootstrapped');
   //    }
   //
   //    // TODO: Multiple calls?  Deep clone?
   //    const dotenvOptions: dotenv.DotenvConfigOptions = !options ? {} : {...options};
   //    ConfigFileReader.INSTANCE = new ConfigFileReader(dotenvOptions);
   // }

   private config?: IConfig;

   constructor(private readonly dotenvOptions: dotenv.DotenvConfigOptions | false =
      { path: path.join(process.cwd(), '.env') })
   { }

   public bootstrap(): void
   {
      if (!!this.config) {
         throw illegalState('Only call ConfigFileReader.bootstrap() one time during startup.');
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
