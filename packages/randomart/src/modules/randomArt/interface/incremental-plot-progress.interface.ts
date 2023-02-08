import { IncrementalPlotter } from './incremental-plotter.interface';

export interface IncrementalPlotProgress {
   // readonly plotter: IncrementalPlotterFactory;
   readonly done: number;
   readonly remaining: number;
   readonly total: number;
}
