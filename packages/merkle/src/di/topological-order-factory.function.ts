import {interfaces} from 'inversify';
import FactoryCreator = interfaces.FactoryCreator;
import Context = interfaces.Context;

import {IDirector} from '@jchptf/api';
import {IMerkleCalculator} from '../interface';
import {ITopoOrderBuilder, BlockTopologicalOrder} from '../traversal';
import {MERKLE_TYPES} from './types';

export const blockTopologicalOrderFactory: FactoryCreator<BlockTopologicalOrder> =
   (context: Context) => {
      const calculator: IMerkleCalculator = context.container.get(MERKLE_TYPES.MerkleCalculator)
      return (director: IDirector<ITopoOrderBuilder>): BlockTopologicalOrder => {
         return calculator.getTopoBlockOrder(director);
      };
   };
