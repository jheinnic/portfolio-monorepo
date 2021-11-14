"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const classes_1 = require("./classes");
let Socket = class Socket {
    constructor() { }
    connect(plug) {
        if (!!this.powered) {
            this.powered.disconnect();
        }
        return plug.supplyPower(this);
    }
};
Socket = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], Socket);
exports.Socket = Socket;
let Lamp = class Lamp {
    constructor(powerSource) {
        powerSource.register('lamp', this);
    }
    disconnect() {
        this.connectedTo = undefined;
    }
    supplyPower(socket) {
        this.connectedTo = socket;
    }
    hasPower() {
        return !!this.connectedTo;
    }
};
Lamp = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, common_1.Inject(constants_1.POWER_CONTAINER)),
    tslib_1.__metadata("design:paramtypes", [classes_1.UtilityContainer])
], Lamp);
exports.Lamp = Lamp;
let Blender = class Blender {
    constructor(powerSource) {
        powerSource.register('blender', this);
    }
    disconnect() {
        this.connectedTo = undefined;
    }
    supplyPower(socket) {
        this.connectedTo = socket;
    }
    hasPower() {
        return !!this.connectedTo;
    }
};
Blender = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, common_1.Inject(constants_1.POWER_CONTAINER)),
    tslib_1.__metadata("design:paramtypes", [classes_1.UtilityContainer])
], Blender);
exports.Blender = Blender;
//# sourceMappingURL=power_classes.js.map