import {IDimensionPoint} from "./dimension-point";

export interface IPolicyClient {
    plotPolicy(ulid: string): [Iterable<IDimensionPoint>, Iterable<IDimensionPoint>];
}