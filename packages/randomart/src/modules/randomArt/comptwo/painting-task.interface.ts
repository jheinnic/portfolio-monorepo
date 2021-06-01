import {IModelSeed} from "./model-seed.interface";

export interface IRenderTask {
    taskUlid: string;
    plotPolicyRef: string;
    modelSeed: IModelSeed;
}