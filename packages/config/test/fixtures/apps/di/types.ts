import {getLocalProviderToken} from '../../../../src';
import {TokenDictionary} from '../../../../src/interfaces/injection-token.type';

export const DEPLOYMENT = getLocalProviderToken('Deployment');
export type DEPLOYMENT = typeof DEPLOYMENT;

export const EVENT_SPECIFICATION = getLocalProviderToken('EventSpecification');
export type EVENT_SPECIFICATION = typeof EVENT_SPECIFICATION;

export const PRIZE_MINTING_POLICY = getLocalProviderToken('PrizeMintingPolicy');
export type PRIZE_MINTING_POLICY = typeof PRIZE_MINTING_POLICY;

export const TICKET_MINTING_POLICY = getLocalProviderToken('TicketMintingPolicy');
export type TICKET_MINTING_POLICY = typeof TICKET_MINTING_POLICY;

export const TICKET_STAGING_POLICY = getLocalProviderToken('TicketStagingPolicy');
export type TICKET_STAGING_POLICY = typeof TICKET_STAGING_POLICY;

export const PLAY_ASSETS = getLocalProviderToken('PlayAssets');
export type PLAY_ASSETS = typeof PLAY_ASSETS;

export type AppConfigTypes =
   DEPLOYMENT |
   EVENT_SPECIFICATION |
   PRIZE_MINTING_POLICY |
   TICKET_MINTING_POLICY |
   TICKET_STAGING_POLICY |
   PLAY_ASSETS;

export const APP_CONFIG_TYPES: TokenDictionary<AppConfigTypes> = {
   DEPLOYMENT: 'Deployment',
   EVENT_SPECIFICATION: 'EventSpecification',
   PRIZE_MINTING_POLICY: 'PrizeMintingPolicy',
   TICKET_MINTING_POLICY: 'TicketMintingPolicy',
   TICKET_STAGING_POLICY: 'TicketStagingPolicy',
   PLAY_ASSETS: 'PlayAssets'
};

// type ApplicationServiceTypes = 'MerkleTaskScanner' | 'PathMapCache';

// export const APPLICATION_SERVICE_TYPES: SymbolEnum<ApplicationServiceTypes> = {
//    MerkleTaskScanner: Symbol.for('MerkleTaskScanner'),
//    PathMapCache: Symbol.for('PathMapCache')
// };