import { interfaces } from 'inversify';
import ContainerModuleCallBack = interfaces.ContainerModuleCallBack;
import { ConcreteFactoryService } from './concrete-factory-service.interface';
/**
 * @deprecated
 */
export interface InstallerFactory<Args extends any[] = any[]> {
    (...args: Args): ContainerModuleCallBack;
}
export declare type InstallerService<Args extends any[] = any[]> = ConcreteFactoryService<'install', ContainerModuleCallBack, Args>;
export declare type InstallerConstructor<I extends InstallerService<any[]>> = {
    new (...args: any[]): I;
};
