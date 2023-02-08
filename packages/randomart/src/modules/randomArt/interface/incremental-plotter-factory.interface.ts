import { IncrementalPlotter, IncrementalPlotObserver } from './index';
import { Canvas } from 'canvas';

export interface IncrementalPlotterFactory {
   create(observer: IncrementalPlotObserver): IncrementalPlotter;

   createChained(observers: Array<IncrementalPlotObserver>): IncrementalPlotter;

   isCompatible(canvas: Canvas): boolean;
}
