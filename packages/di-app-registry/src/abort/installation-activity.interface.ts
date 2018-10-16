import {interfaces} from 'inversify';

export interface InstallationActivity<Out> {
   prepareContainerModule(): interfaces.ContainerModuleCallBack;

   replyOnModuleLoaded(): Out;
}
