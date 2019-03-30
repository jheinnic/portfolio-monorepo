import {
   ICanonicalPathNaming, IMerkleCalculator, MerkleTreeDescription,
} from '@jchptf/merkle';
import { FauxContainer } from './faux-container.class';
import { blessLocalProviderToken, LocalProviderToken, MODULE_ID } from '@jchptf/nestjs';

export const treeDescriptionOne = new MerkleTreeDescription(
   // 4096, 512, 8192, 48000, 12288
   512, 512, 4096, 256, 169,
);

export const treeDescriptionTwo = new MerkleTreeDescription(
   128, 256, 4096, 5200, 4288,
);

export const TEST_MODULE_ID = Symbol('@jchptf/testModule');
export type TEST_MODULE_ID = typeof TEST_MODULE_ID;

export const MERKLE_CALCULATOR_ONE = Symbol('IMerkleCalculator(::tagOne)');
export const MERKLE_PATH_NAMING_ONE = Symbol('ICanonicalPathNaming(::tagOne)');

export const MERKLE_CALCULATOR_TWO = Symbol('IMerkleCalculator(::tagTwo)');

export const FAUX_CONTAINER = Symbol('FauxContainer');

export class TestModuleId
{
   static readonly [MODULE_ID] = TEST_MODULE_ID;

   [MERKLE_CALCULATOR_ONE]: IMerkleCalculator;
   [MERKLE_CALCULATOR_TWO]: IMerkleCalculator;
   [MERKLE_PATH_NAMING_ONE]: ICanonicalPathNaming;
   [FAUX_CONTAINER]: FauxContainer;
}

export function blessLocal<Token extends keyof TestModuleId>(
   token: Token,
): LocalProviderToken<TestModuleId[Token], typeof TestModuleId>
{
   return blessLocalProviderToken(token, TestModuleId);
}

export const dynamicCalculatorOneToken = blessLocal(MERKLE_CALCULATOR_ONE);
export const dynamicPathNamingOneToken = blessLocal(MERKLE_PATH_NAMING_ONE);

export const dynamicCalculatorTwoToken = blessLocal(MERKLE_CALCULATOR_TWO);

export const fauxContainerToken = blessLocal(FAUX_CONTAINER);
