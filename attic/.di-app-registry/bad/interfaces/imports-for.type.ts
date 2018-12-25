import {interfaces} from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;
import {Keys} from 'simplytyped';

export type ImportsFor<I> = {
   [K in Keys<I>]: ServiceIdentifier<I[K]>
}