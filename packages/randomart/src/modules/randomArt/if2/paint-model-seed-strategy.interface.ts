import {ModelSeed} from "../if3";
import {BitStrategyKind} from "../../../proto/config";
import {Name} from "../../../infrastructure/validation";

export interface IPaintModelSeedStrategy {
   readonly name: Name;

   readonly strategyKind: BitStrategyKind;

   extractSeed(publicKeyX: Buffer, publicKeyY: Buffer): ModelSeed | Promise<ModelSeed>;
}
