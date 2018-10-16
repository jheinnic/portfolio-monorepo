import {InstallerService} from './installer-service.interface';

export interface IInstallerBindingSyntax {
   to<I>(installer: {new(...args: any[]): InstallerService<I>}): void;
}
