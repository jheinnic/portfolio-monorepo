import {interfaces} from 'inversify';
import ContainerModuleCallBack = interfaces.ContainerModuleCallBack;

// type InstallerFunction<Args extends any[] = []> =
//    (moduleCallback: interfaces.ContainerModuleCallBack) =>
//       (...args: Args) => interfaces.ContainerModuleCallBack;

// export type InstallerFunction<F extends InstallerFactory<any[]>> =
//    F extends ((moduleCallback: interfaces.ContainerModuleCallBack) =>
//       (...args: infer Args) => interfaces.ContainerModuleCallBack)
//       ? InstallerFactory<Args> : never;

export interface InstallerFactory<Args extends any[] = any[]> {
   (moduleCallback: ContainerModuleCallBack): (...args: Args) => ContainerModuleCallBack;
}

