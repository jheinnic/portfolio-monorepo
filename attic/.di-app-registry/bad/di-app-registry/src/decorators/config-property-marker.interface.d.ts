import { MetadataAccessor } from '@loopback/metadata';
export interface ConfigPropertyMarker {
    readonly configKey: string;
}
export declare const CONFIG_PROPERTY_MARKER_KEY: MetadataAccessor<ConfigPropertyMarker, PropertyDecorator>;
