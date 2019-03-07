import { getModuleIdentifier, getNamedTypeIntent } from '@jchptf/api';
import { getConfigClassProviderToken } from '@jchptf/config';

export const APP_MODULE_ID = getModuleIdentifier('@jchptf/config_fixture');

// Provider tags here are used in a Class Decorator, so we cannot leverage the type safety on
// these NamedTypeIntents because it would create a circular dependency and lead to undefined
// provider tokens...  Most use cases for Provider strings do not use the provider token in the
// artifacts they represent, and so won't have this same problem.
export const DEPLOYMENT_TYPE = getNamedTypeIntent<any>('Deployment');
export const EVENT_SPECIFICATION_TYPE = getNamedTypeIntent<any>('EventSpecification');
export const PRIZE_MINTING_POLICY_TYPE = getNamedTypeIntent<any>('PrizeMintingPolicy');
export const TICKET_MINTING_POLICY_TYPE = getNamedTypeIntent<any>('TicketMintingPolicy');
export const TICKET_STAGING_POLICY_TYPE = getNamedTypeIntent<any>('TicketStagingPolicy');
export const PLAY_ASSETS_TYPE = getNamedTypeIntent<any>('PlayAssets');

export const DEPLOYMENT_PROVIDER =
   getConfigClassProviderToken(APP_MODULE_ID, DEPLOYMENT_TYPE);
export const EVENT_SPECIFICATION_PROVIDER =
   getConfigClassProviderToken(APP_MODULE_ID, EVENT_SPECIFICATION_TYPE);
export const PRIZE_MINTING_POLICY_PROVIDER =
   getConfigClassProviderToken(APP_MODULE_ID, PRIZE_MINTING_POLICY_TYPE);
export const TICKET_MINTING_POLICY_PROVIDER =
   getConfigClassProviderToken(APP_MODULE_ID, TICKET_MINTING_POLICY_TYPE);
export const TICKET_STAGING_POLICY_PROVIDER =
   getConfigClassProviderToken(APP_MODULE_ID, TICKET_STAGING_POLICY_TYPE);
export const PLAY_ASSETS_PROVIDER =
   getConfigClassProviderToken(APP_MODULE_ID, PLAY_ASSETS_TYPE);

// export type AppConfigTypes =
//    DEPLOYMENT |
//    EVENT_SPECIFICATION |
//    PRIZE_MINTING_POLICY |
//    TICKET_MINTING_POLICY |
//    TICKET_STAGING_POLICY |
//    PLAY_ASSETS;
//
// export const APP_CONFIG_TYPES: TokenDictionary<AppConfigTypes> = {
//    DEPLOYMENT: 'Deployment',
//    EVENT_SPECIFICATION: 'EventSpecification',
//    PRIZE_MINTING_POLICY: 'PrizeMintingPolicy',
//    TICKET_MINTING_POLICY: 'TicketMintingPolicy',
//    TICKET_STAGING_POLICY: 'TicketStagingPolicy',
//    PLAY_ASSETS: 'PlayAssets'
// };

// type ApplicationServiceTypes = 'MerkleTaskScanner' | 'PathMapCache';

// export const APPLICATION_SERVICE_TYPES: SymbolEnum<ApplicationServiceTypes> = {
//    MerkleTaskScanner: Symbol.for('MerkleTaskScanner'),
//    PathMapCache: Symbol.for('PathMapCache')
// };