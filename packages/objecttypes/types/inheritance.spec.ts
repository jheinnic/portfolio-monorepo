import { ABaseClass, SubClassOne } from './fixtures';
import { IfExtends, IfNotExtends } from '@jchptf/objecttypes';

// $ExpectType SubClassOne
type ifExtendsIsFirstArgOnSubClassWithTwoArgs = IfExtends<SubClassOne, ABaseClass>;

// $ExpectType never
type ifNotExtendsIsNeverOnSubClassWithTwoArgs = IfNotExtends<SubClassOne, ABaseClass>;

// $ExpectType number
type ifExtendsSelectsThirdArgOnSubclass = IfExtends<SubClassOne, ABaseClass, number, string>;

// $ExpectType string
type ifNotExtendsSelectsFourthArgOnSubclass = IfNotExtends<SubClassOne, ABaseClass, number, string>;
