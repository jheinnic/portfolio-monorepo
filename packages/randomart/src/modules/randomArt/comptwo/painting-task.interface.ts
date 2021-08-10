import {IModelSeed} from "./model-seed.interface";

export interface IPaintingTask {
    taskUlid: string;
    plotPolicyRef: string;
    modelSeed: IModelSeed;
}