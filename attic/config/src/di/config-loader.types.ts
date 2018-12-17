import {IBagOf} from '@jchptf/api';

type ConfigTypeNames = "ConfigLoader";

export const CONFIG_TYPES: IBagOf<symbol, ConfigTypeNames> = {
   ConfigLoader: Symbol.for("ConfigLoader")
};