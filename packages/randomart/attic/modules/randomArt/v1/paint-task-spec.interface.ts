import {Iterable} from '@reactivex/ix-ts';

import {PointMap} from '../../../../src/modules/randomArt/components';
import {InputTaskMessage} from '../../../../src/modules/randomArt/messages';

export interface ITaskLoader extends IterableIterator<InputTaskMessage>
{
   // readonly pixelWidth: number;
   // readonly pixelHeight: number;
   // readonly dimensionToken: string;
   // readonly fitOrFill: 'square' | 'fit' | 'fill';
   // readonly pointMapBatches: Iterable<Iterable<PointMap>>

   // assignNextTask(): OperatorFunction<Canvas, PaintEngineTaskModel>

}
