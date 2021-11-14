"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nestjs_1 = require("@jchptf/nestjs");
exports.LIBRARY_MODULE_ID = 'LibraryModule';
exports.LOBBY_CONFIG_PROVIDER_TOKEN = nestjs_1.getLocalProviderTokenString(exports.LIBRARY_MODULE_ID, 'LobbyConfig');
exports.LOBBY_PROVIDER_TOKEN = nestjs_1.getLocalProviderTokenString(exports.LIBRARY_MODULE_ID, 'Lobby');
exports.NEW_ARRIVAL_OBSERVABLE_PROVIDER_TOKEN = nestjs_1.getLocalProviderTokenString(exports.LIBRARY_MODULE_ID, 'Observable<NewPlayerEvent>');
exports.FLUSH_OBSERVER_PROVIDER_TOKEN = nestjs_1.getLocalProviderTokenString(exports.LIBRARY_MODULE_ID, 'Observer<FlushEvent>');
//# sourceMappingURL=constants.js.map