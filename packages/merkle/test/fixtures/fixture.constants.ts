import { MerkleTreeDescription } from '@jchptf/merkle';
import { getLocalProviderToken, getModuleIdentifier, getNamedTypeIntent } from '@jchptf/api';
import { FauxContainer } from './faux-container.class';
import { getMerkleCalculatorProviderToken } from '@jchptf/merkle';

export const treeOneTag = 'first';
export const treeTwoTag = 'second';

export const treeDescriptionOne = new MerkleTreeDescription(
   4096, 512, 8192, 48000, 12288
);

export const treeDescriptionTwo = new MerkleTreeDescription(
   128, 256, 4096, 5200, 4288
);

export const testModule = getModuleIdentifier('@jchptf/testModule');

export const dynamicCalcOneToken =
   getMerkleCalculatorProviderToken(testModule, treeOneTag);
export const dynamicCalcTwoToken =
   getMerkleCalculatorProviderToken(testModule, treeTwoTag);

export const fauxContainerType =
   getNamedTypeIntent<FauxContainer>('FauxContainer');
export const fauxContainerToken =
   getLocalProviderToken(testModule, fauxContainerType);

