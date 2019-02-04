import { bindNodeCallback, from, Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { ConstructorFunction } from 'simplytyped';
import { Glob, sync as globSync } from 'glob';
import { Provider } from '@nestjs/common';
import * as assert from 'assert';
import * as path from 'path';

import { IConfigClassFinder, IConfigFileReader, IConfigLoader } from './interfaces';
import { CONFIG_FILE_READER_PROVIDER } from './di';

/**
 * This class is not constructed by Nest through DI because it needs to exist at the time when
 * Providers are being defined, which is before DI has taken place.  It could not be used to
 * generate Provider instances if it itself had to be constructed through a Provider, because that
 * would mean its opportunity to contribute additional Providers to the DI data set would have
 * already come and gone.
 *
 * In many ways this seems similar to constraints found in the Spring Framework with regard to
 * BeanFactoryPostProcessors not being eligible for certain DI features by virtue of where their
 * functionality is applied in the framework's broader lifecycle stages.
 */
export class ConfigClassFinderService implements IConfigClassFinder
{
   private readonly resolvedSearchRoot: string;

   constructor(
      private readonly configFactory: IConfigLoader,
      private readonly loadConfigGlob: string, searchRootDir?: string)
   {
      this.resolvedSearchRoot =
         ConfigClassFinderService.resolveSearchRoot(searchRootDir);
   }

   /**
    * @param {string} dir
    * @returns {string}
    */
   private static root(dir: string = ''): string
   {
      return path.resolve(process.cwd(), dir);
   }

   /**
    * @param {string} dir
    * @returns {string}
    static src(dir: string = ''): string {
      const srcPath = this.srcPath || this.root();
      return path.resolve(srcPath, dir);
   }
    */

   /**
    * Resolves and stores sources directory for application.
    * @param {string} startPath
    *  The path for search starting. Can be any path under current working directory.
    */
   private static resolveSearchRoot(startPath?: string): string
   {
      const root = this.root();
      const retVal = !startPath
         ? root
         : !path.isAbsolute(startPath)
            ? path.normalize(path.join(root, startPath))
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
   public loadConfigAsync(): Observable<Provider>
   {
      const globPattern =
         path.join(this.resolvedSearchRoot, this.loadConfigGlob);
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
   public loadConfigSync(): Observable<Provider>
   {
      const globPattern: string =
         path.join(this.resolvedSearchRoot, this.loadConfigGlob);
      const matches: string[] = globSync(globPattern);

      return this.parseMatchingFiles(
         from(matches));
   }

   /**
    * Config graph from an array of paths
    * @param configPaths
    * @returns {any}
    */
   private parseMatchingFiles(configPaths: Observable<string>): Observable<Provider>
   {
      return configPaths.pipe(
         mergeMap(
            (filePath: string): Observable<ConstructorFunction<any>> =>
               from(
                  Object.values(
                     require(filePath)))),
         filter(
            (clazz: ConstructorFunction<any>) =>
               this.configFactory.hasConfigMetadata(clazz) &&
               this.configFactory.hasProviderToken(clazz)),
         mergeMap(
            (clazz: ConstructorFunction<any>) => {
               const retValOne = {
                  provide: this.configFactory.getProviderToken(clazz),
                  useFactory: async (configReader: IConfigFileReader) =>
                     this.configFactory.loadInstance(clazz, configReader),
                  inject: [CONFIG_FILE_READER_PROVIDER],
               };
               const retValTwo = {
                  provide: clazz,
                  useFactory: async (configReader: IConfigFileReader) =>
                     this.configFactory.loadInstance(clazz, configReader),
                  inject: [CONFIG_FILE_READER_PROVIDER],
               };

               console.log(retValOne, retValTwo);
               return from([retValOne, retValTwo]);
            },
         ),
      );
   }
}
