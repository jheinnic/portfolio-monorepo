"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const constants_1 = require("./constants");
const event_bus_service_1 = require("./event-bus.service");
let LibraryModule = class LibraryModule {
};
LibraryModule = tslib_1.__decorate([
    Module({
        providers: [
            {
                provide: constants_1.EVENT_BUS_PROVIDER_TOKEN,
                useClass: event_bus_service_1.EventBus,
            },
        ],
    })
], LibraryModule);
exports.LibraryModule = LibraryModule;
//# sourceMappingURL=module.js.map