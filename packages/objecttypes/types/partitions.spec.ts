import { ValuePropertyNames } from "@jchptf/objecttypes";
import { IZOneTwo, StateCode, ZoneOneStr, ZoneTwoStr } from "./fixtures";

// $ExpectType ZoneOneTwoStrings
export type ZoneOneTwoStrings = ZoneOneStr | ZoneTwoStr;

// $ExpectType ZoneOneTwoStrings
export type ValuePropertyNamesIsAUnionOfValueTypedPropertyNames = ValuePropertyNames<IZOneTwo>;

// $ExpectType never
export type KeysOfAnEmptyObject = keyof object;
