import {interfaces} from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;

export type NestedContainerIdentifier = ServiceIdentifier<interfaces.Container>;
