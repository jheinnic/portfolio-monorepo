import {getDynamicProviderToken, getModuleIdentifier, getNamedTypeIntent} from '@jchptf/api';
import {CONFIG_MODULE_DYNAMIC_PROVIDER_BINDING} from '../../../../src/di';

export const appModuleId = getModuleIdentifier('@jchptf/config_fixture');

export const DEPLOYMENT_TYPE = getNamedTypeIntent('Deployment');
export const EVENT_SPECIFICATION_TYPE = getNamedTypeIntent('EventSpecification');
export const PRIZE_MINTING_POLICY_TYPE = getNamedTypeIntent('PrizeMintingPolicy');
export const TICKET_MINTING_POLICY_TYPE = getNamedTypeIntent('TicketMintingPolicy');
export const TICKET_STAGING_POLICY_TYPE = getNamedTypeIntent('TicketStagingPolicy');
export const PLAY_ASSETS_TYPE = getNamedTypeIntent('PlayAssets');

export const DEPLOYMENT_PROVIDER =
   getDynamicProviderToken(appModuleId, CONFIG_MODULE_DYNAMIC_PROVIDER_BINDING, DEPLOYMENT_TYPE);
export const EVENT_SPECIFICATION_PROVIDER =
   getDynamicProviderToken(appModuleId, CONFIG_MODULE_DYNAMIC_PROVIDER_BINDING, EVENT_SPECIFICATION_TYPE);
export const PRIZE_MINTING_POLICY_PROVIDER =
   getDynamicProviderToken(appModuleId, CONFIG_MODULE_DYNAMIC_PROVIDER_BINDING, PRIZE_MINTING_POLICY_TYPE);
export const TICKET_MINTING_POLICY_PROVIDER =
   getDynamicProviderToken(appModuleId, CONFIG_MODULE_DYNAMIC_PROVIDER_BINDING, TICKET_MINTING_POLICY_TYPE);
export const TICKET_STAGING_POLICY_PROVIDER =
   getDynamicProviderToken(appModuleId, CONFIG_MODULE_DYNAMIC_PROVIDER_BINDING, TICKET_STAGING_POLICY_TYPE);
export const PLAY_ASSETS_PROVIDER =
   getDynamicProviderToken(appModuleId, CONFIG_MODULE_DYNAMIC_PROVIDER_BINDING, PLAY_ASSETS_TYPE);

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