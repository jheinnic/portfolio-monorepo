import {IConfig} from 'config';
import {injectable} from 'inversify';
import {ClassType, transformAndValidateSync} from 'class-transformer-validator';
import {MetadataInspector, MetadataMap} from '@loopback/metadata';

import '@jchptf/reflection';
import {Wild} from '@jchptf/api';
import {IConfigLoader} from '../../config/src/interfaces/index';
import {CONFIG_CLASS_MARKER_KEY, ConfigClassMarker} from './decorators/config-class-marker.interface';
import {
   CONFIG_PROPERTY_MARKER_KEY, ConfigPropertyMarker
} from './decorators/config-property-marker.interface';


@injectable()
export class ConfigLoader implements IConfigLoader {
   private readonly config: IConfig;
   private readonly mapToDefaults: Map<ClassType<any>, any>;

   constructor() {
      require('dotenv').config();

      console.log(
`Bootstrapping configuration with:
   ** NODE_CONFIG_DIR=${process.env['NODE_CONFIG_DIR']}
   ** NODE_ENV=${process.env['NODE_ENV']}`);

      this.config = require('config');
      this.mapToDefaults = new Map<ClassType<any>, any>();
   }

   getConfig<T extends {}>(configClass: ClassType<T>, rootPath?: string): T
   {
      const defaultRoot: ConfigClassMarker | undefined =
         MetadataInspector.getClassMetadata(CONFIG_CLASS_MARKER_KEY, configClass);

      const actualRoot =
         (!! rootPath) ? rootPath
            : ((!! defaultRoot) ? defaultRoot.defaultRoot : undefined);

      const propMap: MetadataMap<ConfigPropertyMarker> =
         MetadataInspector.getAllPropertyMetadata(
            CONFIG_PROPERTY_MARKER_KEY, configClass.prototype );
      const resolvedConfig: Wild = {};
      if (!! propMap) {
         for (let nextEntry in propMap) {
            const configKey = `${actualRoot}.${propMap[nextEntry].configKey}`;
            resolvedConfig[nextEntry] = this.config.get(configKey);
         }
      }

      let baseline: T = this.mapToDefaults.get(configClass);
      if (! baseline) {
         baseline = new configClass();
         this.mapToDefaults.set(configClass, baseline);
      }

      return transformAndValidateSync(
         configClass, Object.assign({}, baseline, resolvedConfig), {
            validator: {
               forbidUnknownValues: true,
               skipMissingProperties: false
            }
         });
   }
}
