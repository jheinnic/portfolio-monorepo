import {IPlotPolicy} from "./plot-policy.interface";

export interface IPlotPolicyClient {
    lookupPlotPolicy(plotPolicyUlid: string): IPlotPolicy
}