import {interfaces} from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;
import {Keys} from 'simplytyped';

export type ExportsFor<E> = {
   [K in Keys<E>]: ServiceIdentifier<E[K]>
}