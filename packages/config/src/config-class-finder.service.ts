import * as path from 'path';
import * as assert from 'assert';
import {Glob, sync as globSync} from 'glob';
import {ConstructorFunction} from 'simplytyped';
import {map, filter, mergeMap} from 'rxjs/operators';
import {bindNodeCallback, from, Observable} from 'rxjs';
import {Inject, Injectable, Provider} from '@nestjs/common';

import {IConfigurationFactory, IConfigClassFinder} from './interfaces';
import {CONFIGURATION_FACTORY_PROVIDER} from './di';

@Injectable()
export class ConfigClassFinderService implements IConfigClassFinder
{
   private readonly resolvedSearchRoot: string;

   constructor(
      @Inject(CONFIGURATION_FACTORY_PROVIDER) private readonly configFactory: IConfigurationFactory,
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
      let retVal = root;
      if (!startPath) {
         retVal = root;
      } else if (!path.isAbsolute(startPath)) {
         retVal = path.normalize(
            path.join(root, startPath));
      } else {
         retVal = path.normalize(startPath);
      }

      assert.ok(
         retVal.startsWith(root),
         'Start path must be relative to current working directory'
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
         map(
            (clazz: ConstructorFunction<any>) => {
               const retVal = {
                  provide: this.configFactory.getProviderToken(clazz),
                  useFactory: () => this.configFactory.loadInstance(clazz)
               };
               console.log(retVal);
               return retVal;
            }
         )
      );
   }
}