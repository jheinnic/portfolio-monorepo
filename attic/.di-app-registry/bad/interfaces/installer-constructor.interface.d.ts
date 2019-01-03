import { InstallerService } from './installer-service.interface';
export declare type InstallerConstructor<I extends InstallerService<any[]>> = {
    new (...args: any[]): I;
};
