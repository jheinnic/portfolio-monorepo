import {IDirector} from '@jchptf/api';
import {IComponentContractBuilder} from '../component';

export abstract class CompositeComponent
{
   abstract getContract(): IDirector<IComponentContractBuilder>;
}
