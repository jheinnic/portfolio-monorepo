import { IncrementalPlotter } from './incremental-plotter.interface';

export interface IPlotProgress {
   readonly plotter: IncrementalPlotter;
   readonly done: number;
   readonly remaining: number;
   readonly total: number;
}
