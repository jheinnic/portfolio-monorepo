import { interfaces } from 'inversify';
import Context = interfaces.Context;
import { InstallerFactory } from './installer-service.interface';
export interface InstallerFactoryCreator<I extends InstallerFactory> {
    (context: Context): I;
}
