import { StateCode } from './state-code.enum';

export type ZoneOneEnum = StateCode.CA | StateCode.OR | StateCode.WA | StateCode.AZ | StateCode.NV;

export type ZoneOneStr = 'California' | 'Oregon' | 'Washington' | 'Arizona' | 'Nevada';

export type ZoneTwoEnum = StateCode.CA | StateCode.OH | StateCode.FL | StateCode.TX;

export type ZoneTwoStr = 'California' | 'Ohio' | 'Florida' | 'Texas';

export type ZoneThreeEnum = StateCode.KS | StateCode.IA | StateCode.CO;

export type ZoneThreeStr = 'Kansas' | 'Iowa' | 'Colorado';

export type ZoneFourEnum = StateCode.OR | StateCode.NV | StateCode.FL | StateCode.TX;

export type ZoneFourStr = 'Oregon' | 'Nevada' | 'Florida' | 'Texas';

export interface IZOneTwo {
   California: number;
   Oregon: number;
   Washington: number;
   Arizona: number;
   Nevada: number;
   Ohio: number;
   Florida: number;
   Texas: number;
}

export interface IZOneThree {
   California: number;
   Oregon: number;
   Washington: number;
   Arizona: number;
   Nevada: number;
   Kansas: number;
   Iowa: number;
   Colorado: number;
}

export interface IZTwoThree {
   California: number;
   Ohio: number;
   Florida: number;
   Texas: number;
   Kansas: number;
   Iowa: number;
   Colorado: number;
}

export interface IZOneTwoThreeFour {
   California: number;
   Oregon: number;
   Washington: number;
   Arizona: number;
   Nevada: number;
   Ohio: number;
   Florida: number;
   Texas: number;
   Kansas: number;
   Iowa: number;
   Colorado: number;
}

export interface IZOneFour {
   California: number;
   Oregon: number;
   Washington: number;
   Arizona: number;
   Nevada: number;
   Florida: number;
   Texas: number;
}

export interface IZTwoFour {
   California: number;
   Ohio: number;
   Florida: number;
   Texas: number;
   Oregon: number;
   Nevada: number;
}

export interface IZOneTwoFour {
   California: number;
   Oregon: number;
   Washington: number;
   Arizona: number;
   Nevada: number;
   Ohio: number;
   Florida: number;
   Texas: number;
}

export interface IZThreeFour {
   Kansas: number;
   Iowa: number;
   Colorado: number;
   Oregon: number;
   Nevada: number;
   Florida: number;
   Texas: number;
}
