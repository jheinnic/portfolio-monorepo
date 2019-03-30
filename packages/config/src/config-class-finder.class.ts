import { Type } from '@nestjs/common';
import { bindNodeCallback, from, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Glob, sync as globSync } from 'glob';
import * as assert from 'assert';
import * as path from 'path';

import {
   DynamicProviderBindingStyle, IModule, IBySupplierFactoryCall, IBoundDynamicModuleImport,
} from '@jchptf/nestjs';

import {
   CONFIG_READER_PROVIDER_TOKEN, CONFIG_LOADER_PROVIDER_TOKEN, ConfigModuleId,
} from './di';
import { IConfigClassFinder, IConfigReader, IConfigLoader } from './interfaces';

/**
 * This class is not constructed by Nest through DI because it needs to exist at the time when
 * Providers are being defined, which is before DI has taken place.  It could not be used to
 * generate Provider instances if it itself had to be constructed through a Provider, because that
 * would mean its opportunity to contribute additional Providers to the DI data set would have
 * already come and gone.
 *
 * In many ways this seems similar to constraints found in the Spring UtilityContainer with regard
 * to BeanFactoryPostProcessors not being eligible for certain DI features by virtue of where their
 * functionality is applied in the framework's broader lifecycle stages.
 */
export class ConfigClassFinder<Consumer extends IModule> implements IConfigClassFinder<Consumer>
{
   private readonly resolvedSearchRoot: string;

   constructor(private readonly loadConfigGlob: string, searchRootDir?: string)
   {
      this.resolvedSearchRoot =
         ConfigClassFinder.resolveSearchRoot(searchRootDir);
   }

   /**
    * Resolves and stores sources directory for application.
    * @param {string} startPath
    *  The path for search starting. Can be any path under current working directory.
    */
   private static resolveSearchRoot(startPath?: string): string
   {
      const root = process.cwd();
      const retVal = !startPath
         ? root
         : !path.isAbsolute(startPath)
            ? path.normalize(
               path.join(root, startPath))
            : path.normalize(startPath);

      assert.ok(
         retVal.startsWith(root),
         'Start path must be relative to current working directory',
      );

      return retVal;
   }

   /**
    * @returns {Promise<Config>}
    */
   public loadConfigAsync():
      Observable<IBoundDynamicModuleImport<any, typeof ConfigModuleId, Consumer>>
   {
      const globPattern =
         path.join(this.resolvedSearchRoot, this.loadConfigGlob);
      console.log('Glob is', globPattern);
      const boundFunction = (callback: (err: Error | null, matches: string[]) => void) => {
         new Glob(globPattern, {}, callback);
      };

      const boundCallback = bindNodeCallback(boundFunction);

      return this.parseMatchingFiles(
         boundCallback()
            .pipe(
               mergeMap((paths: string[]) => from(paths))));
   }

   /**
    * Load config synchronously
    */
   public loadConfigSync():
      Observable<IBoundDynamicModuleImport<any, typeof ConfigModuleId, Consumer>>
   {
      const globPattern: string =
         path.join(this.resolvedSearchRoot, this.loadConfigGlob);
      const matches: string[] = globSync(globPattern);

      return this.parseMatchingFiles(
         from(matches),
      );
   }

   /**
    * Config graph from an array of paths
    * @param configPaths
    * @returns {any}
    */
   private parseMatchingFiles(configPaths: Observable<string>):
      Observable<IBoundDynamicModuleImport<any, typeof ConfigModuleId, Consumer>>
   {
      return configPaths.pipe(
         tap(
            (file: string) => {
               console.log('Examining', file);
            },
         ),
         mergeMap(
            (filePath: string) => // Observable<ConstructorFunction<any>> =>
               Object.values(require(filePath)) as Type<any>[]),
         // filter(
         //    (clazz: ConstructorFunction<any>) =>
         //       this.configMetaHelper.hasProviderToken(clazz)),
         map((clazz: Type<any>) => {
            const retValTwo: IBySupplierFactoryCall<
               typeof clazz, typeof ConfigModuleId, any,
               (loader: IConfigLoader, reader: IConfigReader) => Promise<typeof clazz>
            > = {
               style: DynamicProviderBindingStyle.SUPPLIER_INJECTED_FUNCTION,
               provide: clazz,
               useFactory: async (
                  configLoader: IConfigLoader, configReader: IConfigReader) =>
                  configLoader.loadInstance(clazz, configReader),
               inject: [CONFIG_LOADER_PROVIDER_TOKEN, CONFIG_READER_PROVIDER_TOKEN],
            };

            console.log(`<${retValTwo}>`);
            return retValTwo;
         }),
      );
   }
}
