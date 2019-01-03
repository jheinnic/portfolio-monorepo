import { interfaces } from 'inversify';
import { ConstructorFunction } from 'simplytyped';
export declare function configClass(defaultRoot?: string, diType?: interfaces.ServiceIdentifier<any>): <TFunction extends ConstructorFunction<any>>(target: TFunction) => void;
