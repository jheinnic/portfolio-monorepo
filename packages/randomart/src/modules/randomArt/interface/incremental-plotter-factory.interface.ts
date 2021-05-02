import { IncrementalPlotter, IncrementalPlotObserver } from './index';
import { Canvas } from 'canvas';

export interface IncrementalPlotterFactory {
   create(observer: IncrementalPlotObserver): IncrementalPlotter;

   isCompatible(canvas: Canvas): boolean;
}
