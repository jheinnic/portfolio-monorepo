import {interfaces} from 'inversify';
import ContainerModuleCallBack = interfaces.ContainerModuleCallBack;
import {ConcreteFactoryService} from './concrete-factory-service.interface';

// type InstallerFunction<Args extends any[] = []> =
//    (moduleCallback: interfaces.ContainerModuleCallBack) =>
//       (...args: Args) => interfaces.ContainerModuleCallBack;

// export type InstallerFunction<F extends InstallerFactory<any[]>> =
//    F extends ((moduleCallback: interfaces.ContainerModuleCallBack) =>
//       (...args: infer Args) => interfaces.ContainerModuleCallBack)
//       ? InstallerFactory<Args> : never;

export interface InstallerFactory<Args extends any[] = any[]> {
   (...args: Args): ContainerModuleCallBack;
}

export type InstallerService<Args extends any[] = any[]> =
   ConcreteFactoryService<'install', ContainerModuleCallBack, Args>;

export type InstallerConstructor<I extends InstallerService<any[]>> = {
   new(...args: any[]): I
}
