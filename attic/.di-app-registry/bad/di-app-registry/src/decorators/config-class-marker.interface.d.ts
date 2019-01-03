import { MetadataAccessor } from '@loopback/metadata';
import { interfaces } from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;
export interface ConfigClassMarker {
    readonly defaultRoot?: string;
    readonly diType?: ServiceIdentifier<any>;
}
export declare const CONFIG_CLASS_MARKER_KEY: MetadataAccessor<ConfigClassMarker, ClassDecorator>;
