import { ConcreteFactoryService } from './concrete-factory-service.interface';
import { InstallationActivity } from './installation-activity.interface';
export declare type InstallationActivityFactory<In, Out> = ConcreteFactoryService<'begin', InstallationActivity<Out>, [In]>;
