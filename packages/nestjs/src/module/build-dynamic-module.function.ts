import { DynamicModule, ForwardReference, Provider, Type } from '@nestjs/common';
import { Builder } from 'fluent-interface-builder';

import { IDirector } from '@jchptf/api';
import { compileNestProvider, NestProvider } from '../provider';
import { IWorkingDynamicModule } from './working-dynamic-module.interface';
import { IDynamicModuleBuilder } from './dynamic-module-builder.interface';
import { InjectableKey } from '../token';

interface IDynamicModuleBuilderImpl extends IDynamicModuleBuilder
{
   value: IWorkingDynamicModule;

   build(): DynamicModule;
}

export function buildDynamicModule(
   consumer: Type<any>,
   basis: Type<any>,
   director: IDirector<IDynamicModuleBuilder>): DynamicModule
{
   const builderFactory =
      new Builder<IWorkingDynamicModule, IDynamicModuleBuilderImpl>()
         .chain(
            'bindInputProvider',
            <Component>(inputProvider: NestProvider<Component>) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  const newProviders: Exclude<Provider, Type<any>>[] =
                     compileNestProvider(inputProvider);
                  const newExport = newProviders[0].provide;

                  return {
                     ...ctx,
                     inner: {
                        ...ctx.inner,
                        providers: [...ctx.inner.providers!, ...newProviders],
                        exports: [...ctx.inner.exports!, newExport],
                     },
                  };
               },
         )
         .chain('bindProvider', <Component>(
            localProvider: NestProvider<Component>,
            exportAs: InjectableKey<Component> | boolean = false,
            ) => (ctx: IWorkingDynamicModule): IWorkingDynamicModule => {
               const newProviders: Exclude<Provider, Type<any>>[] =
                  compileNestProvider(localProvider);
               const localInjectableKey = newProviders[0].provide;

               const newExports: InjectableKey<Component>[] = [];
               if (exportAs === true) {
                  newExports.push(localInjectableKey);
               } else if (exportAs === false) {
                  // No-op
               } else {
                  newExports.push(exportAs);

                  if (exportAs !== localInjectableKey) {
                     newProviders.push({
                        provide: exportAs,
                        useFactory: obj => obj,
                        inject: [localInjectableKey],
                     });
                  }
               }

               return {
                  ...ctx,
                  outer: {
                     ...ctx.outer,
                     providers: [...ctx.outer.providers!, ...newProviders],
                     exports: [...ctx.outer.exports!, ...newExports],
                  },
               };
            },
         )
         .chain(
            'import',
            (
               source: Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference,
               andExport: boolean = false) => (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               (
                  {
                     ...ctx,
                     outer: {
                        ...ctx.outer,
                        imports: [...ctx.outer.imports!, source],
                        exports: andExport ? [...ctx.outer.exports!, source] : ctx.outer.exports,
                     },
                  }
               ),
         )
         .chain(
            'imports',
            (
               source: (Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference)[],
               exportAll: boolean = false) => (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               (
                  {
                     ...ctx,
                     outer: {
                        ...ctx.outer,
                        imports: [...ctx.outer.imports!, ...source],
                        exports: exportAll ? [...ctx.outer.exports!, ...source] : ctx.outer.exports,
                     },
                  }
               ),
         )
         .chain(
            'controller',
            (source: Type<any>) => (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               (
                  {
                     ...ctx,
                     outer: {
                        ...ctx.outer,
                        controllers: [...ctx.outer.controllers!, source],
                     },
                  }
               ),
         )
         .chain(
            'controllers',
            (source: Type<any>[]) => (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               (
                  {
                     ...ctx,
                     outer: {
                        ...ctx.outer,
                        controllers: [...ctx.outer.controllers!, ...source],
                     },
                  }
               ),
         )
         .unwrap<DynamicModule>(
            'build', () => (ctx: IWorkingDynamicModule): DynamicModule => {
               const inner = ctx.inner;
               const outer = ctx.outer;
               outer.imports!.push(inner);

               return outer;
            },
         )
         .value;

   const builder: IDynamicModuleBuilderImpl = new builderFactory(
      {
         consumer,
         inner: {
            module: consumer,
            imports: [],
            controllers: [],
            providers: [],
            exports: [],
         },
         outer: {
            module: basis,
            imports: [],
            controllers: [],
            providers: [],
            exports: [],
         },
      },
   );
   director(builder);

   return builder.build();
}
