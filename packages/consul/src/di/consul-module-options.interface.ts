import { ConsulOptions } from 'consul';
import { ProviderToken } from '@jchptf/api'
import { ConstructorFor } from 'simplytyped';

export enum ConsulModuleOptionsStyle {
   VALUE,
   EXISTING,
   FACTORY
}

export interface ConsulModuleValueOptions {
   readonly style: ConsulModuleOptionsStyle.VALUE;
   readonly config: ConsulOptions;
}

export interface ConsulModuleExistingOptions {
   readonly style: ConsulModuleOptionsStyle.EXISTING;
   readonly provider: ConstructorFor<ConsulOptions> | ProviderToken<ConsulOptions>;
}

export interface ConsulModuleFactoryOptions<> {
   readonly style: ConsulModuleOptionsStyle.FACTORY;
   readonly factory: (...args: [any]) => Promise<ConsulOptions>;
   readonly inject: ProviderToken<any>[];
}

export type ConsulModuleOptions =
   ConsulModuleValueOptions |
   ConsulModuleExistingOptions |
   ConsulModuleFactoryOptions;
